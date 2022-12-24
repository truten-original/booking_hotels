import { createAction, createSlice } from '@reduxjs/toolkit'
import bookmarksService from '../service/bookMarks.service'

const initialState = {
  entities: [],
  isLoading: true,
  errors: null,
}

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    bookmarksRequested: (state) => {
      state.isLoading = true
    },
    bookmarksRecieved: (state, { payload }) => {
      state.entities = payload
      state.isLoading = false
    },
    bookmarksRequestFailed: (state, { payload }) => {
      state.errors = payload
      state.isLoading = false
    },
    bookmarkCreated: (state, { payload }) => {
      state.entities.push(payload)
    },
    bookmarkUpdated: (state, { payload }) => {
      const index = state.entities.findIndex((b) => b._id === payload._id)
      state.entities[index] = payload
    },
  },
})

const { actions, reducer: bookmarksReducer } = bookmarksSlice
const {
  bookmarksRequested,
  bookmarksRecieved,
  bookmarksRequestFailed,
  bookmarkCreated,
  bookmarkUpdated,
} = actions
const createRequested = createAction('bookings/createRequested')
const createRequestFailed = createAction('bookings/createRequestFailed')
const updateRequestFailed = createAction('bookings/updateRequestFailed')
const updateRequested = createAction('bookings/updateRequested')
export const loadBookmarks = () => async (dispatch) => {
  dispatch(bookmarksRequested())
  try {
    let data = await bookmarksService.get()
    if (data === null) {
      data = []
    }
    dispatch(bookmarksRecieved(data))
  } catch (error) {
    dispatch(bookmarksRequestFailed(error.message))
  }
}

export const createOrUpadateBookmark =
  (payload) => async (dispatch, getState) => {
    const { entities } = getState().bookmarks

    const index = entities.findIndex((item) => item.roomId === payload.roomId && item.userId === payload.userId)
    if ( index !== -1) {
      dispatch(updateRequested())
      try {
        const data = await bookmarksService.update(payload)
        dispatch(bookmarkUpdated(data))
      } catch (error) {
        dispatch(updateRequestFailed(error.message))
      }
    } else {
      dispatch(createRequested())
      try {
        const data = await bookmarksService.create(payload)
        dispatch(bookmarkCreated(data))
      } catch (error) {
        dispatch(createRequestFailed(error.message))
      }
    }
  }

export const getBookmarks = (state) => state.bookmarks.entities
export const getCurrentRoomBookmarkArr = (roomId) => (state) =>
  state.bookmarks.entities.filter((book) => book.roomId === roomId)
export const getCurrentUserForCurrentRoomBookmark = (payload) => (state) => {
  const book = state.bookmarks.entities.find(
    (book) => (book.roomId === payload.roomId && book.userId === payload.userId)
  )
  if (book !== undefined) {
    return book
  } else {
    return null
  }
}

export const getBookmarksLoadingStatus =  (state) =>
  state.bookmarks.isLoading

export default bookmarksReducer
