import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Popup } from "../models"

interface PopupState {
  popup: Popup
}

const initialState: PopupState = {
  popup: null
}

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    setPopup(state, action:PayloadAction<Popup>) {
      state.popup = action.payload
    }
  }
})