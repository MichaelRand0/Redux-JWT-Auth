import { useCreateUserMutation, useGetUsersQuery, useLogoutMutation, useSignInMutation, useVerifyMutation } from '@/redux/api/auth.api'
import { authSlice } from '@/redux/slices/auth.slice'
import { RootState } from '@/redux/store'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function useAuth() {
  const dispatch = useDispatch()
  const useAuthSelector = useSelector((state: RootState) => state.auth)
  const { user } = useAuthSelector
  const {data: users = [], error: getUsersError} = useGetUsersQuery()
  const [createUser, {error: createUserError}] = useCreateUserMutation()
  const [signIn, {error: signInError}] = useSignInMutation()
  const [verify] = useVerifyMutation()
  const [logout] = useLogoutMutation()

  // const initData = () => {
  //   const user = JSON.parse(localStorage.getItem('user') ?? 'null')
  //   setUser(user)
  // }

  // const verifyUser = async () => {
  //   return verify().then((resp:any) => {
  //     if(resp?.data?.data?.message !== 'Token is valid') {
  //       setUser(null)
  //     }
  //     setUser(resp?.data?.data?.user)
  //   })
  // }

  const actions = bindActionCreators(
    {
      ...authSlice.actions,
    },
    dispatch,
  )
  const { setUser } = actions
  return {
    user,
    setUser,
    createUser,
    createUserError,
    users,
    getUsersError,
    signIn,
    signInError,
    logout,
    verify,
  }
}