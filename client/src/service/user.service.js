import httpService from './http.service'

const usersEndpoint = 'user/'

const usersService = {
    get: async () => {
        const {data} = await httpService.get(usersEndpoint)
        const {content} = data
        return content 
    },
    getCurrentUser: async payload => {
        const {data} = await httpService.get( usersEndpoint + payload)
        const  {content} = data
        return content
    },
    update: async (payload) => {
        const {data} = await httpService.patch(usersEndpoint + payload._id, payload)
        const {content} = data
        return content
    }
}

export default usersService