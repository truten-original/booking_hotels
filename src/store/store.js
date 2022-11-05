import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import roomsReducer from './roomsSlice'
import typesReducer from './typesSlice'
const rootReducer = combineReducers({
  rooms: roomsReducer,
  types: typesReducer,
  // users: usersReducer
})
const store = configureStore({
  reducer: rootReducer,
})
export default store
