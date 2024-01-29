import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
// import { fetchDetailThunk } from "./thunks"

const initialState: DetailSliceState = {
  status: "idle",
  detailLists: {},
  infoLists: {}
}

export const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    setDetail: (state, action: PayloadAction<{ detail: DetailSliceType,id:number }>) => {
      const detail = action.payload.detail
      const id = action.payload.id
       state.detailLists[id]=detail
    },
    setInfo: (state, action: PayloadAction<{ info: InfoSliceType,type_key:string }>) => {
      const info = action.payload.info
      const type_key = action.payload.type_key
      // const type_key = `${info.pid}_${info.type}`
      state.infoLists[type_key]=info
      // if(state.infoLists[type_key]){
      //   state.infoLists[type_key]=info
      // }else{
      //   state.infoLists[type_key]=info
      // }
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchDetailThunk.pending, (state) => {
  //       state.status = "loading"
  //     })
  //     .addCase(fetchDetailThunk.fulfilled, (state, action) => {
  //       console.log({ action: action.payload })
  //       state.status = "idle"
  //     })
  // },
})

export type DetailSliceType = {
  "id": number
  "projecttype": string
  "projectname": string
  "projecttokenname": string
  "projectdescription": string
  "projectlogo":string
  "logoSuffix": null
  "projecthead": string
  "headSuffix": string
  "projectnft": string
  "nftSuffix": string 
  "website": string
  "discord": string
  "twitter": string
  "gitbook": string
  "telegram": string
  "github": string
  "status": number
  "createdAt": string
  "updateAt": string
  "whitelistCount": string
  "whitelistStage": string
  "publicCount": string
  "publicStage": string
  "wid": number 
  "pubid": number
  "pdid": number
  "singlePersonPurchased":number 
}
export type InfoSliceType={
  "id": number,
  "projectnetwork": string,
  "projectcurrency": string,
  "starttime": string,
  "enttime": string,
  "hposa": string,
  "popp": string,
  "tokennumber": number,
  "targetnumber": string,
  "mposa": number,
  "projectmoneyaddress": string,
  "pid": number,
  "type": number,
  "singlePersonPurchased": number,
  "totalPersonPurchased": number,
  "price": string
}
export interface DetailSliceState {
  detailLists: {
    [key: string]:DetailSliceType | 'no data'
  }
  infoLists:{
    [key: string]:InfoSliceType | 'no data'
  }
  status: "idle" | "loading" | "failed"
}
