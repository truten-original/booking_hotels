import { createAction, createSlice } from '@reduxjs/toolkit'
import commentsService from '../service/comment.service'
import _ from 'lodash'
const initialState = {
  entities: [],
  isLoading: true,
  error: null,
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    commentsRequested: (state) => {state.isLoading = true},
    commentsRecieved: (state, { payload }) => {
      state.entities = payload
      state.isLoading = false
    },
    commentsRequestFailed: (state, { payload }) => {
      state.entities = payload
    },
    
    commentRemoved: (state, { payload }) => {
      state.entities = state.entities.filter((comment) => comment._id !== payload)
    },
    commentRemoveRequestFailed: (state, { paylaod }) => {
      state.error = paylaod
      state.isLoading = false
    },
    commentCreateRequest: (state) => {state.isLoading = true},
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
  commentsRequestFailed,
  commentsRecieved,
  commentsRequested,
} = actions
const commentRemoveRequest = createAction('comments/commentRemoveRequest')
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

export const removeComment = (id) => async (dispatch) => {
  dispatch(commentRemoveRequest())
  try {
    const data = await commentsService.delete(id)
    if (data === null || data === '') {
      dispatch(commentRemoved(id))
    }
  } catch (error) {
    dispatch(commentRemoveRequestFailed(error.message))
  }
}

export const getCommentsForCurrentRoom = () => (state) => _.orderBy(state.comments.entities, ['createdAt'], ['desc']) 
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading

export default commentsReducer