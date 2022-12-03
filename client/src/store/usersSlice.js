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
      state.currentUser = state.entities.find(user => user.id === state.auth.userId)
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
    userRemoved: (state, { payload }) => {
      state.entities.filter((user) => user.id !== payload)
    },
    userUpdated: (state, { payload }) => {
      const index = state.entities.findIndex((user) => user.id === payload.id)
      state.entities[index] = { ...payload }
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
      state.currentUser = state.entities.find(user => user.id === payload.userId)
      state.isLoggedIn = true
      state.isAuthLoading = false
    },
    authRequestFailed: (state, { payload }) => {
      state.error = payload
      state.isAuthLoading = false
    },
    adminLoggedIn: (state) => {
      state.isAdmin = true
    },
  },
})
const userUpdateRequested = createAction('users/userUpdateRequested')
const userUpdateRequestFailed = createAction('users/userUpdateRequestFailed')
const userRemoveRequested = createAction('users/userRemoveRequest')
const userRemoveRequestFailed = createAction('users/userRemoveRequest')
const userCreateRequestFailed = createAction('users/userCreateRequestFailed')

const { reducer: usersReducer, actions } = usersSlice
const {
  authRequestFailed,
  authRequestSucces,
  authRequested,
  userLoggedout,
  userUpdated,
  userRemoved,
  userCreated,
  usersRequestFailed,
  usersRecieved,
  usersRequested,
  adminLoggedIn
} = actions
const userCreatedRequest = createAction('users/userCreatedRequest')
export const signUp =
  ({ email, password, type, ...rest }) =>
  async (dispatch) => {
    dispatch(authRequested())
    try {
      const data = await authService.register({ email, password })
      localStorageService.setTokens(data)
      dispatch(authRequestSucces({ userId: data.localId }))
      dispatch(
        userCreate({
          id: data.localId,
          email,
          image: `https://avatars.dicebear.com/api/avataaars/${(
            Math.random() + 1
          )
            .toString(36)
            .substring(7)}.svg`,
          ...rest,
        })
      )
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
      if (data.localId === process.env.REACT_APP_ADMIN_ID) {
        localStorageService.setAdminToken()
        dispatch(adminLoggedIn())
      }
      localStorageService.setTokens(data)
      dispatch(authRequestSucces({ userId: data.localId }))
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
const userCreate = (payload) => async (dispatch) => {
  dispatch(userCreatedRequest())
  try {
    const data = await usersService.create(payload)
    dispatch(userCreated(data))
  } catch (error) {
    dispatch(userCreateRequestFailed(error.message))
  }
}

export const userLogout = () => (dispatch) => {
  dispatch(userLoggedout())
  localStorageService.removeAuthData()
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
  state.users.entities.find((user) => user.id === id)
export const getAuthId = (state) => state.users.auth?.userId
export const getLoggedStatus = () => (state) => state.users.isLoggedIn
export const getLoggedUser = () => (state) =>
  state.users.entities.find((user) => user.id === state.users.auth.userId)
export default usersReducer
