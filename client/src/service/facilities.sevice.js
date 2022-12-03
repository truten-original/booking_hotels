import httpService from './http.service'

const facilitiesdEndpoint = 'convenience/'

const facilitiesService = {
  get: async () => {
    const { data } = await httpService.get(facilitiesdEndpoint)
    const { content } = data
    return content
  },
}

export default facilitiesService