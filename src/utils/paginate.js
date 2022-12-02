export const paginate = (arr, quantity, currentPage) => {
  if (arr.length) {
    return arr.splice((currentPage - 1) * quantity, quantity)
  }

  return arr
}
