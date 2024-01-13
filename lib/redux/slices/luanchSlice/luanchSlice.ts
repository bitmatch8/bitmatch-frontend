import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { v4 } from 'uuid';
import { fetchDashboardAsync, fetchProjectInfoSelectInfoAsync } from './thunks';

export type ProjectItemType={
  id:number,
  projecttype:string
  projectname:string
  projecttokenname:string
  projectdescription:string
  projectlogo?:string
  logoSuffix?:string
  projecthead?:string
  headSuffix?:string
  projectnft?:string
  nftSuffix?:string
  website?:string
  discord?:string
  twitter?:string
  gitbook?:string
  telegram?:string
  github?:string
  status?:number
  createdAt?:string
  updateAt?:string
  whitelistCount?:string
  whitelistStage?:string
  publicCount?:string
  publicStage?:string
  wid?:string
  pubid?:string
  pdid?:string
  singlePersonPurchased?:string
}
const initialState: LuanchSliceState = {
  tabType:'ALL',
  dashboard: {
    "projectCount": null,
    "raisedCount": null,
    "usersCount": null
  },
  dashboard_status: 'idle',
  lists: null,
  lists_status: 'idle',
  total: 0,
  pageNum: 0,
  pageSize: 10
}

export const luanchSlice = createSlice({
  name: 'luanch',
  initialState,
  reducers: {
    setTabs: (state,action: PayloadAction<FilterTypeProps>) => {
      state.tabType = action.payload
    },
    // removeToast:(state,action:PayloadAction<string>)=>{
    //     const index = state.lists.findIndex(itm=>itm.uniqueId === action.payload)
    //     state.lists.splice(index,1)
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardAsync.pending, (state) => {
        state.dashboard_status = 'loading'
      })
      .addCase(fetchDashboardAsync.fulfilled, (state, action) => {
        state.dashboard_status = 'idle'
        state.dashboard = action.payload
      })
      .addCase(fetchProjectInfoSelectInfoAsync.pending, (state) => {
        state.lists_status = 'loading'
      })
      .addCase(fetchProjectInfoSelectInfoAsync.fulfilled, (state, action) => {
        state.lists_status = 'idle'
        state.lists = action.payload.list
        state.total = action.payload.total
        state.pageNum = action.payload.pageNum 
      })
  },
})
export type FilterTypeProps = "ALL" | "FT" | "NFT"
export interface LuanchSliceState {
  tabType:FilterTypeProps
  dashboard_status: 'idle' | 'loading' | 'failed'
  dashboard:{
    "projectCount": number | null,
    "raisedCount": number | null,
    "usersCount":number | null,
  }
  total:number
  pageNum:number
  pageSize:number
  lists:ProjectItemType[] | null
  lists_status: 'idle' | 'loading' | 'failed'
}
