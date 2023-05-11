import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Status, User } from '../models'

interface AuthState {
  user: User | null
  allUsers: User[] | []
  status: Status
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
    setStatus(state, action: PayloadAction<Status>) {
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
      const currentUser = state.allUsers.filter((user) => user.login === action.payload.login && user.password === action.payload.password)?.[0]
      if (currentUser) {
        state.user = currentUser
        localStorage.setItem(
          'user',
          JSON.stringify({
            ...currentUser,
            timestamp: new Date().getTime(),
          }),
        )
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
      state.user = null
      localStorage.setItem('user', 'null')
    },
  },
})
