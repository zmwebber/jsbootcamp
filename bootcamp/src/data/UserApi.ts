import {
    configureStore,
    createAsyncThunk,
    createSlice,
  } from '@reduxjs/toolkit';
  import API from "./apiConfig";
  import { Profile, User } from "../models/UserProfileModel";
  import { AxiosError } from "axios";
  const API_URL = '/users/'
  
  export const login = createAsyncThunk(
      "users/login", 
      async (user: Profile) => {
      try {
          let response = await API.post(API_URL + 'login', user)
          if (response.data) {
              localStorage.setItem('user', JSON.stringify(response.data))
            }        
          return user
      } catch (err) {
        // let error: AxiosError = err;  
        //   const message =
        //     (err.response && err.response.data && err.response.data.message) ||
        //     err.message ||
        //     err.toString()
        //   return BaseThunk.rejectWithValue(message)
        console.log(err);
        }
  })
  
  export const addUser = createAsyncThunk(
      "users/add", 
      async (user: User) => {
      try {
          const response = await API.post(API_URL + 'add', user)
          if (response.data) {
              localStorage.setItem('user', JSON.stringify(response.data))
            }        
          return response.data
      } catch (err) {
        // let error: AxiosError = err;  
        //   const message =
        //     (err.response && err.response.data && err.response.data.message) ||
        //     err.message ||
        //     err.toString()
        //   return BaseThunk.rejectWithValue(message)
        console.log(err);
        }
  })
  
  
  // Logout user
  export const logout = createAsyncThunk(
    "users/logout", 
    async (user: Profile) => {
    try {
      localStorage.removeItem('user')
      return null;
    } catch (err) {
      // let error: AxiosError = err;  
      //   const message =
      //     (err.response && err.response.data && err.response.data.message) ||
      //     err.message ||
      //     err.toString()
      //   return BaseThunk.rejectWithValue(message)
      console.log(err);
      }
  })
    
  
  
  const userService = {
    addUser,
    logout,
    login,
  }
  
  export default userService
  
  