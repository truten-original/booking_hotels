import { createSelector, createSlice } from '@reduxjs/toolkit'
import roomService from '../service/rooms.service'
import * as _ from 'lodash'
import { getClasses, getCurrentClass, getCurrentFilter } from './roomsFilterSlice'
import { getBookmarks } from './bookmarksSlice'
import { calculateRaiting } from '../utils/calculateRaiting'
import { getBookings } from './bookingsSlice'
import { getFacilities } from './facilitiesSlice'
import { getTypes } from './typesSlice'
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
  state.rooms.entities.find((room) => room._id === id)
const allRooms = (state) => state.rooms.entities
export const getRooms = createSelector(
  [allRooms, getCurrentFilter, getBookmarks, getTypes, getCurrentClass],
  (rooms, filter, books, types, curClass) => {
    const roomsWithTypes = rooms.map(r => {
      const currentType = types.find(t => t._id === r.type)
      return {...r, type: currentType}
    })
    const getResArr = (curClass) =>  {
      if(curClass === 'indeterminately') return roomsWithTypes 
      else return roomsWithTypes.filter(r => r.type.name === curClass)
      }
      const resArr = getResArr(curClass)
    if (filter === 'expensive') {
      return _.orderBy(resArr, ['price'], ['desc'])
    } else if (filter === 'cheaper') {
      return _.orderBy(resArr, ['price'], ['asc'])
    } else if (filter === 'raiting') {
      const roomsWithBooksArr = resArr.map((room) => {
        const currentBookArr = books.filter((b) => b.roomId === room._id)
        if (currentBookArr.length !== 0) {
          return { ...room, bookmark: calculateRaiting(currentBookArr) }
        } else {
          return { ...room, bookmark: 0 }
        }
      })
      return _.orderBy(roomsWithBooksArr, ['bookmark'], ['desc'])
    } else {
      return [...resArr].sort(
        (a, b) => b[`${filter}`].length - a[`${filter}`].length
      )
    }
  }
)
export const getRoomsWithBookingStatus = createSelector(
  [allRooms, getBookings],
  (rooms, books) => {
    const roomsWithBookingStatus = rooms.map((room) => {
      const currentBooks = books.filter((item) => item.roomId === room._id)
      if (currentBooks.length) {
        return currentBooks.map((book) => {
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
      } else return { ...room, booking: false }
    })
    return roomsWithBookingStatus.flat()
  }
)
export const getCurrentRooms = (favArr) => (state) => {
  const resArr = []
  const rooms = state.rooms.entities
  for (const room of rooms) {
    for (const fav of favArr) {
      if (room._id === fav.roomId) {
        resArr.push(room)
      }
    }
  }
  return resArr
}
export const getRoom = (id) => (state) =>
  state.rooms.entities.find((r) => r._id === id)
export const getAllRooms = (state) => state.rooms.entities
export const getRoomsSortParams = () => (state) => state.rooms.sortItems
export const getRoomsLoadingStatus = (state) => state.rooms.isLoading
export default roomsReducer
