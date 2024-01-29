import { fetchProjectInfoApi, fetchWhtielistInfoApi } from "@/api/api"
import { selectBuy, selectWallter } from "@/lib/redux"
import { foramtDateInfo } from "@/utils"
import refreshConfig from "@/utils/config"
import { BuyState, DetailInfoType } from "@/utils/types"
import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import useSwr from "./useSwr"

const useDetail = (id: any) => {
  const { address } = useSelector(selectWallter)
  
  const {result:detail} = useSwr({
      id,
      address: address ? address : undefined,
    },id ? fetchProjectInfoApi : null,{ refreshInterval: refreshConfig.detail_refreshInterval }
  )

  const {result:publicInfo,mutate:publicMutate} = useSwr({
      id: detail?.pubid,
      address,
    },
    detail?.pubid ? fetchWhtielistInfoApi : null,
    { refreshInterval: refreshConfig.publicInfo_refreshInterval }
  )

  const {result:whiteInfo,mutate:whiteMutate} = useSwr({
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
    // if(code === 0){
    //   whiteMutate(data)
    // }
    return data 
  }
  const readPublic = async () => {
    const {data,code}=await fetchWhtielistInfoApi({
      id: detail?.pubid,
      address,
    })
    // if(code === 0){
    //   publicMutate(data)
    // }
    return whiteInfo
  }

  // useEffect(()=>{
  //   console.log({detail})
  // },[detail])
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
