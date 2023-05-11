import { authSlice } from '@/redux/slices/auth.slice'
import { RootState } from '@/redux/store'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

export function useAuth() {
  const dispatch = useDispatch()
  const useAuthSelector = useSelector((state: RootState) => state.auth)
  const { user, status } = useAuthSelector

  const initData = () => {
    const user = JSON.parse(localStorage.getItem('user') ?? 'null')
    const allUsers = JSON.parse(localStorage.getItem('allUsers') ?? '[]')
    setAllUsers(allUsers)
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
    initData
  }
}