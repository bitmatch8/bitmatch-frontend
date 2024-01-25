/* Instruments */
import { toastSlice, wallterSlice,buySlice } from './slices'

export const reducer = {
  wallter: wallterSlice.reducer,
  toast:toastSlice.reducer,
  buy:buySlice.reducer
}
