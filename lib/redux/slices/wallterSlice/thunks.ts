/* Instruments */
import type { ReduxThunkAction } from '@/lib/redux'
import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk'

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const connectUnisat = createAppAsyncThunk(
  'wallter/connectUnisat',
  async () => {
    const unisat = (window as any)?.unisat
    const [address] = await unisat.getAccounts();
    return {address} 
    // The value we return becomes the `fulfilled` action payload
  }
)

