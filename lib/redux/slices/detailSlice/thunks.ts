/* Instruments */
import useWallter from "@/hook/useWallter"
import { selectWallter, type ReduxThunkAction } from "@/lib/redux"
import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk"

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchDetailThunk = createAppAsyncThunk(
  "wallter/connectUnisat",
  async (_,{getState}) => {
    const {wallter} = useWallter()
    const {network} = selectWallter(getState())
    if (network === process.env.NEXT_PUBLIC_NETWORK) {
      const [address] = await wallter.requestAccounts()
      return {address,network}
    } else {
      const network = await wallter.switchNetwork(process.env.NEXT_PUBLIC_NETWORK)
      if(network === process.env.NEXT_PUBLIC_NETWORK){
        const [address] = await wallter.requestAccounts()
        return {address,network}
      }
    }
    
    return {address:'',network}

    // handleAccountsChanged(result);
    // const [address] = await unisat.getAccounts()
    // console.log({address},await unisat.getAccounts().then(console.log))
    // return {address}
    // The value we return becomes the `fulfilled` action payload
  }
)
