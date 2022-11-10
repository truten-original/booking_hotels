import { createAction, createSlice } from '@reduxjs/toolkit'
import history from '../utils/history'
import authService from '../service/auth.service'
import localStorageService from '../service/localStorage.service'
import usersService from '../service/user.service'

const initialState = localStorageService.getAccessToken()
  ? {
      isLoading: true,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      entities: [],
      error: null,
    }
  : {
      isLoading: true,
      auth: null,
      isLoggedIn: false,
      entities: [],
      error: null,
    }

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: (state) => (state.isLoading = true),
    usersRecieved: (state, { payload }) => {
      state.entities = payload
      state.isLoading = false
    },
    usersRequestFailed: (state, { payload }) => {
      state.error = payload
      state.isLoading = false
    },
    userCreatedRequest: (state) => (state.isLoading = true),
    userCreated: (state, { payload }) => {
      state.entities.push(payload)
      state.isLoading = false
    },
    userRemoved: (state, { payload }) => {
      state.entities.filter((user) => user.id !== payload)
    },
    userUpdated: (state, { payload }) => {
      state.isLoading = true
      const index = state.entities.findIndex((user) => user.id === payload.id)
      state.entities[index] = { ...payload }
    },
    userLoggedout: (state) => {
      state.isLoggedIn = false
      state.auth = null
      state.entities = []
    },
    authRequested: (state) => {
      state.error = null
    },
    authRequestSucces: (state, { payload }) => {
      state.auth = payload
      state.isLoggedIn = true
      state.isLoading = false
    },
    authRequestFailed: (state, { payload }) => {
      state.isLoggedIn = false
      state.auth = null
      state.error = payload
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
  userCreatedRequest,
  usersRequestFailed,
  usersRecieved,
  usersRequested,
} = actions

export const signIn =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(authRequested())
    try {
      const data = await authService.login({ email, password })
      localStorageService.setTokens(data)
      dispatch(authRequestSucces({ userId: data.localId }))
    } catch (error) {
      dispatch(authRequestFailed(error.message))
    }
  }
const userCreate = (payload) => async (dispatch) => {
  dispatch(userCreatedRequest())
  try {
    const data = await usersService.create(payload)
    dispatch(userCreated(data))
    // history.push('rooms')
  } catch (error) {
    dispatch(userCreateRequestFailed(error.message))
  }
}
// function userCreate(payload) {
//   return async function (dispatch) {
//       dispatch(userCreatedRequest())
//       try {
//           const { content } = await usersService.create(payload)
//           dispatch(userCreated(content))
//           // history.push("/")
//       } catch (error) {
//           dispatch(userCreateRequestFailed(error.message))
//       }
//   }
// }
export const signUp =
  ({ email, password, ...rest }) =>
  async (dispatch, getState) => {
    dispatch(authRequested())
    try {
      const data = await authService.register({ email, password })
      localStorageService.setTokens(data)
      dispatch(authRequestSucces({ userId: data.localId }))
      dispatch(
        userCreate({
          _id: data.localId,
          email,
          image: `https://avatars.dicebear.com/api/avataaars/${(
            Math.random() + 1
          )
            .toString(36)
            .substring(7)}.svg`,
          ...rest,
        })
      )
    } catch (error) {
      dispatch(authRequestFailed(error.message))
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
    dispatch(usersRecieved(data))
  } catch (error) {
    dispatch(usersRequestFailed(error.message))
  }
}

export const getUsers = () => (state) => state.users.entities
export const getUsersLoadingStatus = () => (state) => state.users.isLoading
export const getUserById = (id) => (state) =>
  state.users.entities.find((user) => user.id === id)
export const getAuth = () => (state) => state.users.auth
export const getLoggedStatus = () => (state) => state.users.isLoggedIn

export default usersReducer
