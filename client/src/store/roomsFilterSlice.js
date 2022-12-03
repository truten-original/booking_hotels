import { createSlice } from '@reduxjs/toolkit'
const roomsFilterSlice = createSlice({
  name: 'filters',
  initialState: {
    sortItems: [
      { value: 'raiting', description: 'сначала популярные' },
      { value: 'facilities', description: 'сначала больше удобств' },
      { value: 'expensive', description: 'дороже' },
      { value: 'cheaper', description: 'дешевле' },
    ],
    currentFilter: 'expensive',
  },
  reducers: {
    changeFilter: (state, { payload }) => {
      state.currentFilter = payload
    },
  },
})
const { actions, reducer: filterReducer } = roomsFilterSlice
export const { changeFilter } = actions

export const getFilters = (state) => state.filters.sortItems
export const getCurrentFilter = (state) => state.filters.currentFilter

export default filterReducer
