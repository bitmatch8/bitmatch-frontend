/* Instruments */
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { toastSlice, wallterSlice,buySlice,detailSlice } from './slices'

export const reducer = combineReducers({
  wallter: wallterSlice.reducer,
  toast:toastSlice.reducer,
  detail:detailSlice.reducer,
  buy:buySlice.reducer
})
