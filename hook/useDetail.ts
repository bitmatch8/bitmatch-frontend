import { fetchProjectInfoApi, fetchWhtielistInfoApi } from "@/api/api"
import { detailSlice, selectBuy, selectDetail, selectWallter, useDispatch } from "@/lib/redux"
import { foramtDateInfo } from "@/utils"
import refreshConfig from "@/utils/config"
import { BuyState, DetailInfoType } from "@/utils/types"
import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import useSwr from "./useSwr"

const useDetail = (id: any) => {
  const { address } = useSelector(selectWallter)
  const {detailLists,infoLists} = useSelector(selectDetail)
  const detail = useMemo(()=>{
    return detailLists[id] || null
  },[id,detailLists])
  
  const {result:res_detail} = useSwr({
      id,
      address: address ? address : undefined,
    },id ? fetchProjectInfoApi : null,{ refreshInterval: refreshConfig.detail_refreshInterval }
  )

  const pub_info_key=useMemo(()=>{
    return detail === null || !detail?.pubid ? null  :`${detail.id}_${detail?.pubid}`
  },[detail?.pubid])
  const whi_info_key=useMemo(()=>{
    return detail === null || !detail?.wid ? null:`${detail.id}_${detail?.wid}` 
  },[detail?.wid])
  const publicInfo=useMemo(()=>{
    return pub_info_key === null || detail === null || !infoLists[pub_info_key]  ?  null : infoLists[pub_info_key]
  },[id,infoLists])
  const whiteInfo=useMemo(()=>{
    return whi_info_key === null || detail === null || !infoLists[whi_info_key]  ?  null : infoLists[whi_info_key]
  },[id,infoLists])
  const {result:res_publicInfo,mutate:publicMutate} = useSwr({
      id: detail?.pubid,
      address,
    },
    detail?.pubid ? fetchWhtielistInfoApi : null,
    { refreshInterval: refreshConfig.publicInfo_refreshInterval }
  )

  const {result:res_whiteInfo,mutate:whiteMutate} = useSwr({
      id: detail?.wid,
      address,
    },detail?.wid ? fetchWhtielistInfoApi : null,
    { refreshInterval: refreshConfig.whiteInfo_refreshInterval }
  )

  const whiteType = useMemo(() => {
    return foramtDateInfo(whiteInfo, DetailInfoType.white)
  }, [whiteInfo])

  const publicType = useMemo(() => {
    return foramtDateInfo(publicInfo, DetailInfoType.public)
  }, [publicInfo])

  const buyType = useMemo(() => {
    if (publicType === null && whiteType === null) return null
    if (whiteType && whiteType !== BuyState.White_Ended) {
      return whiteType
    } else if (!publicType) {
      return whiteType
    } else {
      return publicType
    }
  }, [whiteType, publicType])

  const ProjectTabList = useMemo(() => {
    if (!whiteInfo && !publicInfo) {
      return null
    }
    const arr = []
    if (whiteInfo) {
      arr.push({ id: DetailInfoType.white, title: "Whitelist Stage" })
    }
    if (publicInfo) {
      arr.push({ id: DetailInfoType.public, title: "Public Stage" })
    }
    arr.push({ id: DetailInfoType.info, title: "Project Information" })
    return arr
  }, [whiteInfo, publicInfo])

  const tabId = useMemo(() => {
    if (whiteType === BuyState.White_Ended && publicType) {
      if (publicType === BuyState.Public_Ended) {
        return DetailInfoType.white
      }
      return DetailInfoType.public
    } else if (whiteType) {
      return DetailInfoType.white
    } else if (publicType) {
      return DetailInfoType.public
    }
    return null
  }, [publicType, whiteType])

  const load = useMemo(() => {
    return !detail || (detail?.pubid && !publicInfo) || (detail?.wid && !whiteInfo)
    
  }, [detail, tabId, publicInfo, whiteInfo])

  const readWhtie = async () => {
    const {code,data} = await fetchWhtielistInfoApi({
      id: detail?.wid,
      address,
    })
    if(code === 0){
      dispatch(detailSlice.actions.setInfo({info:data,type_key:whi_info_key})) 
      // whiteMutate(data)
    }
    return data 
  }
  const readPublic = async () => {
    const {data,code}=await fetchWhtielistInfoApi({
      id: detail?.pubid,
      address,
    })
    if(code === 0){
      dispatch(detailSlice.actions.setInfo({info:data,type_key:pub_info_key})) 
      // publicMutate(data)
    }
    return whiteInfo
  }

  
  const dispatch =useDispatch()
  
  useEffect(()=>{
    dispatch(detailSlice.actions.setInfo({info:res_whiteInfo,type_key:whi_info_key})) 
  },[res_whiteInfo,whi_info_key])
  useEffect(()=>{
    dispatch(detailSlice.actions.setInfo({info:res_publicInfo,type_key:pub_info_key})) 
  },[res_publicInfo,pub_info_key])
  useEffect(()=>{
    dispatch(detailSlice.actions.setDetail({detail:res_detail,id:id}))
  },[res_detail,id])
  return {
    load,
    address,
    detail,
    buyType,
    tabId,
    ProjectTabList,
    whiteInfo,
    publicInfo,
    readWhtie,
    readPublic,
  }
}

export default useDetail
