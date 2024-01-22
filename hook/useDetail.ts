import { fetchProjectInfoApi, fetchWhtielistInfoApi } from "@/api/api"
import { selectWallter } from "@/lib/redux"
import { foramtDateInfo } from "@/utils"
import { BuyState, DetailInfoType } from "@/utils/types"
import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"

const useDetail = (id: any) => {
  const [detail, setDetail] = useState<any>(null)
  const [publicInfo, setPublicInfo] = useState(null)
  const [whiteInfo, setWhiteInfo] = useState(null)
  const { address } = useSelector(selectWallter)
  const [load,setLoad]=useState(true)
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
  const readPublic = async () => {
    if (detail?.pubid) {
      const public_res = await fetchWhtielistInfoApi({
        id: detail?.pubid,
        address,
      })

      if (public_res?.code === 0) {
        
        setPublicInfo(public_res.data)
      }
    }
  }
  const readWhtie = async () => {
    if (detail?.wid) {
      const white_res = await fetchWhtielistInfoApi({
        id: detail?.wid,
        address,
      })
      if (white_res?.code === 0) {
        setWhiteInfo(white_res.data)
      }
    }
  }

  const initPage = async () => {
    const { data, code } = await fetchProjectInfoApi({
      id,
      address: address ? address : undefined,
    })
    if (code === 0) {
      setDetail(data)
    }
  }
  const reloadPage=async()=>{
    if (detail) {
      await readWhtie()
      await readPublic()
      setLoad(false)
    }
  }
  useEffect(() => {
    reloadPage() 
  }, [detail, address])
  useEffect(() => {
    initPage()
  }, [id, address])

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
    }else if(whiteType){
      return DetailInfoType.white
    }else if(publicType){
      return DetailInfoType.public
    }
    return null
  }, [publicType, whiteType])

  console.log({buyType,publicType,whiteType})
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
