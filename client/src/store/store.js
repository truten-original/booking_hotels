import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import bookingReducer from './bookingsSlice'
import bookmarksReducer from './bookmarksSlice'
import commentsReducer from './commentsSlice'
import facilitiesReducer from './facilitiesSlice'
import favouritesReducer from './favouritesSlice'
import filterReducer from './roomsFilterSlice'
import roomsReducer from './roomsSlice'
import typesReducer from './typesSlice'
import usersReducer from './usersSlice'
const rootReducer = combineReducers({
  types: typesReducer,
  facilities: facilitiesReducer,
  bookings: bookingReducer,
  rooms: roomsReducer,
  users: usersReducer,
  comments: commentsReducer,
  bookmarks: bookmarksReducer,
  filters: filterReducer,
  favourites: favouritesReducer
})
const store = configureStore({
  reducer: rootReducer,
})
export default store
