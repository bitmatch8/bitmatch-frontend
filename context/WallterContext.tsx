import { useEffect } from "react"


import {
  wallterSlice,
  useSelector,
  useDispatch,
  selectWallter,
} from '@/lib/redux'
import useWallter from "@/hook/useWallter"
import useSwr from "@/hook/useSwr"
import refreshConfig from "@/utils/config"

export default function WallterContext() {
  const dispatch = useDispatch()
  const { address,wallterType } = useSelector(selectWallter)
  const {wallter,installed} = useWallter(wallterType);
  // const balance = null
  const {result:balance} = useSwr(address,async()=>{
    const data =await wallter.getBalance()
    return {
      code:0,
      data
    }
  },{ refreshInterval: refreshConfig.balance_refreshInterval })
  const {result:network} = useSwr({address,wallter},async({wallter}:{wallter:any})=>{
    const data =await wallter.getNetwork()
    return {
      code:0,
      data
    }
  },{ refreshInterval: refreshConfig.network_refreshInterval })
  const handleAccountsChanged = (_accounts: string[]) => {
    if (_accounts.length > 0) {
      dispatch(wallterSlice.actions.setAddress({address:_accounts[0]}))
    } else {
      dispatch(wallterSlice.actions.disconnect())
    }
  }
 
  const handleNetworkChanged = (network: string) => {
    dispatch(wallterSlice.actions.setNetwork({network}))
  }
  async function checkUnisat() {
    if(!installed){
      return 
    } 
    wallter.on("accountsChanged", handleAccountsChanged)
    wallter.on("networkChanged", handleNetworkChanged)
    return () => {
      wallter.removeListener("accountsChanged", handleAccountsChanged)
      wallter.removeListener("networkChanged", handleNetworkChanged)
    }
  }
  // console.log({network})
  useEffect(()=>{
    if(network){
      dispatch(wallterSlice.actions.setNetwork({network}))
    } 
  },[network])
  useEffect(()=>{
    if(balance){
      dispatch(wallterSlice.actions.setBalance({balance}))
    }
  },[balance])
 
  useEffect(() => {
    checkUnisat().then()
  }, [wallter,installed])
  return <></>
}
