import { createSelector, createSlice } from '@reduxjs/toolkit'
import roomService from '../service/rooms.service'
import * as _ from 'lodash'
import { getCurrentFilter } from './roomsFilterSlice'
import { getBookmarks } from './bookmarksSlice'
import { calculateRaiting } from '../utils/calculateRaiting'
import { getBookings } from './bookingsSlice'
const initialState = {
  entities: [],
  isLoading: true,
  error: null,
  lastFetch: null,
}
const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    roomsRequested: (state) => {
      state.isLoading = true
    },
    roomsRecieved: (state, { payload }) => {
      state.entities = payload
      state.isLoading = false
    },
    roomsRequestFailed: (state, { payload }) => {
      state.error = payload
      state.isLoading = false
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
    dispatch(roomsRequestFailed(error.message))
  }
}
export const getCurrentRoom = (id) => (state) =>
  state.rooms.entities.find((room) => room.id === id)
const allRooms = (state) => state.rooms.entities
export const getRooms = createSelector(
  [allRooms, getCurrentFilter, getBookmarks],
  (rooms, filter, books) => {
    if (filter === 'expensive') {
      const arr = _.orderBy(rooms, ['price'], ['desc'])
      return arr
    } else if (filter === 'cheaper') {
      return _.orderBy(rooms, ['price'], ['asc'])
    } else if (filter === 'raiting') {
      const roomsWithBooksArr = rooms.map((room) => {
        const currentBookArr = books.filter((b) => b.roomId === room.id)
        if (currentBookArr.length !== 0) {
          return { ...room, bookmark: calculateRaiting(currentBookArr) }
        } else {
          return { ...room, bookmark: 0 }
        }
      })
      return _.orderBy(roomsWithBooksArr, ['bookmark'], ['desc'])
    } else {
      return _.orderBy(rooms, [`${filter}`], ['desc'])
    }
  }
)
export const getRoomsWithBookingStatus = createSelector(
  [allRooms, getBookings],
  (rooms, books) => {
    // const roomsWithBookingStatus = []
    const roomsWithBookingStatus = rooms.map((room) => {
      const currentBooks = books.filter((item) => item.roomId === room.id)
      if (currentBooks.length) {
        return  currentBooks.map((book) => {
          return {
            ...room,
            booking: {
              bookingId: book.id,
              isBooking: true,
              arrDate: book.arrivalDate,
              depDate: book.depatureDate,
            },
          }
        })
        
      } else return {...room, booking: false}
    })
    return roomsWithBookingStatus.flat()
  }
)
export const getCurrentRooms = (favArr) => (state) => {
  const resArr = []
  const rooms = state.rooms.entities
  for (const room of rooms) {
    for (const fav of favArr) {
      if (room.id === fav.roomId) {
        resArr.push(room)
      }
    }
  }
  return resArr
}
export const getRoom = (id) => (state) =>
  state.rooms.entities.find((r) => r.id === id)
export const getAllRooms = (state) => state.rooms.entities
export const getRoomsSortParams = () => (state) => state.rooms.sortItems
export const getRoomsLoadingStatus = (state) => state.rooms.isLoading
export default roomsReducer
