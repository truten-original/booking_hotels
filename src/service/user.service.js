import httpService from './http.service'

const usersEndpoint = 'user/'

const usersService = {
    get: async () => {
        const {data} = await httpService.get(usersEndpoint)
        const {content} = data
        return content 
    },
    remove: async (id) => {
       const {data} = await httpService.delete(usersEndpoint + id)
       return data
    } ,
    create: async (payload) => {
        const {data} = await httpService.put(usersEndpoint + payload.id, payload)
        const {content} = data
        return content
    }, 
    update: async (payload) => {
        const {data} = await httpService.patch(usersEndpoint + payload.id, payload)
        const {content} = data
        return content
    }
}

export default usersService