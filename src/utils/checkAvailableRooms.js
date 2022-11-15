export const checkAvailableRooms = (rooms, books) => {
  if (books.length) {
    return rooms.filter((room) => {
      if (books.findIndex((b) => b.roomId === room.id) !== -1) {
        return false
      } else return true
    })
  }
  return rooms
}
