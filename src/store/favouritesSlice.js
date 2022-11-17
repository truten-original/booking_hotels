import { createAction, createSlice } from '@reduxjs/toolkit'
import favouritesService from '../service/favourites.service'

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    isLoading: true,
    entities: [],
    error: null,
  },
  reducers: {
    favouritesRequested: (state) => {
      state.isLoading = true
    },
    favouritesRecieved: (state, { payload }) => {
      state.entities = payload
      state.isLoading = false
    },
    favouritesRequestFailed: (state, { payload }) => {
      state.error = payload
      state.isLoading = false
    },
    favouriteCreated: (state, { payload }) => {
      state.entities.push(payload)
    },
    favouriteRemoved: (state, { payload }) => {
      state.entities = state.entities.filter((item) => item.id !== payload)
    },
  },
})

const { actions, reducer: favouritesReducer } = favouritesSlice
const {
  favouritesRequested,
  favouritesRecieved,
  favouritesRequestFailed,
  favouriteCreated,
  favouriteRemoved,
} = actions
const favouriteRemoveRequested = createAction(
  'favourites/favouriteRemoveRequested'
)
const favouriteCreateRequested = createAction(
  'favourites/favouriteCreateRequested'
)
const favouriteCreateRequesteFailed = createAction(
  'favourites/favouriteCreateRequesteFailed'
)
const favouriteRemoveRequesteFailed = createAction(
  'favourites/favouriteRemoveRequesteFailed'
)

export const loadFavourites = (userId) => async (dispatch) => {
  dispatch(favouritesRequested())
  try {
    const data = await favouritesService.get(userId)
    dispatch(favouritesRecieved(data))
  } catch (error) {
    dispatch(favouritesRequestFailed(error.message))
  }
}

export const createFavourite = (payload) => async (dispatch, getState) => {
  const  entities  = getState().favourites.entities
  dispatch(favouriteCreateRequested())
  try {
    if (!entities.find(item => item.roomId === payload.roomId)) {
      const data = await favouritesService.create(payload)
      dispatch(favouriteCreated(data))
    }
  } catch (error) {
    dispatch(favouriteCreateRequesteFailed(error.message))
  }
}

export const removeFavourite = (id) => async (dispatch) => {
  dispatch(favouriteRemoveRequested())
  try {
    const data = await favouritesService.remove(id)
    if (data === null) {
      dispatch(favouriteRemoved(id))
    }
  } catch (error) {
    dispatch(favouriteRemoveRequesteFailed(error.message))
  }
}
export const getFavouritesLoadingStatus = (state) => state.favourites.isLoading
export const getFavourites = (state) => state.favourites.entities
export const getCurrentRoomFavourite = (roomId) => (state) =>
  state.favourites.entities.find((item) => item.roomId === roomId)
export default favouritesReducer
