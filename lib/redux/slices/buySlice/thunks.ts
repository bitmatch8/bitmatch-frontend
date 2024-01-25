/* Instruments */
import { addToast, toastSlice } from "@/lib/redux"
import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk"
import { submitOderListSave } from "@/api/api"
import useUnisat from "@/hook/useUnisat"
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

type BuySubmitProps = {
  projectname: string
  type: any
  tokenname: any
  fromaddr: any
  fundaddr: any
  stage: any
  receivedAddr: any
  transmitAddr: any
  pid: any
  buyAmount: any
  price: any
  toAddress: any
  satoshis: any
  callback: any
  setStep: any
  amount: any
  txHash?: any
  reload: any
}
export const buySubmitAsync = createAppAsyncThunk(
  "buy/submit",
  async (params: BuySubmitProps, { dispatch }) => {
    const uniqueId = dispatch(addToast({
      second:0,
      icon:'warning',
      contxt:'pending...'
    })) as any
    const res_data = await params.reload()

    const availableAmount = (res_data?.tokennumber || 0) <= (res_data?.totalPersonPurchased || 0)
    if (availableAmount) {
      dispatch(
        addToast({
          contxt: "Maximum purchase limit exceeded",
        })
      )
      return
    }

    const unisat = useUnisat()
    // const buyAmount = Number(params.buyAmount)
    // if (params.type === ProjectType.NFT && buyAmount > 1) {
    //   for (let index = 1; index <= buyAmount; index++) {
    //     const post_data = {
    //       ...params,
    //       buyAmount: 1,
    //       amount: Number(params.amount) / Number(params.buyAmount),
    //       // amount:1000
    //     }
    //     post_data.setStep("", index)
    //     const txHash = await unisat.sendBitcoin(post_data.fundaddr, post_data.amount) .catch(console.log)
    //     console.log({txHash})
    //     if (txHash) {
    //       post_data.txHash = txHash
    //       send_order(post_data)
    //     }
    //     await sleep(2)
    //   }
    //   params.callback("")
    // } else {
     try{
      const txHash = await unisat.sendBitcoin(
        params.fundaddr,
        Number(params.amount)
      )
      params.txHash = txHash
      params.callback(txHash)
      send_order(params,uniqueId,dispatch)
     } catch(e){
      dispatch(toastSlice.actions.removeToast(uniqueId))
     }
    // }
    // return 1
  }
)

export const send_order = async (params: any,uniqueId:any,dispatch:any) => {
  try {
    await submitOderListSave(params)
    dispatch(addToast({
      icon:'success',
      contxt:'Success!'
    }))
  } catch (e) {
    setTimeout(() => {
      send_order(params,uniqueId,dispatch)
    }, 5000)
  }
}
