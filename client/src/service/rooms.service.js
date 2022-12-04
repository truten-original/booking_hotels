import httpService from './http.service'

const roomEndpoint = 'room/'
const roomService = {
  get: async () => {
    const { data } = await httpService.get(roomEndpoint)
    const {content} = data 
    return content
  },
  create: async (data) => await httpService.post(roomEndpoint, data),
  delete: async (id) => await httpService.delete(roomEndpoint + id)
}

export default roomService
