import { useEffect } from "react"


import {
  wallterSlice,
  useSelector,
  useDispatch,
  selectWallter,
} from '@/lib/redux'
import useWallter from "@/hook/useWallter"

export default function WallterContext() {
  const dispatch = useDispatch()
  const { address,wallterType } = useSelector(selectWallter)
  const {wallter,isInstalled} = useWallter(wallterType);
  const handleAccountsChanged = (_accounts: string[]) => {
    if (_accounts.length > 0) {
      dispatch(wallterSlice.actions.setAddress({address:_accounts[0]}))
      getBasicInfo()
    } else {
      dispatch(wallterSlice.actions.disconnect())
    }
  }
  const getBasicInfo = async () => {
   
    console.log(wallter)
    // const [address] = await wallter.getAccounts();
    // dispatch(wallterSlice.actions.setAddress({address}))
    // const publicKey = await wallter.getPublicKey();
    // dispatch(wallterSlice.actions.setPublicKey({publicKey}))
    const balance = await wallter.getBalance();
    dispatch(wallterSlice.actions.setBalance({balance}))
    const network = await wallter.getNetwork();
    console.log({network})
    dispatch(wallterSlice.actions.setNetwork({network}))
  }
  const handleNetworkChanged = (network: string) => {
    dispatch(wallterSlice.actions.setNetwork({network}))
    getBasicInfo()
  }
  async function checkUnisat() {
    // let {wallter,isInstalled} = useWallter()
    const unisatInstalled = await isInstalled()
    dispatch(wallterSlice.actions.setUnisatInstalled({unisatInstalled}))
    if(!unisatInstalled){
      return 
    } 
    // wallter.getAccounts().then(([address]: string[]) => {
    //   dispatch(wallterSlice.actions.setAddress({address}))
    // })
    // wallter.getNetwork().then((network:string)=>{
    //   dispatch(wallterSlice.actions.setNetwork({network}))
    // })
    wallter.on("accountsChanged", handleAccountsChanged)
    wallter.on("networkChanged", handleNetworkChanged)
    return () => {
      wallter.removeListener("accountsChanged", handleAccountsChanged)
      wallter.removeListener("networkChanged", handleNetworkChanged)
    }
  }

  useEffect(()=>{
    if(address){
      getBasicInfo() 
    }
  },[address,wallter])
 
  useEffect(() => {
    checkUnisat().then()
  }, [wallter])
  return <></>
}
