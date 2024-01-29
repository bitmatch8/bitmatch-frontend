/* Instruments */
import { toastSlice, wallterSlice,buySlice,detailSlice } from './slices'

export const reducer = {
  wallter: wallterSlice.reducer,
  toast:toastSlice.reducer,
  detail:detailSlice.reducer,
  buy:buySlice.reducer
}
