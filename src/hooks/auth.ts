import { useCreateUserMutation, useGetUsersQuery, useLogoutMutation, useSignInMutation, useVerifyMutation } from '@/redux/api/auth.api'
import { authSlice } from '@/redux/slices/auth.slice'
import { RootState } from '@/redux/store'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function useAuth() {
  const dispatch = useDispatch()
  const useAuthSelector = useSelector((state: RootState) => state.auth)
  const { user, status } = useAuthSelector
  const {data: users = [], error: getUsersError} = useGetUsersQuery()
  const [createUser, {error: createUserError}] = useCreateUserMutation()
  const [signIn, {error: signInError}] = useSignInMutation()
  const [verify] = useVerifyMutation()
  const [logout] = useLogoutMutation()
  const {push} = useRouter()

  useEffect(() => {
    setAllUsers(users)
  }, [])

  const initData = () => {
    const user = JSON.parse(localStorage.getItem('user') ?? 'null')
    setUser(user)
  }

  const verifyUser = async () => {
    return verify().then((resp:any) => {
      if(resp?.data?.message !== 'Token is valid') {
        setUser(null)
      }
      console.log('resp,', resp)
      setUser(resp?.data?.token)
    })
  }

  const actions = bindActionCreators(
    {
      ...authSlice.actions,
    },
    dispatch,
  )
  const { login, signup, setStatus, setAllUsers, setUser } = actions
  return {
    user,
    login,
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
    signInError,
    logout,
    verifyUser
  }
}