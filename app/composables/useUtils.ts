export const useUtils = () => {
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
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

  return {
    formatBytes,
    treeTime
  }
}
