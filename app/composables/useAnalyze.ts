import { ref } from 'vue'
import { useRouter } from 'vue-router'

export interface AnalysisResult {
  url: string
  co2_grams: number
  energy_kwh: number
  is_green: boolean
  grade: string
  estimated_bytes: number
  scan_time: string
}

export const useAnalyze = () => {
  const router = useRouter()
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
      error.value = e.message || e.data?.message || 'Failed to analyze website'
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
