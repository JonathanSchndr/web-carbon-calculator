<script setup lang="ts">
import { Leaf, Zap, Globe, CheckCircle2, XCircle, Share2, Trees } from 'lucide-vue-next'
import type { AnalysisResult } from '~/composables/useAnalyze'

defineProps<{
  result: AnalysisResult
  copied: boolean
}>()

const emit = defineEmits<{
  'share': []
}>()

const { treeTime } = useUtils()
</script>

<template>
  <div class="animate-fade-in-up space-y-12">
    <!-- Share Button -->
    <div class="flex justify-end">
      <button
        @click="emit('share')"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium shadow-sm"
      >
        <span v-if="copied" class="text-emerald-600 flex items-center gap-2">
          <CheckCircle2 class="w-4 h-4" /> Copied!
        </span>
        <span v-else class="flex items-center gap-2">
          <Share2 class="w-4 h-4" /> Share Report
        </span>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Grade Card -->
      <div class="md:col-span-1 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
        <h3 class="text-slate-500 font-medium mb-2 uppercase tracking-wider text-xs">Eco Grade</h3>
        <div class="text-8xl font-bold text-slate-900 mb-2 tracking-tighter">{{ result.grade }}</div>
        <div
          class="px-3 py-1 rounded-full text-sm font-medium"
          :class="result.grade.startsWith('A') || result.grade.startsWith('B') ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'"
        >
          {{ result.grade.startsWith('A') ? 'Excellent' : 'Needs Improvement' }}
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <!-- CO2 Card -->
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 bg-slate-50 rounded-2xl text-slate-600">
              <Leaf class="w-6 h-6" />
            </div>
          </div>
          <div>
            <div class="text-3xl font-bold text-slate-900 mb-1">{{ result.co2_grams }}g</div>
            <div class="text-slate-500 text-sm">CO2 per visit</div>
          </div>
        </div>

        <!-- Energy Card -->
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 bg-slate-50 rounded-2xl text-slate-600">
              <Zap class="w-6 h-6" />
            </div>
          </div>
          <div>
            <div class="text-3xl font-bold text-slate-900 mb-1">{{ result.energy_kwh }} kWh</div>
            <div class="text-slate-500 text-sm">Energy per visit</div>
          </div>
        </div>

        <!-- Hosting Card -->
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 bg-slate-50 rounded-2xl text-slate-600">
              <Globe class="w-6 h-6" />
            </div>
            <div v-if="result.is_green" class="text-emerald-600">
              <CheckCircle2 class="w-6 h-6" />
            </div>
            <div v-else class="text-slate-300">
              <XCircle class="w-6 h-6" />
            </div>
          </div>
          <div>
            <div class="text-lg font-bold text-slate-900 mb-1">
              {{ result.is_green ? 'Green Hosted' : 'Standard Hosting' }}
            </div>
            <div class="text-slate-500 text-sm">
              {{ result.is_green ? 'Powered by renewable energy' : 'Using fossil fuel energy' }}
            </div>
          </div>
        </div>

        <!-- Context Card (Trees) -->
        <div class="bg-emerald-900 rounded-3xl p-6 shadow-sm border border-emerald-800 flex flex-col justify-between text-white">
          <div class="mb-4 opacity-80">
            <Trees class="w-6 h-6" />
          </div>
          <div>
            <div class="text-lg font-medium mb-1">Tree Absorption</div>
            <div class="text-emerald-100 text-sm leading-relaxed">
              It takes a tree about <span class="font-bold text-white">{{ treeTime(result.co2_grams) }}</span> to absorb the CO2 from just one visit to this page.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
