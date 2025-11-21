<script setup lang="ts">
import { Github, ExternalLink } from 'lucide-vue-next'
</script>

<template>
  <footer class="text-center text-slate-400 text-sm mt-20 space-y-4">
    <div class="flex items-center justify-center gap-2">
      <a
        href="https://github.com/JonathanSchndr/web-carbon-calculator"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors font-medium"
      >
        <Github class="w-4 h-4" />
        <span>View on GitHub</span>
        <ExternalLink class="w-3 h-3" />
      </a>
    </div>
    <p>&copy; {{ new Date().getFullYear() }} Web Carbon Calculator. Built with Nuxt 4.</p>
  </footer>
</template>
