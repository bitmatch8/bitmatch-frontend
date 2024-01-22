/* Components */

import Page from "@/components/Page"
import React, {  } from "react"
import { Spaced } from "@/components/Spaced"
import DetailTitle from "@/components/ProjectCard/DetailTitle"
import ProjectCard from "@/components/ProjectCard"
import ProjectTabs from "@/components/ProjectTabs"
import { useRouter } from "next/router"
import useDetail from "@/hook/useDetail"
import OrderHistory from "@/components/OrderHistory"
import ValueSkeleton from "@/components/ValueSkeleton"
export default function IndexPage() {
  const {
    query: { id },
  }: any = useRouter()
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
  } = useDetail(id)
  return (
    <Page>
      <DetailTitle title={detail === null ? null : detail?.projectname} />
      <Spaced size="60" />
      <ProjectCard detail={detail} buyType={buyType} />
      {load ? '':<ProjectTabs
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
    </Page>
  )
}


