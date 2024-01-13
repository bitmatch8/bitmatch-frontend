/* Instruments */
import { toastSlice, wallterSlice,luanchSlice,buySlice } from './slices'

export const reducer = {
  wallter: wallterSlice.reducer,
  toast:toastSlice.reducer,
  luanch:luanchSlice.reducer,
  buy:buySlice.reducer
}
