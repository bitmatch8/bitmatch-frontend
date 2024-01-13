/* Components */

import Page from "@/components/Page"
import DetailTitle from "../ft/DetailTitle"
import { Spaced } from "@/components/Spaced"
import ProjectCard from "./ProjectCard"
import NftImg from "@/assets/img/nft_img.png"
import { useEffect, useMemo, useState } from "react"
import NFTWhitelistStage from "./NFTWhitelistStage"
import PublicStage from "../ft/pages/PublicStage"
import ProjectInformation from "../ft/pages/ProjectInformation"
import styled from "@emotion/styled"
import Button from "@/components/Button"
import OrderHistory from "./OrderHistory"
import { fetchProjectInfoApi, fetchWhtielistInfoApi } from "@/api/api"
import { baseDate } from "@/utils"
import ValueSkeleton from "@/components/ValueSkeleton"

//1705153787492
//1705388400000
const foramtDateInfo = (item: any, type: string) => {
  if (item === null) {
    return null
  }
  const endtime = new Date(item.enttime)
  const starttime = new Date(item.starttime)
  if (starttime.getTime() > Date.now()) {
    return `${type}_NotStarted`
  } else if (endtime.getTime() < Date.now()) {
    return `${type}_Ended`
  } else if (starttime.getTime() > Date.now()) {
    return `${type}_InProgress`
  }
}

export default function GenesisNFT() {
  const [detail, setDetail] = useState<any>(null)
  const [publicInfo, setPublicInfo] = useState(null)
  const [whiteInfo, setWhiteInfo] = useState(null)
  const id = 56

  const whiteType = useMemo(() => {
    return foramtDateInfo(whiteInfo, "white")
  }, [whiteInfo])

  const publicType = useMemo(() => {
    return foramtDateInfo(whiteInfo, "public")
  }, [publicInfo])

  const buyType = useMemo(() => {
    if(whiteType === null && whiteType === null){
      return null
    }
    if (whiteType && whiteType !== "white_Ended") {
      return whiteType
    } else if (!publicType) {
      return whiteType
    } else {
      return publicType
    }
  }, [whiteType, publicType])

  const initWhtielist = async () => {
    const public_res = await fetchWhtielistInfoApi(detail?.pubid)
    const white_res = await fetchWhtielistInfoApi(detail?.wid)
    if (public_res?.code === 0) {
      setPublicInfo(public_res.data)
    }
    if (white_res?.code === 0) {
      setWhiteInfo(white_res.data)
    }
  }
  const initPage = async () => {
    const { data, code } = await fetchProjectInfoApi(id)
    if (code === 0) {
      setDetail(data)
    }
  }
  useEffect(() => {
    if (detail) {
      initWhtielist()
    }
  }, [detail])
  useEffect(() => {
    initPage()
  }, [id])

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

  
  const tabId= useMemo(()=>{
    if(whiteType === 'white_Ended' && publicType){
      if(publicType === 'public_Ended'){
        return 0
      }
      return 1
    }
    return 0
  },[publicType,whiteType])
  return (
    <Page>
      <DetailTitle title={detail === null ? null:detail?.projectname } />
      <Spaced size="80" />
      <ProjectCard detail={detail} buyType={buyType} />
      <ProjectTabs tabId={tabId} ProjectTabList={ProjectTabList} detail={detail} whiteInfo={whiteInfo} publicInfo={publicInfo} /> 
      <Spaced size="150" />
      {/* <OrderHistory/> */}
    </Page>
  )
}

const ProjectTabs: React.FC<{ProjectTabList:any,whiteInfo:any,publicInfo:any,detail:any,tabId:any}> = ({ProjectTabList,whiteInfo,publicInfo,detail,tabId}) => {
  const [tId, setTabId] = useState<number>(tabId)

  const onClickTabItem = (id: number) => setTabId(id)
  const ProjectShowBlock = useMemo(() => {
    if (ProjectTabList === null) {
      return null
    }
    const arr = []
    if (whiteInfo) {
      arr.push(<NFTWhitelistStage detail={detail} />)
    }
    if (publicInfo) {
      arr.push(<PublicStage />)
    }
    arr.push(<ProjectInformation />)
    return arr[tId]
  }, [detail, tabId,whiteInfo,publicInfo, ProjectTabList,tId])
  return <>
  <ProjectTabsBox>
        {ProjectTabList === null ? (
          <ValueSkeleton width={1000} height={60} />
        ) : (
          ProjectTabList?.map((txt:any, key:any) => (
            <ProjectTabsItemBox
              onClick={() => onClickTabItem(key)}
              className={key === tId ? "active" : ""}
              key={key}>
              {txt}
            </ProjectTabsItemBox>
          ))
        )}
      </ProjectTabsBox>
      {ProjectShowBlock === null ? (
        <EmptyStageBox>
          <ValueSkeleton width={500} height={50} />
        </EmptyStageBox>
      ) : (
        ProjectShowBlock
      )}
  </>
}
const EmptyStageBox = styled.div`
  margin-top: 80px;
  /* height: 1059px; */
  background: #181b20;
  border-radius: 30px;
  padding: 60px 40px;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`

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
