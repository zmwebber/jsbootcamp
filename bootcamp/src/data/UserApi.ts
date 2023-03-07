import {createAsyncThunk} from '@reduxjs/toolkit';
  import API from "./apiConfig";
  import { Profile, User } from "../models/UserProfileModel";
  import { AxiosError } from "axios";
  const API_URL = '/users/'
  
  export const login = createAsyncThunk(
    "users/login",
    async (user: Profile, BaseThunk: any) => {
      try {
        let response = await API.post(API_URL + 'login', user)
        if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
      } catch (err: any) {
        let error: AxiosError = err;
        const message =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString()
        console.log(err);
        return BaseThunk.rejectWithValue(message)
      }
    })
  
  export const updateUser = createAsyncThunk(
    "users/update",
    async (user: Profile, BaseThunk: any) => {
      try {
        const response = await API.post(API_URL + 'update/', user)
        if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data.user))
        }
        return response.data
      } catch (err: any) {
        let error: AxiosError = err;
        const message =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString()
        console.log(err);
        return BaseThunk.rejectWithValue(message)
      }
    })

    export const addUser = createAsyncThunk(
      "users/add",
      async (user: Profile, BaseThunk: any) => {
        try {
          const response = await API.post(API_URL + 'add', user)
          if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data))
          }
          return response.data
        } catch (err: any) {
          let error: AxiosError = err;
          const message =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString()
          console.log(err);
          return BaseThunk.rejectWithValue(message)
        }
      })
  
  const userService = {
    addUser,
    login,
    updateUser,
  }
  
  export default userService
  
  