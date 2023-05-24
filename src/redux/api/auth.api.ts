import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { User, Users } from '../models/auth'

const baseUrl = 'http://localhost:3001/'

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
        url: 'users',
        method: 'POST',
        body
      })
    }),
    signIn: build.mutation<User, User>({
      query: (body:User) => ({
        url: 'signin',
        method: 'POST',
        body
      })
    })
  }),
})

export const { useGetUsersQuery, useCreateUserMutation, useSignInMutation } = authAPI
