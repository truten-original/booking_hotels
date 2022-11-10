import { createSlice } from '@reduxjs/toolkit'
import facilitiesService from '../service/facilities.sevice'

const initialState = {
  entities: [],
  isLoading: true,
  error: null,
}
const facilitiesSlice = createSlice({
  name: 'facilities',
  initialState,
  reducers: {
    faciltiesRequested: (state) => {
      state.isLoading = true
    },
    facilitiesRecieved: (state, { payload }) => {
      state.entities = payload
      state.isLoading = false
    },
    facilitiesRequestFailed: (state, { paylaod }) => {
      state.error = paylaod
      state.isLoading = false
    },
  },
})

const { reducer: facilitiesReducer, actions } = facilitiesSlice
const { faciltiesRequested, facilitiesRecieved, facilitiesRequestFailed } =
  actions
export const loadFacilities = () => async (dispatch) => {
  dispatch(faciltiesRequested())
  try {
    const data = await facilitiesService.get()
    dispatch(facilitiesRecieved(data))
  } catch (error) {
    dispatch(facilitiesRequestFailed(error.message))
  }
}
export const getFacilities = () => (state) => state.facilities.entities
export const getFacilitiesStatus = () => (state) => state.facilities.isLoading
export const getCurrentFacilities = (arr) => (state) => {
  const currentFacilities = []
  for (const el of arr) {
    for (const facil of state.facilities.entities) {
      if (el === facil.id) {
        currentFacilities.push(facil)
        break
      }
    }
  }
  return currentFacilities
}
export default facilitiesReducer
