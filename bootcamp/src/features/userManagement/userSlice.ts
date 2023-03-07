import { createSlice, Slice, PayloadAction } from '@reduxjs/toolkit'
import { addUser, login, updateUser } from '../../data/UserApi'
import { RootState, AppThunk } from '../../app/store';
import {Profile} from '../../models/UserProfileModel'
// Get user from localStorage

let localUser = localStorage.getItem('user');
let user = null;
if (localUser !== '' && localUser !== null)
{
  user = JSON.parse(localUser) as Profile;
}
else{
  user = undefined;
}

export interface UserState {  
  profile : Profile | null | undefined,
  isError: boolean,
  isSuccess: boolean,
  isLoading: boolean,
  message: string,
  loginSuccess: boolean
  }

const initialState : UserState= { 
  profile : user,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  loginSuccess: false
}



export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
      state.loginSuccess = false
    },
    logout: (state) => {      
      state.profile = undefined
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = 'Successfully Logged Out'
      state.loginSuccess = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.isLoading = true
        state.loginSuccess = false
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.profile = action.payload
        state.loginSuccess = false
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = "Failed to save user!"
        state.profile = undefined
        state.loginSuccess = false
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
        state.loginSuccess = false
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.profile = action.payload.user
        state.loginSuccess = false
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = "Failed to save user!"
        state.profile = undefined
        state.loginSuccess = false
      })
      .addCase(login.pending, (state) => {
        state.loginSuccess = false
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.profile = action.payload ? action.payload : undefined
        state.loginSuccess = true
        state.isLoading = false
        state.isError = false
        state.message = "Successfully logged in."
        state.isSuccess = true
      })
      .addCase(login.rejected, (state, action) => {
        state.loginSuccess = false
        state.isLoading = false
        state.isError = true
        state.message = "Invalid Login Attepmt!"
        state.isSuccess = false
        state.profile = undefined
      })      
  },
})

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer
