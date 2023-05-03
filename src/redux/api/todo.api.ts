import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { SearchUsersResponse } from '../models/todoModel'

const baseUrl = 'https://api.github.com/'

export const todoAPI = createApi({
  reducerPath: 'github/api',
  baseQuery: fetchBaseQuery({
    baseUrl
  }),
  endpoints: build => ({
    searchUsers: build.query<SearchUsersResponse, string>({
      query: (login: string) => ({
        url: 'search/users',
        params: {
          q: login,
          per_page: 10
        }
      })
    })
  })
})

export const {useSearchUsersQuery} = todoAPI