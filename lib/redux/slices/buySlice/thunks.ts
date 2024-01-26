import { addToast, toastSlice } from "@/lib/redux"
import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk"
import { submitOderListSave } from "@/api/api"
import useUnisat from "@/hook/useUnisat"

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
  amount: any
  txHash?: any
  reload: any
}

export const buySubmitAsync = createAppAsyncThunk(
  "buy/submit",
  async (params: BuySubmitProps, { dispatch }) => {
    
    const res_data = await params.reload()
    console.log({res_data})

    // const availableAmount = (Number(res_data?.tokennumber) || 0) <= (Number(res_data?.totalPersonPurchased) || 0)
    // console.log(res_data)

    const unisat = useUnisat()
    try {
      const txHash = await unisat.sendBitcoin(
        params.fundaddr,
        Number(params.amount)
      )
      params.txHash = txHash
      params.callback(txHash)
      send_order(params,dispatch)
    } catch (e) {
      // dispatch(toastSlice.actions.removeToast(uniqueId))
    }
  }
)

export const send_order = async (params: any,dispatch:any) => {
  try {
    await submitOderListSave(params)
    dispatch(
      addToast({
        // second: 0,
        icon: "warning",
        contxt: "Pending...",
      })
    )
  } catch (e) {
    setTimeout(() => {
      send_order(params, dispatch)
    }, 5000)
  }
}
