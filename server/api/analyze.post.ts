import { hosting, co2 } from '@tgwf/co2'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { url } = body

    if (!url) {
        throw createError({
            statusCode: 400,
            statusMessage: 'URL is required',
        })
    }

    // Get the origin URL dynamically
    const requestURL = getRequestURL(event)
    const origin = requestURL.origin

    let domain = ''
    try {
        const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`)
        domain = urlObj.hostname
    } catch (e) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid URL',
        })
    }

    try {
        // 1. Check Green Web Foundation API
        const greenCheckRes = await fetch(`https://api.thegreenwebfoundation.org/greencheck/${domain}`)
        const greenData = await greenCheckRes.json()
        const isGreen = greenData.green || false

        // 2. Estimate Page Size (Heuristic)
        // Fetch the HTML content
        const htmlRes = await fetch(url.startsWith('http') ? url : `https://${url}`, {
            headers: {
                'User-Agent': `Mozilla/5.0 (compatible; WebCarbonCalculator/1.0; +${origin})`
            }
        })

        if (!htmlRes.ok) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Could not fetch website content',
            })
        }

        const htmlText = await htmlRes.text()
        const htmlSize = new Blob([htmlText]).size

        // Heuristic: HTML size * 30 to estimate total page weight (images, scripts, css)
        // This is a simplified estimation for the MVP.
        const estimatedTotalBytes = htmlSize * 30

        // 3. Calculate CO2
        const swd = new co2({ model: 'swd' })
        const co2Estimate = swd.perByte(estimatedTotalBytes, isGreen)

        // 4. Calculate Grade (Simplified)
        // Based on Digital Beacon's grading system (approximate)
        // A+: < 0.095g
        // A: < 0.186g
        // B: < 0.341g
        // C: < 0.493g
        // D: < 0.656g
        // E: < 0.85g
        // F: > 0.85g
        let grade = 'F'
        if (co2Estimate < 0.095) grade = 'A+'
        else if (co2Estimate < 0.186) grade = 'A'
        else if (co2Estimate < 0.341) grade = 'B'
        else if (co2Estimate < 0.493) grade = 'C'
        else if (co2Estimate < 0.656) grade = 'D'
        else if (co2Estimate < 0.85) grade = 'E'

        // Energy (kWh) - simplified conversion
        // 1g CO2 approx 0.002 kWh (very rough, depends on grid intensity)
        // Using the library's perByte method actually returns CO2, but we can estimate energy.
        // The Green Web Foundation uses 0.81 kWh/GB for data transfer + end user device + production etc.
        // Let's use a simple conversion factor for now as requested.
        const energy = estimatedTotalBytes * (0.81 / 1024 / 1024 / 1024); // kWh based on 0.81 kWh/GB

        return {
            url: domain,
            co2_grams: parseFloat(co2Estimate.toFixed(3)),
            energy_kwh: parseFloat(energy.toFixed(5)),
            is_green: isGreen,
            grade,
            estimated_bytes: estimatedTotalBytes,
            scan_time: new Date().toISOString()
        }
    } catch (error: any) {
        console.error('Analysis error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: error.message || 'Failed to analyze website',
        })
    }
})
