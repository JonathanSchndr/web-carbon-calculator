<script setup lang="ts">
import { Leaf } from 'lucide-vue-next'
</script>

<template>
  <header class="text-center mb-16 md:mb-24 space-y-6">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium mb-4 border border-emerald-100">
      <Leaf class="w-4 h-4" />
      <span>Web Carbon Calculator</span>
    </div>
    <h1 class="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
      How green is your <span class="text-emerald-600">website?</span>
    </h1>
    <p class="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
      Calculate the carbon footprint of your web pages. Enter a URL below to get a detailed eco-report.
    </p>
  </header>
</template>
