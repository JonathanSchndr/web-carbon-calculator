<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'

// Composables
const route = useRoute()
const { url, loading, error, result, analyzeUrl } = useAnalyze()
const { copied, copyToClipboard } = useCopyToClipboard()

// Meta tags
useMetaTags(result)

// Auto-analyze from URL query parameter
onMounted(async () => {
  if (route.query.url) {
    url.value = route.query.url as string
    await nextTick()
    await analyzeUrl()
  }
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">
    <div class="max-w-5xl mx-auto px-6 py-12 md:py-20">
      <!-- Hero Section -->
      <HeroSection />

      <!-- Input Form -->
      <InputForm
        v-model:url="url"
        :loading="loading"
        :error="error"
        @submit="analyzeUrl"
      />

      <!-- Loading State -->
      <LoadingState v-if="loading" />

      <!-- Results -->
      <template v-if="result">
        <ResultsDashboard
          :result="result"
          :copied="copied"
          @share="copyToClipboard"
        />

        <RecommendationsSection :result="result" />

        <MethodologySection />
      </template>

      <!-- Footer -->
      <AppFooter />
    </div>
  </div>
</template>

<style>
body {
  @apply antialiased;
}
</style>
