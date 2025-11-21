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
    <ClientOnly>
      <InputForm
        v-model:url="url"
        :loading="loading"
        :error="error"
        :auto-focus="true"
        @submit="analyzeUrl"
      />
      <template #fallback>
        <div class="max-w-xl mx-auto mb-20">
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur opacity-20"></div>
            <div class="relative flex items-center bg-white rounded-2xl shadow-xl p-2 border border-slate-100">
              <div class="pl-4 text-slate-400">
                <div class="w-5 h-5"></div>
              </div>
              <div class="flex-1 h-12"></div>
              <div class="bg-slate-900 text-white px-6 h-12 rounded-xl w-28"></div>
            </div>
          </div>
        </div>
      </template>
    </ClientOnly>

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
