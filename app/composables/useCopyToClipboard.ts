import { ref } from 'vue'

export const useCopyToClipboard = () => {
  const copied = ref(false)

  const copyToClipboard = async () => {
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        console.error('Not in browser environment')
        return
      }

      if (!navigator?.clipboard?.writeText) {
        console.error('Clipboard API not available')
        alert('Clipboard not supported in this browser')
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
      alert('Failed to copy link. Please copy manually: ' + window.location.href)
    }
  }

  return {
    copied,
    copyToClipboard
  }
}
