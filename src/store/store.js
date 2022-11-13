import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import bookingReducer from './bookingsSlice'
import commentsReducer from './commentsSlice'
import facilitiesReducer from './facilitiesSlice'
import roomsReducer from './roomsSlice'
import typesReducer from './typesSlice'
import usersReducer from './usersSlice'
const rootReducer = combineReducers({
  rooms: roomsReducer,
  types: typesReducer,
  facilities: facilitiesReducer,
  users: usersReducer,
  comments: commentsReducer,
  bookings: bookingReducer
})
const store = configureStore({
  reducer: rootReducer,
})
export default store
