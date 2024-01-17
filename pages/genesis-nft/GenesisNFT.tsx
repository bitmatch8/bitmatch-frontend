/* Components */

import Page from "@/components/Page"
import DetailTitle from "@/components/ProjectCard/DetailTitle"
import { Spaced } from "@/components/Spaced"
import ProjectCard from "@/components/ProjectCard"
import ProjectTabs from "@/components/ProjectTabs"
import useDetail from "@/hook/useDetail"

export default function GenesisNFT() {
  const {
    detail,
    buyType,
    tabId,
    ProjectTabList,
    whiteInfo,
    publicInfo,
    readWhtie,
    readPublic,
  } = useDetail(1)
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
        whiteRead={readWhtie}
        publicRead={readPublic}
      />
      <Spaced size="150" />
      {/* <OrderHistory/> */}
    </Page>
  )
}
