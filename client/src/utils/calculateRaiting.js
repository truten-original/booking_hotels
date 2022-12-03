export const calculateRaiting = (arr) => {
  if (arr.length) {
    const sum = arr.reduce((sum, item) => sum + item.bookmark, 0)
    return sum / arr.length.toFixed(2)
  }
  return 0
}
