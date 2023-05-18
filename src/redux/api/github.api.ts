import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SearchUsersResponse, UserReposResponse } from '../models/git'

const baseUrl = 'https://api.github.com/'

export const gitAPI = createApi({
  reducerPath: 'github/api',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (build) => ({
    searchUsers: build.query<SearchUsersResponse, string>({
      query: (login: string) => ({
        url: 'search/users',
        params: {
          q: login,
          per_page: 10,
        },
      }),
    }),
    getUserRepos: build.query<UserReposResponse, string>({
      query: (username: string) => ({
        url: `users/${username}/repos`,
      }),
    }),
  }),
})

export const { useSearchUsersQuery, useLazyGetUserReposQuery } = gitAPI
