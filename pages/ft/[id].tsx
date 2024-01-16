/* Components */

import Button from "@/components/Button"
import Page from "@/components/Page"
import styled from "@emotion/styled"
import React, { useEffect, useMemo, useState } from "react"
import { Spaced } from "@/components/Spaced"
import DetailTitle from "@/components/ProjectCard/DetailTitle"
import { fetchProjectInfoApi, fetchWhtielistInfoApi } from "@/api/api"
import { useSelector } from "react-redux"
import { selectWallter } from "@/lib/redux"
import { foramtDateInfo } from "@/utils"
import ProjectCard from "@/components/ProjectCard"
import ProjectTabs from "@/components/ProjectTabs"
import { useRouter } from "next/router"
export default function IndexPage() {
  const {
    query: { id }
  }: any = useRouter();
  const [detail, setDetail] = useState<any>(null)
  const [publicInfo, setPublicInfo] = useState(null)
  const [whiteInfo, setWhiteInfo] = useState(null)
  const [singlePersonPurchased, setSinglePersonPurchased] = useState(null)
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
      {/* <ProjectTabsBox>
        {ProjectTabList.map((txt, key) => (
          <ProjectTabsItemBox
            onClick={() => onClickTabItem(key)}
            className={key === tabId ? "active" : ""}
            key={key}>
            {txt}
          </ProjectTabsItemBox>
        ))}
      </ProjectTabsBox> */}
      {/* {ProjectShowBlock} */}
      <Spaced size="150" />
      {/* <OrderHistory /> */}
    </Page>
  )
}

const ProjectTabsItemBox = styled.div`
  font-size: 40px;
  font-weight: 600;
  color: #dbdbdb;
  line-height: 60px;
  position: relative;
  cursor: pointer;
  &.active {
    color: #f7931a;
    &::after {
      content: "";
      position: absolute;
      width: 120px;
      height: 6px;
      background-color: #f7931a;
      bottom: -18px;
      left: 50%;
      border-radius: 3px;
      transform: translateX(-50%);
    }
  }
`
const ProjectTabsBox = styled.div`
  margin-top: 150px;
  display: flex;
  gap: 80px;
`
const HeadBackButtonBox = styled(Button)`
  background-color: transparent;
  width: auto;
  font-size: 60px;
  font-weight: 600;
  color: #dbdbdb;
  line-height: 100px;
  &:hover {
    color: #f8931a;
    svg {
      fill: #f8931a;
    }
    background: transparent;
  }
`
const HeadContainerBox = styled.div`
  margin: 145px auto 0px;
`
