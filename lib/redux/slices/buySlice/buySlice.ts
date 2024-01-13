import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { v4 } from 'uuid';
import { buySubmitAsync } from './thunks';

const initialState: BuySliceState = {
  status: 'idle'
}

export const buySlice = createSlice({
  name: 'buy',
  initialState,
  reducers: {
    // removeToast:(state,action:PayloadAction<string>)=>{
    //     const index = state.lists.findIndex(itm=>itm.uniqueId === action.payload)
    //     state.lists.splice(index,1)
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(buySubmitAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(buySubmitAsync.fulfilled, (state, action) => {
        state.status = 'idle'
      })
  },
})

export interface BuySliceState {
  status: 'idle' | 'loading' | 'failed'
}