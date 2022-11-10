import { createSlice } from '@reduxjs/toolkit'
import commentsService from '../service/comment.service'

const initialState = {
  entities: [],
  isLoading: true,
  error: null,
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    commentsRequested: (state) => (state.isLoading = true),
    commentsRecieved: (state, { payload }) => {
      state.entities = payload
      state.isLoading = false
    },
    commentsRequestFailed: (state, { payload }) => {
      state.entities = payload
      state.isLoading = false
    },
    commentRemoveRequest: (state) => (state.isLoading = true),
    commentRemoved: (state, { payload }) => {
      state.entities = state.entities.filter((room) => room.id !== payload)
      state.isLoading = false
    },
    commentRemoveRequestFailed: (state, { paylaod }) => {
      state.error = paylaod
      state.isLoading = false
    },
    commentCreateRequest: (state) => (state.isLoading = true),
    commentCreateSucces: (state, { payload }) => {
      state.entities.push(payload)
      state.isLoading = false
    },
    commentCreateRequestFailed: (state, { payload }) => {
      state.error = payload
      state.isLoading = false
    },
  },
})

const { reducer: commentsReducer, actions } = commentsSlice
const {
  commentCreateRequestFailed,
  commentCreateSucces,
  commentCreateRequest,
  commentRemoveRequestFailed,
  commentRemoved,
  commentRemoveRequest,
  commentsRequestFailed,
  commentsRecieved,
  commentsRequested,
} = actions

export const loadComments =  (roomId) => async (dispatch) => {
  dispatch(commentsRequested)
  try {
    const data = await commentsService.get(roomId)
    dispatch(commentsRecieved(data))
  } catch (error) {
    dispatch(commentsRequestFailed(error.message))
  }
}
export const createComment = (payload) => async (dispatch) => {
  dispatch(commentCreateRequest())
  try {
    const data = await commentsService.create(payload)
    dispatch (commentCreateSucces(data))
  } catch (error) {
    dispatch (commentCreateRequestFailed(error.message))
  }
} 

export const removeComment = (id) => (dispatch) => {
  dispatch(commentRemoveRequest())
  try {
    const data = commentsService.delete(id)
    if (data === null) {
      dispatch(commentRemoved(id))
    }
  } catch (error) {
    dispatch(commentRemoveRequestFailed(error.message))
  }
}

export default commentsReducer