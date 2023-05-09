import { configureStore } from '@reduxjs/toolkit'
import { todoAPI } from './api/todo.api'
import { authSlice } from './slices/auth.slice'

export const store = configureStore({
  reducer: {
    [todoAPI.reducerPath]: todoAPI.reducer,
    auth: authSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(todoAPI.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch