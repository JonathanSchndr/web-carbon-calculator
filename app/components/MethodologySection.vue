<script setup lang="ts">
import { Info, CheckCircle2, ExternalLink } from 'lucide-vue-next'
</script>

<template>
  <div class="border-t border-slate-200 pt-12">
    <div class="flex items-center gap-3 mb-6">
      <div class="p-2 bg-slate-100 text-slate-700 rounded-lg">
        <Info class="w-5 h-5" />
      </div>
      <h2 class="text-xl font-bold text-slate-900">Methodology & Data Sources</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-600 text-sm leading-relaxed">
      <div>
        <h3 class="font-semibold text-slate-900 mb-2">How we calculate CO2</h3>
        <p class="mb-4">
          We use the <a href="https://sustainablewebdesign.org/calculating-digital-emissions/" target="_blank" class="text-emerald-600 hover:underline">Sustainable Web Design (SWD)</a> model version 4. This industry-standard model estimates energy usage based on data transfer, device usage, and network energy intensity.
        </p>
        <p>
          Our calculator uses the <code class="bg-slate-100 px-1 py-0.5 rounded text-slate-800">@tgwf/co2</code> library provided by The Green Web Foundation.
        </p>
      </div>

      <div>
        <h3 class="font-semibold text-slate-900 mb-2">Data Sources</h3>
        <ul class="space-y-2">
          <li class="flex items-start gap-2">
            <CheckCircle2 class="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
            <span><strong>Green Hosting:</strong> Verified against <a href="https://www.thegreenwebfoundation.org/green-web-datasets/" target="_blank" class="text-emerald-600 hover:underline">The Green Web Foundation's</a> open database.</span>
          </li>
          <li class="flex items-start gap-2">
            <CheckCircle2 class="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
            <span><strong>Page Weight:</strong> Estimated based on the initial HTML size multiplied by a heuristic factor (x30) to account for assets like images, scripts, and styles.</span>
          </li>
          <li class="flex items-start gap-2">
            <CheckCircle2 class="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
            <span><strong>Grid Intensity:</strong> We use global average grid intensity figures unless specific green hosting is detected.</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="mt-8 flex flex-wrap gap-4">
      <a href="https://www.thegreenwebfoundation.org/" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors text-sm font-medium">
        The Green Web Foundation <ExternalLink class="w-3 h-3" />
      </a>
      <a href="https://sustainablewebdesign.org/" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors text-sm font-medium">
        Sustainable Web Design <ExternalLink class="w-3 h-3" />
      </a>
      <a href="https://web.dev/performance-scoring/" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors text-sm font-medium">
        Web Performance Guide <ExternalLink class="w-3 h-3" />
      </a>
    </div>
  </div>
</template>
