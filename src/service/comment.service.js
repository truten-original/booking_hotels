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
    const { data } = httpService.put(commentEndpoint + payload.id, payload)
    const { content } = data
    return content
  },
  delete: async (id) => {
    const { data } = httpService.delete(commentEndpoint + id)
    console.log(data)
  },
}

export default commentsService