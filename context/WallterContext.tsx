import { useEffect, useMemo, useState } from "react"

import styled from "@emotion/styled"

import {
  wallterSlice,
  useSelector,
  useDispatch,
  selectWallter,
  addToast,
  connectUnisat,
  selectLuanch,
  toastSlice,
  FilterTypeProps,
  luanchSlice,
  fetchProjectInfoSelectInfoAsync,
} from '@/lib/redux'
import useUnisat from "@/hook/useUnisat"
import { getFullDisplayBalance } from "@/utils/formatBalance"

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

    unisat.on("accountsChanged", handleAccountsChanged)
    unisat.on("networkChanged", handleNetworkChanged)

    return () => {
      unisat.removeListener("accountsChanged", handleAccountsChanged)
      unisat.removeListener("networkChanged", handleNetworkChanged)
    }
  }

  const {
    pageSize,
    tabType,
  } = useSelector(selectLuanch)
  const onClickTab = (tabType: FilterTypeProps) => {
    dispatch(luanchSlice.actions.setTabs(tabType))
    dispatch(fetchProjectInfoSelectInfoAsync({ pageNum: 1, pageSize, tabType }))
  }

  useEffect(()=>{
    if(address){
      getBasicInfo() 
    }
  },[address])
  const getLists = (pageNum: number = 1) => {
    dispatch(fetchProjectInfoSelectInfoAsync({ pageNum:1, pageSize:100, tabType }))
  }
  useEffect(() => {
    getLists()
    onClickTab('ALL')
  }, [])
  useEffect(() => {
    checkUnisat().then()
  }, [])
  return <></>
}
