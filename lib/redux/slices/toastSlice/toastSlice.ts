import { TipIconType } from '@/components/TipIcon/TipIcon';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { v4 } from 'uuid';

export type ToastItem={
  uniqueId?:string,
  startTime?:number,
  endTime?:number,
  second?:number,
  title?:any,
  contxt:any,
  href?:any
  icon?:TipIconType
  noTime?:boolean
}
const initialState: ToastSliceState = {
  lists:[]
}

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: (state,action: PayloadAction<ToastItem>) => {
      const second = action.payload.second || 1000
      state.lists[0] = {startTime:Date.now(),endTime:Date.now() + second,...action.payload}
    },
    removeToast:(state,action:PayloadAction<string>)=>{
        const index = state.lists.findIndex(itm=>itm.uniqueId === action.payload)
        state.lists.splice(index,1)
    }
  }
})

export interface ToastSliceState {
  lists:ToastItem[]
}
