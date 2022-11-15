import { createSlice } from '@reduxjs/toolkit'
import roomService from '../service/rooms.service'
import * as _ from 'lodash'
const initialState = {
  entities: [],
  isLoading: true,
  error: null,
  lastFetch: null,
  sortItems: [
    { value: 'raiting', description: 'сначала популярные' },
    { value: 'facilities', description: 'сначала больше удобств' },
    { value: 'expensive', description: 'дороже' },
    { value: 'cheaper', description: 'дешевле' },
  ],
}
const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    roomsRequested: (state) => {
      state.isLoading = true
    },
    roomsRecieved: (state, { payload }) => {
      state.isLoading = false
      state.entities = payload
    },
    roomsRequestFailed: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
    },
  },
})

const { actions, reducer: roomsReducer } = roomsSlice
const { roomsRequested, roomsRecieved, roomsRequestFailed } = actions

export const loadRooms = () => async (dispatch) => {
  dispatch(roomsRequested())
  try {
    const data = await roomService.get()
    dispatch(roomsRecieved(data))
  } catch (error) {
    dispatch(roomsRequestFailed(error.message ))
  }
}
export const getCurrentRoom = (id) => (state) => state.rooms.entities.find(room => room.id === id)
export const getRooms = (filterParam) => (state) =>{
  if(filterParam === "expensive") {
    return _.orderBy(state.rooms.entities, ['price'], ['desc'])
  }
  else if(filterParam === "cheaper"){
    return _.orderBy(state.rooms.entities, ['price'], ['asc'])
  }
  else {
   return _.orderBy(state.rooms.entities, [`${filterParam}`], ['desc'])
  }
}
export const getRoomsSortParams = () => (state) => state.rooms.sortItems
export const getRoomsLoadingStatus = () => (state) => state.rooms.isLoading
export default roomsReducer
