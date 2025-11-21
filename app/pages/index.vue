<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Composables
const route = useRoute()
const router = useRouter()
const { url, loading, error, result, analyzeUrl } = useAnalyze(router)
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
  <div class="max-w-5xl mx-auto px-6 py-12 md:py-20">
    <!-- Hero Section -->
    <HeroSection />

    <!-- Input Form -->
    <InputForm
      v-model:url="url"
      :loading="loading"
      :error="error"
      :auto-focus="true"
      @submit="analyzeUrl"
    />

    <!-- Loading State -->
    <LoadingState v-if="loading" />

    <!-- Results -->
    <div v-if="result" class="space-y-12">
      <ResultsDashboard
        :result="result"
        :copied="copied"
        @share="copyToClipboard"
      />

      <RecommendationsSection :result="result" />

      <MethodologySection />
    </div>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>
