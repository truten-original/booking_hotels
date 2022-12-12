export const getRoomPrice = (price, discount = 0) => {
  return {
    price: price - (price / 100) * discount,
    discount: (price / 100) * discount,
  }
}
