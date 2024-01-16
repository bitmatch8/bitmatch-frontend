/* Instruments */
import type { FilterTypeProps } from "@/lib/redux"
import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk"
import { fetchProjectInfoSelectInfoApi, submitOderListSave } from "@/api/api"
import useUnisat from "@/hook/useUnisat"
import { formatFixedNumber, parseFixedAmount } from "@/utils/formatBalance"
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const buySubmitAsync = createAppAsyncThunk(
  "buy/submit",
  async ({
    projectname,
      type,
      tokenname,
      fromaddr,
      fundaddr,
      stage,
      receivedAddr,
      transmitAddr,
      pid,
      buyAmount,
      price,
    toAddress,
    satoshis,
    callback,
    amount
  }: any) => {
    console.log('start',Number(satoshis),formatFixedNumber(satoshis,9,10).toString(),toAddress)
    // const amount = parseFixedAmount(satoshis,9).toNumber()
    const unisat = useUnisat()
    const txHash = await unisat.sendBitcoin(
      toAddress,
      Number(satoshis)
    );
    callback(txHash)
    const params = {
      price,
      projectname,
      type,
      tokenname,
      fromaddr,
      fundaddr,
      stage,
      receivedAddr,
      amount,
      transmitAddr,
      pid,
      buyAmount,
      txHash,
    }
    const res = await submitOderListSave(params)
   
    // console.log({txHash})
    return txHash
  }
)
