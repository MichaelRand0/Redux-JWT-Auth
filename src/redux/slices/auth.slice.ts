import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '../models'

interface AuthState {
  user: User | null
  allUsers: User[] | []
  error: string | null
}

const initialState: AuthState = {
  user: null,
  allUsers: [],
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAllUsers(state, action: PayloadAction<User[]>) {
      state.allUsers = action.payload
      localStorage.setItem('allUsers', JSON.stringify(action.payload))
    },
    signup(state, action: PayloadAction<User>) {
      const isUserAlreadyExists = state.allUsers.filter(
        (user) => user.login === action.payload.login,
      )?.[0]
      if (isUserAlreadyExists) {
        state.error = 'Пользователь уже существует.'
      } else {
        const newUsers = {
          payload: [...state.allUsers, action.payload],
          type: authSlice.actions.setAllUsers.type,
        }
        authSlice.caseReducers.setAllUsers(state, newUsers)
      }
    },
    login(state, action: PayloadAction<User>) {
      const currentUser = state.allUsers.filter((user) => user.login === action.payload.login)?.[0]
      if (currentUser) {
        state.user = currentUser
        localStorage.setItem(
          'user',
          JSON.stringify({
            ...currentUser,
            timestamp: new Date().getTime(),
          }),
        )
      } else {
        state.error = 'Неправильный логин или пароль.'
      }
    },
    logout(state) {
      state.user = null
      localStorage.setItem('user', 'null')
    },
  },
})
