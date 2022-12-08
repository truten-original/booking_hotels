import httpService from './http.service'

const commentEndpoint = 'comment/'

const commentsService = {
  get: async (roomId) => {
    const { data } = await httpService.get(commentEndpoint, {
      params: {
        orderBy: '"roomId"',
        equalTo: `"${roomId}"`,
      },
    })
    const { content } = data
    return content
  },
  create: async (payload) => {
    const { data } = await httpService.post(commentEndpoint, payload)
    const { content } = data
    return content
  },
  delete: async (id) => {
    const { data } = await httpService.delete(commentEndpoint + id)
    const { content } = data
    return content
  },
}

export default commentsService