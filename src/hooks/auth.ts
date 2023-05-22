import { useCreateUserMutation, useGetUsersQuery, useSignInMutation } from '@/redux/api/auth.api'
import { authSlice } from '@/redux/slices/auth.slice'
import { RootState } from '@/redux/store'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function useAuth() {
  const dispatch = useDispatch()
  const useAuthSelector = useSelector((state: RootState) => state.auth)
  const { user, status } = useAuthSelector
  const {data: users = [], error: getUsersError} = useGetUsersQuery()
  const [createUser, {error: createUserError}] = useCreateUserMutation()
  const [signIn, {error: signInError}] = useSignInMutation()

  useEffect(() => {
    setAllUsers(users)
  }, [])

  const initData = () => {
    const user = JSON.parse(localStorage.getItem('user') ?? 'null')
    // const allUsers = JSON.parse(localStorage.getItem('allUsers') ?? '[]')
    // setAllUsers(allUsers)
    setUser(user)
  }

  const actions = bindActionCreators(
    {
      ...authSlice.actions,
    },
    dispatch,
  )
  const { login, logout, signup, setStatus, setAllUsers, setUser } = actions
  return {
    user,
    login,
    logout,
    status,
    signup,
    setStatus,
    setAllUsers,
    setUser,
    initData,
    createUser,
    createUserError,
    users,
    getUsersError,
    signIn,
    signInError
  }
}