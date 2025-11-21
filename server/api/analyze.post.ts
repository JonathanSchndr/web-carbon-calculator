import { analyzeWebsite } from '../utils/analyzeWebsite'

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

    try {
        const result = await analyzeWebsite(url, origin)
        return result
    } catch (error: any) {
        console.error('Analysis error:', error)

        // Benutzerfreundliche Fehlermeldungen
        let statusMessage = 'Unable to analyze this website. Please try again later.'

        if (error.message?.includes('fetch') || error.message?.includes('ENOTFOUND')) {
            statusMessage = 'Website not reachable. Please check if the URL is correct.'
        } else if (error.message?.includes('timeout')) {
            statusMessage = 'Request timeout. The website took too long to respond.'
        } else if (error.message?.includes('SSL') || error.message?.includes('certificate')) {
            statusMessage = 'SSL certificate error. This website might have security issues.'
        }

        throw createError({
            statusCode: 500,
            statusMessage: statusMessage,
        })
    }
})
