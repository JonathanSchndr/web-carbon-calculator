<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Globe, Zap, Leaf, AlertCircle, ArrowRight, CheckCircle2, XCircle, Share2, Lightbulb, Copy, Info, ExternalLink, Trees, Github } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

// Dynamic meta tags for OG image
const ogImage = computed(() => {
  if (result.value) {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
    return `${baseUrl}/api/og-image?url=${encodeURIComponent(result.value.url)}&co2=${result.value.co2_grams}&grade=${result.value.grade}&green=${result.value.is_green}`
  }
  return '/favicon.svg'
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
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
  ],
  meta: [
    { name: 'description', content: ogDescription },
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

const url = ref('')
const loading = ref(false)
const error = ref<string | null>(null)
const result = ref<any>(null)
const copied = ref(false)

const analyzeUrl = async () => {
  if (!url.value) return

  // Prepend https:// if missing
  if (!url.value.startsWith('http://') && !url.value.startsWith('https://')) {
    url.value = 'https://' + url.value
  }

  // Update URL query param without reloading
  router.push({ query: { url: url.value } })

  loading.value = true
  error.value = null
  result.value = null

  try {
    const data = await $fetch('/api/analyze', {
      method: 'POST',
      body: { url: url.value }
    })

    result.value = data
  } catch (e: any) {
    error.value = e.message || e.data?.message || 'Failed to analyze website'
  } finally {
    loading.value = false
  }
}

const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const copyToClipboard = async () => {
  try {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      console.error('Not in browser environment')
      return
    }

    if (!navigator?.clipboard?.writeText) {
      console.error('Clipboard API not available')
      error.value = 'Clipboard not supported in this browser'
      return
    }

    const shareUrl = window.location.href
    await navigator.clipboard.writeText(shareUrl)

    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy to clipboard:', err)
    // Don't set error.value here to avoid interfering with analyze errors
    alert('Failed to copy link. Please copy manually: ' + window.location.href)
  }
}

// Tree absorption calculation: ~60g CO2 per day per tree
const treeTime = (grams: number) => {
  const gramsPerDay = 60
  const days = grams / gramsPerDay
  if (days < 0.04) { // Less than an hour
    const minutes = Math.ceil(days * 24 * 60)
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`
  }
  if (days < 1) {
    const hours = Math.ceil(days * 24)
    return `${hours} hour${hours !== 1 ? 's' : ''}`
  }
  return `${days.toFixed(1)} days`
}

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

    <!-- Input Section -->
    <div class="max-w-xl mx-auto mb-20">
      <form @submit.prevent="analyzeUrl" class="relative group">
        <div class="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
        <div class="relative flex items-center bg-white rounded-2xl shadow-xl p-2 border border-slate-100">
          <div class="pl-4 text-slate-400">
            <Globe class="w-5 h-5" />
          </div>
          <input 
            v-model="url"
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

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20 space-y-4 animate-pulse">
      <div class="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
      <p class="text-slate-500 font-medium">Scanning website assets...</p>
    </div>

    <!-- Results Dashboard -->
    <div v-if="result" class="animate-fade-in-up space-y-12">
      
      <!-- Share Button -->
      <div class="flex justify-end">
        <button 
          @click="copyToClipboard"
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

      <!-- Recommendations Section -->
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

      <!-- Methodology & Transparency -->
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

    </div>

    <!-- Footer -->
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
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
