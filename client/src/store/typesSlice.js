import { createSlice } from '@reduxjs/toolkit'
import typesService from '../service/types.service'

const initialState = {
  entities: [],
  isLoading: false,
  lastFetch: null,
  error: null,
}

const typesSlice = createSlice({
  name: 'types',
  initialState,
  reducers: {
    typesRequested: (state) => {
      state.isLoading = true
    },
    typesRecieved: (state, { payload }) => {
      state.entities = payload
      state.isLoading = false
    },
    typesRequestFailed: (state, { paylaod }) => {
      state.error = paylaod
      state.isLoading = false
    },
  },
})

const { reducer: typesReducer, actions } = typesSlice
const { typesRequested, typesRecieved, typesRequestFailed } = actions

export const loadTypes = () => async (dispatch) => {
  dispatch(typesRequested())
  try {
    const data = await typesService.get()
    dispatch(typesRecieved(data))
  } catch (error) {
    dispatch(typesRequestFailed(error.message))
  }
}
export const getTypes = () => (state) => state.types.entities
export const getCurrentType = (id) => (state) =>
  state.types.entities.find((type) => type._id === id)
export const getTypesLoadingStatus = () => (state) => state.types.isLoading
export default typesReducer
