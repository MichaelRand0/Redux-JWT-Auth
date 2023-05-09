import { authSlice } from '@/redux/slices/auth.slice'
import { RootState } from '@/redux/store'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

export function useAuth() {
  const dispatch = useDispatch()
  const useAuthSelector = useSelector((state: RootState) => state.auth)
  const { user, error } = useAuthSelector

  const actions = bindActionCreators(
    {
      ...authSlice.actions,
    },
    dispatch,
  )
  const { login, logout } = actions
  return {
    user,
    login,
    logout,
    error,
  }
}
