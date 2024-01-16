/* Components */

import Page from "@/components/Page"
import DetailTitle from "@/components/ProjectCard/DetailTitle"
import { Spaced } from "@/components/Spaced"
import { useEffect, useMemo, useState } from "react"
import { fetchProjectInfoApi, fetchWhtielistInfoApi } from "@/api/api"
import {
  useSelector,
  selectWallter,
} from "@/lib/redux"
import ProjectCard from "@/components/ProjectCard"
import { foramtDateInfo } from "@/utils"
import ProjectTabs from "@/components/ProjectTabs"


export default function GenesisNFT() {
  const [detail, setDetail] = useState<any>(null)
  const [publicInfo, setPublicInfo] = useState(null)
  const [whiteInfo, setWhiteInfo] = useState(null)
  const [singlePersonPurchased, setSinglePersonPurchased] = useState(null)
  const id = 1
  const { address } = useSelector(selectWallter)

  const whiteType = useMemo(() => {
    return foramtDateInfo(whiteInfo, "white")
  }, [whiteInfo])

  const publicType = useMemo(() => {
    return foramtDateInfo(whiteInfo, "public")
  }, [publicInfo])

  const buyType = useMemo(() => {
    if (whiteType === null && whiteType === null)
      return null
    if (whiteType && whiteType !== "white_Ended") {
      return whiteType
    } else if (!publicType) {
      return whiteType
    } else {
      return publicType
    }
  }, [whiteType, publicType])

  const initWhtielist = async () => {
    if(detail?.pubid){
      const public_res = await fetchWhtielistInfoApi({
        id: detail?.pubid,
        address,
      })
      if (public_res?.code === 0) {
        setPublicInfo(public_res.data)
      }
    }
    if(detail?.wid){
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
    const { data, code } = await fetchProjectInfoApi({ id, address:address ?address : undefined })
    if (code === 0) {
      setDetail(data)
      setSinglePersonPurchased(data?.singlePersonPurchased || 0)
    }
  }
  useEffect(() => {
    if (detail) {
      initWhtielist()
    }
  }, [detail, address])
  useEffect(() => {
    initPage()
  }, [id, address])

  console.log(detail,singlePersonPurchased)
  const ProjectTabList = useMemo(() => {
    if (!whiteInfo && !publicInfo) {
      return null
    }
    const arr = []
    if (whiteInfo) {
      arr.push({id:'white',title:"Whitelist Stage"})
    }
    if (publicInfo) {
      arr.push({id:'public',title:"Public Stage"})
    }
    arr.push({id:'info',title:"Project Information"})
    return arr
  }, [whiteInfo, publicInfo])

  const tabId = useMemo(() => {
    if (whiteType === "white_Ended" && publicType) {
      if (publicType === "public_Ended") {
        return 'white'
      }
      return 'public'
    }
    return 'white'
  }, [publicType, whiteType])
  return (
    <Page>
      <DetailTitle title={detail === null ? null : detail?.projectname} />
      <Spaced size="80" />
      <ProjectCard detail={detail} buyType={buyType} />
      <ProjectTabs
        tabId={tabId}
        ProjectTabList={ProjectTabList}
        detail={detail}
        whiteInfo={whiteInfo}
        publicInfo={publicInfo}
      />
      <Spaced size="150" />
      {/* <OrderHistory/> */}
    </Page>
  )
}
