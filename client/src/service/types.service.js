import httpService from './http.service'

const typesEndPoint = 'type/'

const typesService = {
  get: async () => {
    const { data } = await httpService.get(typesEndPoint)
    const { content } = data
    return content
  },
}

export default typesService