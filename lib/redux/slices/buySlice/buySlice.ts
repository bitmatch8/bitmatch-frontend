import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { v4 } from 'uuid';
import { buySubmitAsync } from './thunks';

const initialState: BuySliceState = {
  status: 'idle',
  refresh_opt:0,
}

export const buySlice = createSlice({
  name: 'buy',
  initialState,
  reducers: {
    setRefresh:(state,action: PayloadAction<{num:number}>)=>{
      state.refresh_opt=action.payload.num
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(buySubmitAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(buySubmitAsync.fulfilled, (state, action) => {
        state.status = 'idle'
      }).addCase(buySubmitAsync.rejected, (state, action) => {
        state.status = 'idle'
      })
  },
})

export interface BuySliceState {
  refresh_opt:number,
  status: 'idle' | 'loading' | 'failed'
}