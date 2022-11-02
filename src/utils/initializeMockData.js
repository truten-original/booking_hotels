import { rooms, facilities, types } from '../assets/mockData/mockData'
import httpService from '../service/http.service'

export const initialize = async () => {
  try {
    for (const room of rooms) {
     await httpService.put(`room/${room.id}`, room)
    }
    for (const convenience of facilities) {
        await httpService.put(`convenience/${convenience.id}`, convenience)
    }
    for (const type of types) {
        await httpService.put(`type/${type.id}`, type)
    }
  } catch (error) {
    console.error(error.message)
  }
}
