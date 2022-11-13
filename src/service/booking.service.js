import httpService from './http.service'

const bookingEndpoint = 'booking/'

const bookingService = {
  get: async () => {
    const { data } = await httpService.get(bookingEndpoint)
    const { content } = data
    return content
  },
  getCurrentBookings: async (userId) => {
    const { data } = await httpService.get(bookingEndpoint, {
      params: {
        orderBy: '"userId"',
        equalTo: `"${userId}"`,
      },
    })
    const { content } = data
    return content
  },
  create: async (payload) => {
    const { data } = await httpService.put(bookingService + payload.id, payload)
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