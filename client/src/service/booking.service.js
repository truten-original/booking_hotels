import httpService from './http.service'

const bookingEndpoint = 'booking/'

const bookingService = {
  get: async () => {
    const { data } = await httpService.get(bookingEndpoint)
    const { content } = data
    return content
  },
  getCurrentBookings: async (roomId) => {
    const { data } = await httpService.get(bookingEndpoint + roomId, {
      params: {
        orderBy: 'roomId',
        equalTo: `${roomId}`,
      },
    })
    const { content } = data
    return content
  },
  create: async (payload) => {
    const { data } = await httpService.post(bookingEndpoint, payload)
    const { content } = data
    return content
  },
  delete: async (id) => {
    const { data } = await httpService.delete(bookingEndpoint + id)
    const { content } = data
    return content
  },
}

export default bookingService