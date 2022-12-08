import { createAction, createSlice } from '@reduxjs/toolkit'
import authService from '../service/auth.service'
import localStorageService from '../service/localStorage.service'
import usersService from '../service/user.service'
import { redirect } from 'react-router-dom'
const initialState = localStorageService.getAccessToken()
  ? {
      isLoading: true,
      isAuthLoading: false,
      auth: { userId: localStorageService.getUserId() },
      currentUser: null,
      isAdmin: localStorageService.getAdminStatus(),
      isLoggedIn: true,
      entities: [],
      error: null,
    }
  : {
      isAuthLoading: true,
      isLoading: true,
      auth: null,
      currentUser: null,
      isLoggedIn: false,
      entities: [],
      error: null,
      isAdmin: null,
    }

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true
    },
    usersRecieved: (state, { payload }) => {
      state.entities = payload
      state.currentUser = state.entities.find(user => user._id === state.auth.userId)
      state.isLoading = false
    },
    usersRequestFailed: (state, { payload }) => {
      state.error = payload
      state.isLoading = false
    },

    userCreatedRequest: (state) => {
      state.isLoading = true
    },
    userCreated: (state, { payload }) => {
      state.entities.push(payload)
      state.isLoading = false
    },
    userUpdated: (state, { payload }) => {
      const index = state.entities.findIndex((user) => user._id === payload._id)
      state.entities[index] = { ...payload }
      state.currentUser = payload
    },
    userLoggedout: (state) => {
      state.isLoggedIn = false
      state.auth = null
      state.entities = []
      state.isAdmin = null
      state.currentUser = null
    },
    authRequested: (state) => {
      state.isAuthLoading = true
      state.error = null
    },
    authRequestSucces: (state, { payload }) => {
      state.auth = payload
      state.isLoggedIn = true
      state.isAuthLoading = false
    },
    authRequestFailed: (state, { payload }) => {
      state.error = payload
      state.isAuthLoading = false
    },
    currentUserRecieved: (state, {payload}) => {
      state.currentUser = payload
    },
    adminLoggedIn: (state) => {
      state.isAdmin = true
    },
  },
})
const userUpdateRequested = createAction('users/userUpdateRequested')
const userUpdateRequestFailed = createAction('users/userUpdateRequestFailed')
const currentUserRecieveFailed = createAction('users/currentUserRecieveFailed')
const { reducer: usersReducer, actions } = usersSlice
const {
  authRequestFailed,
  authRequestSucces,
  authRequested,
  userLoggedout,
  userUpdated,
  usersRequestFailed,
  usersRecieved,
  usersRequested,
  adminLoggedIn,
  currentUserRecieved
} = actions
export const signUp =
  ({type, ...rest}) =>
  async (dispatch) => {
    dispatch(authRequested())
    try {
      const data = await authService.register(rest)
      localStorageService.setTokens(data)
      dispatch(authRequestSucces({ userId: data.userId}))
      redirect('/rooms')
    } catch (error) {
      const { response } = error
      if (response.data.error.message === 'EMAIL_EXISTS') {
        const message = 'пользователь с такой почтой уже существует'
        dispatch(authRequestFailed({ [type]: message }))
      } else {
        dispatch(authRequestFailed(error.message))
      }
    }
  }
export const signIn =
  ({ email, password, type }) =>
  async (dispatch) => {
    dispatch(authRequested())
    try {
      const data = await authService.login({ email, password })
      console.log(data)
      if (data.userId === process.env.REACT_APP_ADMIN_ID) {
        localStorageService.setAdminToken()
        dispatch(adminLoggedIn())
      }
      localStorageService.setTokens(data)
      dispatch(authRequestSucces({ userId: data.userId}))
      redirect('/rooms')
    } catch (error) {
      const { response } = error
      if (
        response.data.error.message === 'EMAIL_NOT_FOUND' ||
        'INVALID_PASSWORD'
      ) {
        const message = 'неправильный логин или пароль'
        dispatch(authRequestFailed({ [type]: message }))
      } else {
        dispatch(authRequestFailed(error.message))
      }
    }
  }
export const userLogout = () => (dispatch) => {
  dispatch(userLoggedout())
  localStorageService.removeAuthData()
}
export const getCurrentUserData = (payload) => async (dispatch) => {
  try {
    const data = await usersService.getCurrentUser(payload)
    dispatch(currentUserRecieved(data))
  } catch (error) {
    dispatch(currentUserRecieveFailed(error.message))
  }
} 
export const updateUser = (payload) => async (dispatch) => {
  dispatch(userUpdateRequested())
  try {
    const data = await usersService.update(payload)
    dispatch(userUpdated(data))
  } catch (error) {
    dispatch(userUpdateRequestFailed(error.message))
  }
}
export const loadUsers = () => async (dispatch) => {
  dispatch(usersRequested())
  try {
    const data = await usersService.get()
    if (data === null) {
      data = []
    }
    dispatch(usersRecieved(data))
  } catch (error) {
    dispatch(usersRequestFailed(error.message))
  }
}
export const getCurrentUser = (state) => state.users.currentUser
export const getAdminMeaning = (state) => state.users.isAdmin 
export const getSignUpError = (state) => state.users.error?.signUp
export const getLoginError = (state) => state.users.error?.login
export const getUsers  = (state) => state.users.entities
export const getUsersLoadingStatus = (state) => state.users.isLoading
export const getAuthLoadingStatus = (state) => state.users.isAuthLoading
export const getUserById = (id) => (state) =>
  state.users.entities.find((user) => user._id === id)
export const getAuthId = (state) => state.users.auth?.userId
export const getLoggedStatus = () => (state) => state.users.isLoggedIn
export const getLoggedUser = () => (state) =>
  state.users.entities.find((user) => user._id === state.users.auth.userId)
export default usersReducer
