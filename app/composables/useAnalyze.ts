import { ref } from 'vue'
import type { Router } from 'vue-router'

export interface AnalysisResult {
  url: string
  co2_grams: number
  energy_kwh: number
  is_green: boolean
  grade: string
  estimated_bytes: number
  scan_time: string
}

export const useAnalyze = (router: Router) => {
  const url = ref('')
  const loading = ref(false)
  const error = ref<string | null>(null)
  const result = ref<AnalysisResult | null>(null)

  const analyzeUrl = async () => {
    if (!url.value) return

    // Prepend https:// if missing
    if (!url.value.startsWith('http://') && !url.value.startsWith('https://')) {
      url.value = 'https://' + url.value
    }

    // Update URL query param without reloading
    router.push({ query: { url: url.value } })

    loading.value = true
    error.value = null
    result.value = null

    try {
      const data = await $fetch<AnalysisResult>('/api/analyze', {
        method: 'POST',
        body: { url: url.value }
      })

      result.value = data
    } catch (e: any) {
      // Benutzerfreundliche Fehlermeldungen
      if (e.statusCode === 400 || e.status === 400) {
        error.value = 'Invalid website URL. Please check the address and try again.'
      } else if (e.statusCode === 404 || e.status === 404) {
        error.value = 'Website not found. Please check if the URL is correct.'
      } else if (e.statusCode === 500 || e.status === 500 || e.message?.includes('fetch failed')) {
        error.value = 'Unable to analyze this website. The site might be down or blocking our request.'
      } else if (e.message?.includes('network') || e.message?.includes('timeout')) {
        error.value = 'Connection timeout. Please check your internet connection and try again.'
      } else if (e.data?.statusMessage) {
        // Verwende die Server-Fehlermeldung, falls verfügbar
        error.value = e.data.statusMessage
      } else {
        error.value = 'Something went wrong while analyzing the website. Please try again.'
      }
    } finally {
      loading.value = false
    }
  }

  return {
    url,
    loading,
    error,
    result,
    analyzeUrl
  }
}
