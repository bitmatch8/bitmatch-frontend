/* Instruments */
import { toastSlice, wallterSlice } from './slices'
import { luanchSlice } from './slices/luanchSlice'

export const reducer = {
  wallter: wallterSlice.reducer,
  toast:toastSlice.reducer,
  luanch:luanchSlice.reducer
}
