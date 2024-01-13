/* Instruments */
import { toastSlice, type ReduxThunkAction, ToastItem } from "@/lib/redux"
import { v4 } from "uuid"

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const addToast =
  (toast: ToastItem): ReduxThunkAction =>
  (dispatch, getState) => {
    const second = toast.second || 2000
    const uniqueId = v4()
    dispatch(
      toastSlice.actions.addToast({
        uniqueId: uniqueId,
        second,
        ...toast,
      })
    )
    setTimeout(() => {
      dispatch(toastSlice.actions.removeToast(uniqueId))
    }, second)
  }
