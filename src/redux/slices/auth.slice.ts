import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AuthState {
  user: string | null
}

const initialState: AuthState = {
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<string | null>) {
      state.user = action.payload
    },
  },
})
