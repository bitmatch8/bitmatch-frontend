/* Instruments */
import type { FilterTypeProps } from "@/lib/redux"
import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk"
import { fetchProjectInfoSelectInfoApi, submitOderListSave } from "@/api/api"
import useUnisat from "@/hook/useUnisat"
import { formatFixedNumber, parseFixedAmount } from "@/utils/formatBalance"
import { BuyState, ProjectType } from "@/utils/types"
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

type BuySubmitProps={
  projectname:string,
  type:any,
  tokenname:any,
  fromaddr:any,
  fundaddr:any,
  stage:any,
  receivedAddr:any,
  transmitAddr:any,
  pid:any,
  buyAmount:any,
  price:any,
  toAddress:any,
  satoshis:any,
  callback:any,
  setStep:any,
  amount:any,
  txHash?:any
}
export const buySubmitAsync = createAppAsyncThunk(
  "buy/submit",
  async (params: BuySubmitProps) => {
    const unisat = useUnisat()
    const buyAmount = Number(params.buyAmount)
    if(params.type === ProjectType.NFT &&  buyAmount> 1){
      for (let index = 1; index <= buyAmount; index++) {
        const post_data = {
          ...params,buyAmount:1,
          amount:Number(params.amount)/Number(params.buyAmount),
          // amount:1000
        }
        post_data.setStep('',index)
        const txHash = await unisat.sendBitcoin(post_data.fundaddr, post_data.amount).catch(console.log)
        console.log({txHash})
        if(txHash){
          post_data.txHash =txHash 
          await submitOderListSave(post_data)
        }
      }
      params.callback('')
    }else{
      const txHash = await unisat.sendBitcoin(params.fundaddr, params.amount)
      params.txHash=txHash
      params.callback(txHash)
      await submitOderListSave(params)
    }
    return 1
  }
)
