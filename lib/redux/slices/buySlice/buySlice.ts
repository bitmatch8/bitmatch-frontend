import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { v4 } from 'uuid';
import { buySubmitAsync } from './thunks';
import refreshConfig from '@/utils/config';

const initialState: BuySliceState = {
  status: 'idle',
  loading_map:new Map(),
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
    },
    removeLoading:(state,action: PayloadAction<{id:any}>)=>{
      state.loading_map.delete(action.payload.id)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(buySubmitAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(buySubmitAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.loading_map.set(action.payload?.pid,Date.now() + refreshConfig.submit_order_refreshInterval)
      }).addCase(buySubmitAsync.rejected, (state, action) => {
        state.status = 'idle'
      })
  },
})

export interface BuySliceState {
  tabType:any,
  refresh_opt:number,
  loading_map:Map<any, any>,
  status: 'idle' | 'loading' | 'failed'
}