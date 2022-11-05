import { createSlice } from '@reduxjs/toolkit'

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
      state.isLoading = false
      state.entities = payload
    },
    typesRequestFailed: (state, { paylaod }) => {
      state.isLoading = false
      state.error = paylaod
    },
  },
})

const { reducer: typesReducer, actions } = typesSlice
const { typesRequested, typesRecieved, typesRequestFailed } = actions


export default typesReducer