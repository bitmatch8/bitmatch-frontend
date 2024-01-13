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

export default function WallterContext() {
  const dispatch = useDispatch()
  const handleAccountsChanged = (_accounts: string[]) => {

    if (_accounts.length > 0) {
      dispatch(wallterSlice.actions.setAddress({address:_accounts[0]}))
      getBasicInfo()
    } else {
      dispatch(wallterSlice.actions.disconnect())
    }
  }
  const getBasicInfo = async () => {
    const unisat = (window as any).unisat;
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
    let unisat = (window as any).unisat
   
    for (let i = 1; i < 10 && !unisat; i += 1) {
      await new Promise((resolve) => setTimeout(resolve, 100 * i))
      unisat = (window as any).unisat
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
