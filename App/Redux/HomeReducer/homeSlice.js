// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    isAuthenticated: false,
    isTransferKeyBoardOpen: false,
    notificationDetail:{},
  },
  reducers: {
    setNotificationDetail: (state, action) => {
      state.notificationDetail = action.payload;
    },
    setisTransferKeyBoardOpen: (state, action) => {
      state.isTransferKeyBoardOpen = action.payload;
    },
  },
});

export const { setNotificationDetail ,setisTransferKeyBoardOpen} = homeSlice.actions;
export default homeSlice.reducer;
