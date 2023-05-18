import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/auth.slice'
import { gitAPI } from './api/github.api'
import { authAPI } from './api/auth.api'
import { popupSlice } from './slices/popup.slice'

export const store = configureStore({
  reducer: {
    popup: popupSlice.reducer,
    auth: authSlice.reducer,
    [gitAPI.reducerPath]: gitAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(gitAPI.middleware, authAPI.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch