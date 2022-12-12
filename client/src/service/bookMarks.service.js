import httpService from './http.service'
const bookmarksEndpoint = 'bookmark/'
const bookmarksService = {
  get: async () => {
    const { data } = await httpService.get(bookmarksEndpoint)
    const { content } = data
    return content
  },
  create: async (payload) => {
    const {data} = await httpService.post(bookmarksEndpoint, payload) 
    const {content} = data

    return content
  },
  update: async (payload) => {
    const {data} = await httpService.patch(bookmarksEndpoint + payload._id, payload)
    const {content} = data
    return content
  }
}

export default bookmarksService