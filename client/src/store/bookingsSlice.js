import { createAction, createSelector, createSlice } from '@reduxjs/toolkit'
import bookingService from '../service/booking.service'
import { getAllRooms } from './roomsSlice'
import { getUsers } from './usersSlice'

const initialState = {
  entities: [],
  currentRoomEntities: [],
  isLoading: true,
  error: null,
}

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    bookingsRequested: (state) => {
      state.isLoading = true
    },
    booKingsRecieved: (state, { payload }) => {
      state.entities = payload
      state.isLoading = false
    },
    bookingsRequestFailed: (state, { paylaod }) => {
      state.error = paylaod
      state.isLoading = false
    },
    currentRoomBookingsRecieved: (state, { payload }) => {
      state.currentRoomEntities = payload
      state.isLoading = false
    },
    currentRoomBookingsRequestFailed: (state, { payload }) => {
      state.error = payload
      state.isLoading = false
    },
    bookingRemoved: (state, { payload }) => {
      state.entities = state.entities.filter((b) => b._id !== payload)
      state.currentRoomEntities = state.currentRoomEntities.filter(
        (b) => b._id !== payload
      )
    },
    bookingCreated: (state, { payload }) => {
      state.entities.push(payload)
    },
  },
})
const { reducer: bookingReducer, actions } = bookingsSlice
const {
  bookingsRequested,
  booKingsRecieved,
  bookingsRequestFailed,
  currentRoomBookingsRequestFailed,
  currentRoomBookingsRecieved,
  bookingRemoved,
  bookingCreated,
} = actions
const bookingCreatedRequested = createAction('bookings/bookingCreatedRequested')
const bookingCreatedrequestFailed = createAction(
  'bookings/bookingCreatedrequestFailed'
)
const bookingRemoveRequested = createAction('bookings/bookingRemoveRequested')
const bookingRemoveRequestFailed = createAction(
  'bookings/bookingRemoveRequestFailed'
)
export const loadBookings = () => async (dispatch) => {
  dispatch(bookingsRequested())
  try {
    let data = await bookingService.get()
    if (data === null) {
      data = []
    }
    const actualData = data.filter((b) => b.departureDate > Date.now())
    dispatch(booKingsRecieved(actualData))
    data.forEach((b) => {
      if (b.departureDate < Date.now()) {
        bookingService.delete(b.id)
      }
    })
  } catch (error) {
    dispatch(bookingsRequestFailed(error.message))
  }
}
export const loadCurrentRoomBookings = (id) => async (dispatch) => {
  dispatch(bookingsRequested())
  try {
    let data = await bookingService.getCurrentBookings(id)
    if (data === null) {
      data = []
    }
    const actualData = data.filter((b) => b.departureDate > Date.now())
    dispatch(currentRoomBookingsRecieved(actualData))
    data.forEach((b) => {
      if (b.departureDate < Date.now()) {
        bookingService.delete(b.id)
      }
    })
  } catch (error) {
    dispatch(currentRoomBookingsRequestFailed(error.message))
  }
}
export const removeBooking = (id) => async (dispatch) => {
  dispatch(bookingRemoveRequested())
  try {
    const data = await bookingService.delete(id)
    if (data === null || data === '') {
      dispatch(bookingRemoved(id))
    }
  } catch (error) {
    dispatch(bookingRemoveRequestFailed(error.message))
  }
}
export const createBooking = (payload) => async (dispatch) => {
  dispatch(bookingCreatedRequested())
  try {
    const data = await bookingService.create(payload)
    dispatch(bookingCreated(data))
  } catch (error) {
    dispatch(bookingCreatedrequestFailed(error.message))
  }
}
export function getBookings(state) {
  return state.bookings.entities
}
export const getFullInfoBookings = createSelector(
  [getBookings, getAllRooms, getUsers],
  (books, rooms, users) => {
    if (rooms.length && users.length) {
      const resArr = books.map((book) => {
        const user = users.find((user) => user._id === book.userId)
        const room = rooms.find((room) => room._id === book.roomId)
        return {
          ...book,
          roomName: room.name,
          userName: user.name,
          userSurname: user.surname,
        }
      })
      return resArr
    } else return []
  }
)
export const currentRoomBookingsIntervals = () => (state) => {
  const currentBookings = state.bookings.currentRoomEntities.map((b) => [
    b.arrivalDate,
    b.departureDate,
  ])
  return currentBookings
}
export const getCurrentUserBookings = (id) => (state) => {
  return state.bookings.entities.filter((b) => b.userId === id)
}
export const getBookingLoadingStatus = (state) => state.bookings.isLoading

export default bookingReducer
