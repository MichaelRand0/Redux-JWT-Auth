import { popupSlice } from '@/redux/slices/popup.slice'
import { RootState } from '@/redux/store'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

export const usePopup = () => {
  const dispatch = useDispatch()
  const popupSelector = useSelector((state: RootState) => state.popup)
  const actions = bindActionCreators({ ...popupSlice.actions }, dispatch)
  const { popup } = popupSelector
  const { setPopup } = actions

  return {
    popup,
    setPopup,
  }
}
