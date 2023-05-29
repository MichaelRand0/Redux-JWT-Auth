import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '../models/git'

interface AuthState {
  user: User | null
  allUsers: User[] | []
  status: any
}

const initialState: AuthState = {
  user: null,
  allUsers: [],
  status: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload
    },
    setStatus(state, action: PayloadAction<any>) {
      state.status = action.payload
    },
    setAllUsers(state, action: PayloadAction<User[]>) {
      state.allUsers = action.payload
      localStorage.setItem('allUsers', JSON.stringify(action.payload))
    },
    signup(state, action: PayloadAction<User>) {
      const isUserAlreadyExists = state.allUsers.filter(
        (user) => user.login === action.payload.login,
      )?.[0]
      if (isUserAlreadyExists) {
        state.status = {
          type: 'error',
          message: 'Пользователь уже существует.',
        }
      } else {
        const newUsers = {
          payload: [...state.allUsers, action.payload],
          type: authSlice.actions.setAllUsers.type,
        }
        authSlice.caseReducers.setAllUsers(state, newUsers)
        state.status = {
          type: 'success',
          message: 'Аккаунт успешно создан!',
        }
      }
    },
    login(state, action: PayloadAction<User>) {
      const currentUser = state.allUsers.filter(
        (user) => user.login === action.payload.login && user.password === action.payload.password,
      )?.[0]
      if (currentUser) {
        const newUser = {
          payload: { ...currentUser },
          type: authSlice.actions.setUser.type,
        }
        authSlice.caseReducers.setUser(state, newUser)
        state.status = {
          type: 'success',
          message: 'Авторизация прошла успешна!',
        }
      } else {
        state.status = {
          type: 'error',
          message: 'Неправильный логин или пароль.',
        }
      }
    },
    logout(state) {
      const newUser = {
        payload: null,
        type: authSlice.actions.setUser.type,
      }
      authSlice.caseReducers.setUser(state, newUser)
    },
  },
})
