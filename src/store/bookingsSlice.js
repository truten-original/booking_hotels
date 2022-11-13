import { createSlice } from '@reduxjs/toolkit'
import bookingService from '../service/booking.service'

const initialState = {
  entities: [],
  currentUserEntities: [],
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
    currentUserBookingsRecieved: (state, { payload }) => {
      state.currentUserEntities = payload
      state.isLoading = false
    },
    currentUserBookingsRequestFailed: (state, { payload }) => {
      state.error = payload
      state.isLoading = false
    },
    bookingRemoved: (state, { payload }) => {
      state.entities = state.entities.filter((b) => b.id !== payload)
      state.currentUserEntities = state.currentUserEntities.filter(
        (b) => b.id !== payload
      )
    },
    bookingCreated: (state, { payload }) => {
      state.entities.push(payload)
      state.currentUserEntities.push(payload)
    },
  },
})
const { reducer: bookingReducer, actions } = bookingsSlice
const {
  bookingsRequested,
  booKingsRecieved,
  bookingsRequestFailed,
  currentUserBookingsRecieved,
  currentUserBookingsRequestFailed,
  bookingRemoveRequested,
  bookingRemoveRequestFailed,
  bookingRemoved,
  bookingCreatedRequested,
  bookingCreatedrequestFailed,
  bookingCreated,
} = actions

export const loadBookings = () => async (dispatch) => {
  dispatch(bookingsRequested())
  try {
    const data = await bookingService.get()
    dispatch(booKingsRecieved(data))
  } catch (error) {
    dispatch(bookingsRequestFailed(error.message))
  }
}
export const loadCurrentBookings = (id) => async (dispatch) => {
  dispatch(bookingsRequested())
  try {
    const data = bookingService.getCurrentBookings(id)
    dispatch(currentUserBookingsRecieved(data))
  } catch (error) {
    dispatch(currentUserBookingsRequestFailed(error.message))
  }
}
export const removeBooking = (id) => async (dispatch) => {
  dispatch(bookingRemoveRequested())
  try {
    const data = await bookingService.delete(id)
    if (data === null) {
      dispatch(bookingRemoved(id))
    }
  } catch (error) {
    dispatch(bookingRemoveRequestFailed(error.message))
  }
}
export const createBooking = (payload) => async (dispatch) => {
  dispatch(bookingCreatedRequested())
  try {
    const { data } = await bookingService.create(payload)
    dispatch(bookingCreated(data))
  } catch (error) {
    dispatch(bookingCreatedrequestFailed(error.message))
  }
}

export const currentRoomBookingsIntervals = (roomId) => (state) => {
  const currentBookings = state.bookings.entities.filter(
    (b) => b.roomId === roomId
  )
  return currentBookings.map((b) => [b.arrivalTime, b.departureTime])
}

export default bookingReducer
