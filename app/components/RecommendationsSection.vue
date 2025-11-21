<script setup lang="ts">
import { Lightbulb, ArrowRight } from 'lucide-vue-next'
import type { AnalysisResult } from '~/composables/useAnalyze'

defineProps<{
  result: AnalysisResult
}>()
</script>

<template>
  <div class="bg-slate-50 rounded-3xl p-8 border border-slate-200">
    <div class="flex items-center gap-3 mb-6">
      <div class="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
        <Lightbulb class="w-5 h-5" />
      </div>
      <h2 class="text-xl font-bold text-slate-900">Recommendations</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-if="!result.is_green" class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
        <h3 class="font-semibold text-slate-900 mb-2">Switch to Green Hosting</h3>
        <p class="text-slate-600 text-sm mb-3">Your hosting provider uses fossil fuels. Switching to a green host can reduce emissions by up to 15%.</p>
        <a href="https://www.thegreenwebfoundation.org/directory/" target="_blank" class="text-emerald-600 text-sm font-medium hover:underline flex items-center gap-1">
          Find a Green Host <ArrowRight class="w-3 h-3" />
        </a>
      </div>

      <div v-if="result.estimated_bytes > 1000000" class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
        <h3 class="font-semibold text-slate-900 mb-2">Reduce Page Size</h3>
        <p class="text-slate-600 text-sm mb-3">Your page is over 1MB. Compressing images and minifying scripts can significantly lower energy usage.</p>
        <a href="https://web.dev/fast/" target="_blank" class="text-emerald-600 text-sm font-medium hover:underline flex items-center gap-1">
          Learn Optimization <ArrowRight class="w-3 h-3" />
        </a>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
        <h3 class="font-semibold text-slate-900 mb-2">Lazy Load Assets</h3>
        <p class="text-slate-600 text-sm mb-3">Defer loading of off-screen images and videos to save data for users who don't scroll down.</p>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
        <h3 class="font-semibold text-slate-900 mb-2">Use System Fonts</h3>
        <p class="text-slate-600 text-sm mb-3">Avoid loading heavy custom font files. System fonts require zero data transfer.</p>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
        <h3 class="font-semibold text-slate-900 mb-2">Enable Browser Caching</h3>
        <p class="text-slate-600 text-sm mb-3">Set proper cache headers so returning visitors don't need to re-download static assets.</p>
      </div>
    </div>
  </div>
</template>
