import { computed } from 'vue'
import type { AnalysisResult } from './useAnalyze'

export const useMetaTags = (result: Ref<AnalysisResult | null>) => {
  const ogImage = computed(() => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://web-carbon-calculator.vercel.app'

    if (result.value) {
      // Dynamisches OG-Image - nur URL übergeben, Backend analysiert selbst
      const params = new URLSearchParams({
        url: result.value.url,
      })
      return `${baseUrl}/api/og-image.png?${params.toString()}`
    }

    // Allgemeines OG-Image ohne Daten
    return `${baseUrl}/api/og-image.png`
  })

  const ogTitle = computed(() => {
    if (result.value) {
      return `${result.value.url} - Grade ${result.value.grade} (${result.value.co2_grams}g CO2)`
    }
    return 'Web Carbon Calculator - How green is your website?'
  })

  const ogDescription = computed(() => {
    if (result.value) {
      return `This website scores ${result.value.grade} with ${result.value.co2_grams}g CO2 per visit. ${result.value.is_green ? 'Uses green hosting.' : 'Could switch to green hosting.'}`
    }
    return 'Calculate the carbon footprint of your web pages. Get a detailed eco-report with actionable recommendations.'
  })

  useHead({
    title: ogTitle,
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'shortcut icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' }
    ],
    meta: [
      { name: 'description', content: ogDescription },
      { name: 'apple-mobile-web-app-title', content: 'WCC' },
      { property: 'og:title', content: ogTitle },
      { property: 'og:description', content: ogDescription },
      { property: 'og:image', content: ogImage },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: ogTitle },
      { name: 'twitter:description', content: ogDescription },
      { name: 'twitter:image', content: ogImage },
    ]
  })

  return {
    ogImage,
    ogTitle,
    ogDescription
  }
}
