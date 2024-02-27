
import React, {  } from "react"
import { Spaced } from "@/components/Spaced"
import DetailTitle from "@/components/ProjectCard/DetailTitle"
import ProjectCard from "@/components/ProjectCard"
import ProjectTabs from "@/components/ProjectTabs"
import useDetail from "@/hook/useDetail"
import OrderHistory from "@/components/OrderHistory"
import ValueSkeleton from "@/components/ValueSkeleton"
import styled from "@emotion/styled"
export const ProjectDetail: React.FC<{id:any}> = ({id}) => {
  const {
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
  } = useDetail(String(id))
  // { refreshInterval: refreshConfig.history_refreshInterval }
  return (
    <>
     <DetailTitle title={detail === null ? null : detail?.projectname} />
      <Spaced size="60" />
      <ProjectCard detail={detail} buyType={buyType} />
      {load ? <>
      <Spaced size="150"/>
      <ValueSkeletonBox>
      <ValueSkeleton width={1240} height={80}/>
      <Spaced size="100"/>
      <ValueSkeleton width={1240} height={300}/>
      <Spaced size="100"/>
      <ValueSkeleton width={1240} height={300}/>
      </ValueSkeletonBox>
      </>:<ProjectTabs
        whiteRead={readWhtie}
        publicRead={readPublic}
        tabId={tabId}
        ProjectTabList={ProjectTabList}
        detail={detail}
        whiteInfo={whiteInfo}
        publicInfo={publicInfo}
      />}
      <Spaced size="150" />
     {address && id ? <OrderHistory address={address} pid={id}/> : ''}  
    </>
  )
}
export default ProjectDetail



const ValueSkeletonBox=styled.div`
height: 1046px;
`