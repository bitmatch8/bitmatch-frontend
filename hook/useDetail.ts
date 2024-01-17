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
  const [singlePersonPurchased, setSinglePersonPurchased] = useState(null)
  const { address } = useSelector(selectWallter)

  const whiteType = useMemo(() => {
    return foramtDateInfo(whiteInfo, DetailInfoType.white)
  }, [whiteInfo])

  const publicType = useMemo(() => {
    return foramtDateInfo(whiteInfo, DetailInfoType.public)
  }, [publicInfo])

  const buyType = useMemo(() => {
    if (whiteType === null && whiteType === null) return null
    if (whiteType && whiteType !== BuyState.White_Ended) {
      return whiteType
    } else if (!publicType) {
      return whiteType
    } else {
      return publicType
    }
  }, [whiteType, publicType])
  const readPublic = async () => {
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
  const readWhtie = async () => {
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

  const initPage = async () => {
    const { data, code } = await fetchProjectInfoApi({
      id,
      address: address ? address : undefined,
    })
    if (code === 0) {
      setDetail(data)
      setSinglePersonPurchased(data?.singlePersonPurchased || 0)
    }
  }
  useEffect(() => {
    if (detail) {
      readWhtie()
      readPublic()
    }
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
    }
    return DetailInfoType.white
  }, [publicType, whiteType])

  return {
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
