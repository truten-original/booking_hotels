export const paginate = (arr, quantity, currentPage) => {
  if (arr.length) {
    const quantityPage = Math.ceil(arr.length / quantity)
    if (currentPage === 1) {
      return { arr: arr.splice(0, quantity), quantityPage }
    } else {
      return {
        arr: arr.splice((currentPage - 1) * quantity, quantity),
        quantityPage,
      }
    }
  }
  return {arr, quantityPage: 1}
}
