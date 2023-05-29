import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { User, Users } from '../models/auth'

const baseUrl = `http://localhost:${process.env.NEXT_PUBLIC_PORT}/`

export const authAPI = createApi({
  reducerPath: 'auth/api',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (build) => ({
    getUsers: build.query<Users, void>({
      query: () => ({
        url: 'users',
      }),
    }),
    createUser: build.mutation<User, User>({
      query: (body:User) => ({
        url: 'register',
        method: 'POST',
        body
      })
    }),
    signIn: build.mutation<User, User>({
      query: (body:User) => ({
        url: 'signin',
        method: 'POST',
        credentials: 'include',
        body
      })
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: 'logout',
        method: 'POST',
        credentials: 'include',
      })
    }),
    verify: build.mutation<void, void>({
      query: () => ({
        url: 'verify',
        method: 'POST',
        credentials: 'include',
      })
    })
  }),
})

export const { useGetUsersQuery, useCreateUserMutation, useSignInMutation, useVerifyMutation, useLogoutMutation } = authAPI
