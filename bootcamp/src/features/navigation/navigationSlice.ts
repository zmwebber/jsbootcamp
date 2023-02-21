import { createSlice, createAsyncThunk, Slice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';

export interface NavigationState {  
  currentPath: string,
  previousPath: string,
  history: [string]  
  }

const initialState = { 
  currentPath: "/",
  previousPath: "",
  history: ["/"]  
}

export const navigationSlice : Slice= createSlice({
    name: 'navigation',
    initialState,
    reducers: {
      reset: (state) => {
        state = initialState
      },
      push: (state, action: PayloadAction<string>) => {
        state.previousPath = state.currentPath;
        state.currentPath = action.payload;        
        state.history.push(action.payload)
        }
    },
    // extraReducers: (builder) => {
    //   builder
    //     // .addCase(navigate.pending, (state) => {
    //     //   state.isLoading = true
    //     // })
        
    // },
  })
  
  export const { reset, push } = navigationSlice.actions;
  
  export const navInfo = (
          (state: RootState) => state.nav
      );
  
  export default navigationSlice.reducer
  