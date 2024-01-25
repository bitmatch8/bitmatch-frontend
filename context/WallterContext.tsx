import { useEffect } from "react"


import {
  wallterSlice,
  useSelector,
  useDispatch,
  selectWallter,
} from '@/lib/redux'
import useUnisat from "@/hook/useUnisat"

export default function WallterContext() {
  const dispatch = useDispatch()
  const { address } = useSelector(selectWallter)
  const handleAccountsChanged = (_accounts: string[]) => {

    if (_accounts.length > 0) {
      dispatch(wallterSlice.actions.setAddress({address:_accounts[0]}))
      getBasicInfo()
    } else {
      dispatch(wallterSlice.actions.disconnect())
    }
  }
  const getBasicInfo = async () => {
    const unisat = useUnisat();
    const [address] = await unisat.getAccounts();
    dispatch(wallterSlice.actions.setAddress({address}))
    const publicKey = await unisat.getPublicKey();
    dispatch(wallterSlice.actions.setPublicKey({publicKey}))
    const balance = await unisat.getBalance();
    dispatch(wallterSlice.actions.setBalance({balance}))
    const network = await unisat.getNetwork();
    dispatch(wallterSlice.actions.setNetwork({network}))
  };
  const handleNetworkChanged = (network: string) => {
    dispatch(wallterSlice.actions.setNetwork({network}))
    getBasicInfo()
  };
  async function checkUnisat() {
    let unisat = useUnisat()
   
    for (let i = 1; i < 10 && !unisat; i += 1) {
      await new Promise((resolve) => setTimeout(resolve, 100 * i))
      unisat = useUnisat()
    }
    const unisatInstalled = !!unisat
    dispatch(wallterSlice.actions.setUnisatInstalled({unisatInstalled}))
    if(!unisatInstalled){
      return 
    } 
    unisat.getAccounts().then(([address]: string[]) => {
      dispatch(wallterSlice.actions.setAddress({address}))
    })
    unisat.getNetwork().then((network:string)=>{
      dispatch(wallterSlice.actions.setNetwork({network}))
    })

    unisat.on("accountsChanged", handleAccountsChanged)
    unisat.on("networkChanged", handleNetworkChanged)

    return () => {
      unisat.removeListener("accountsChanged", handleAccountsChanged)
      unisat.removeListener("networkChanged", handleNetworkChanged)
    }
  }


  useEffect(()=>{
    if(address){
      getBasicInfo() 
    }
  },[address])
 
  useEffect(() => {
    checkUnisat().then()
  }, [])
  return <></>
}
