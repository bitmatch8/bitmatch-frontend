import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { v4 } from 'uuid';
import { buySubmitAsync } from './thunks';
import refreshConfig from '@/utils/config';

const initialState: BuySliceState = {
  status: 'idle',
  tabType:null,
  refresh_opt:0,
}

export const buySlice = createSlice({
  name: 'buy',
  initialState,
  reducers: {
    setRefresh:(state,action: PayloadAction<{num:number}>)=>{
      state.refresh_opt=action.payload.num
    },
    setTabType:(state,action: PayloadAction<{type:any}>)=>{
      state.tabType=action.payload.type
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
  tabType:any,
  refresh_opt:number,
  status: 'idle' | 'loading' | 'failed'
}