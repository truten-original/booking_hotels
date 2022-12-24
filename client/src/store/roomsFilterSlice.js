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
    classSortItems : [
      {value: 'president', description: 'президент'},
      {value: 'premium', description: 'премиум'},
      {value: 'standart', description: 'стандарт'},
      {value: 'econom', description: 'эконом'},
      {value: 'indeterminately', description:'показать все'}

    ],
    currentFilter: 'expensive',
    currentClass: 'indeterminately'
  },
  reducers: {
    changeFilter: (state, { payload }) => {
      state.currentFilter = payload
    },
    changeClass: (state, {payload}) => {
      state.currentClass = payload
    }
  },
})
const { actions, reducer: filterReducer } = roomsFilterSlice
export const { changeFilter, changeClass } = actions

export const getFilters = (state) => state.filters.sortItems
export const getClasses = (state) => state.filters.classSortItems
export const getCurrentFilter = (state) => state.filters.currentFilter
export const getCurrentClass = (state) => state.filters.currentClass
export default filterReducer
