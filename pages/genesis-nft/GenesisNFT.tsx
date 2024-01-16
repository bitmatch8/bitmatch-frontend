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
  const id = 56
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
    const public_res = await fetchWhtielistInfoApi({
      id: detail?.pubid,
      address,
    })
    const white_res = await fetchWhtielistInfoApi({
      id: detail?.wid,
      address,
    })
    if (public_res?.code === 0) {
      setPublicInfo(public_res.data)
    }
    if (white_res?.code === 0) {
      setWhiteInfo(white_res.data)
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

  const ProjectTabList = useMemo(() => {
    if (!whiteInfo && !publicInfo) {
      return null
    }
    const arr = []
    if (whiteInfo) {
      arr.push("Whitelist Stage")
    }
    if (publicInfo) {
      arr.push("Public Stage")
    }
    arr.push("Project Information")
    return arr
  }, [whiteInfo, publicInfo])

  const tabId = useMemo(() => {
    if (whiteType === "white_Ended" && publicType) {
      if (publicType === "public_Ended") {
        return 0
      }
      return 1
    }
    return 0
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
