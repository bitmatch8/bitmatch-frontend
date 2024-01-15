/* Instruments */
import type { FilterTypeProps } from "@/lib/redux"
import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk"
import { fetchProjectInfoSelectInfoApi } from "@/api/api"
import useUnisat from "@/hook/useUnisat"
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const buySubmitAsync = createAppAsyncThunk(
  "buy/submit",
  async ({
    toAddress,
    satoshis,
  }: {
    toAddress: string
    satoshis: number
  }) => {
    const unisat = useUnisat()

    const txid = await unisat.sendBitcoin(
      toAddress,
      satoshis
    );
    return txid
  }
)
