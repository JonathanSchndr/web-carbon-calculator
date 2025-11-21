<script setup lang="ts">
import { Globe, ArrowRight, AlertCircle } from 'lucide-vue-next'

defineProps<{
  url: string
  loading: boolean
  error: string | null
}>()

const emit = defineEmits<{
  'update:url': [value: string]
  'submit': []
}>()
</script>

<template>
  <div class="max-w-xl mx-auto mb-20">
    <form @submit.prevent="emit('submit')" class="relative group">
      <div class="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
      <div class="relative flex items-center bg-white rounded-2xl shadow-xl p-2 border border-slate-100">
        <div class="pl-4 text-slate-400">
          <Globe class="w-5 h-5" />
        </div>
        <input
          :value="url"
          @input="emit('update:url', ($event.target as HTMLInputElement).value)"
          type="text"
          placeholder="example.com"
          class="flex-1 bg-transparent border-none focus:ring-0 focus:outline-0 text-slate-900 placeholder:text-slate-400 h-12 px-4"
          required
        />
        <button
          type="submit"
          :disabled="loading"
          class="bg-slate-900 text-white px-6 h-12 rounded-xl font-medium hover:bg-slate-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <span v-if="loading">Analyzing...</span>
          <span v-else>Analyze</span>
          <ArrowRight v-if="!loading" class="w-4 h-4" />
        </button>
      </div>
    </form>

    <!-- Error Message -->
    <div v-if="error" class="mt-6 p-4 rounded-xl bg-red-50 text-red-600 flex items-center gap-3 border border-red-100 animate-fade-in">
      <AlertCircle class="w-5 h-5 flex-shrink-0" />
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
