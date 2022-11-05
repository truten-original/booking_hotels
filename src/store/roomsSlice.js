import { createSlice } from '@reduxjs/toolkit'
import roomService from '../service/rooms.service'

const initialState = {
  entities: [],
  isLoading: false,
  error: null,
  lastFetch: null,
  sortItems: [
    { value: 'raiting', description: 'По популярности' },
    { value: 'facilities', description: 'По количеству удобств' },
    { value: 'price', description: 'По цене' },
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

export const getRooms = () => (state) => state.rooms.entities
export const getRoomsLoadingStatus = () => (state) => state.rooms.isLoading
export default roomsReducer
