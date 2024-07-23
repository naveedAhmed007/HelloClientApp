// src/features/auth/authSlice.js
import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    userLoginNumber: 0,
    user: null,
    FromOtpScreen: false,
  },
  reducers: {
    setLogin: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUserLoginNumber: (state, action) => {
      state.userLoginNumber = action.payload;
    },
    setFromOtpScreen: (state, action) => {
      state.FromOtpScreen = action.payload;
    },
  },
});

export const {setLogin,setUserLoginNumber,setFromOtpScreen} = authSlice.actions;
export default authSlice.reducer;
