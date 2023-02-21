import { LensTwoTone } from '@mui/icons-material';
import { useRadioGroup } from '@mui/material';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService, { addUser, login, logout } from '../../data/UserApi'
import { RootState } from '../../app/store';
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
  }

const initialState = { 
  profile : user,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.profile = action.payload
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = "Failed to save user!"
        state.profile = undefined
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.profile = action.payload? action.payload : undefined
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = "Failed to login!"
        state.profile = undefined
      })
      .addCase(logout.fulfilled, (state) => {
        state.profile = undefined
      })
  },
})

export const { reset } = authSlice.actions;

export const selectUser = (
		(state: RootState) => state.user.profile
	);

export default authSlice.reducer
