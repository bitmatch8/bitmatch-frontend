import styled from "@emotion/styled"
import React, { useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { selectWallter } from "@/lib/redux"
import Button from "../Button"
import EmptyStageBox from "../EmptyStageBox"
import ValueSkeleton from "../ValueSkeleton"
import WhitelistStageNFT from "../WhitelistStage/WhitelistStageNFT"
import WhitelistStageFT from "../WhitelistStage/WhitelistStageFT"
import ProjectInformation from "../ProjectInformation"

const ProjectTabs: React.FC<{
  ProjectTabList: any
  whiteInfo: any
  publicInfo: any
  detail: any
  tabId: any
}> = ({ ProjectTabList, whiteInfo, publicInfo, detail, tabId }) => {
  const [tId, setTabId] = useState<string>(tabId)
  const { balance } = useSelector(selectWallter)
  const onClickTabItem = (id: string) => setTabId(id)
  const WhitelistStage =
    String(detail?.projecttype) === "2" ? WhitelistStageNFT : WhitelistStageFT
  return (
    <>
      <ProjectTabsBox>
        {ProjectTabList === null ? (
          <ValueSkeleton width={1000} height={60} />
        ) : (
          ProjectTabList?.map(({title,id}: any, key: any) => (
            <ProjectTabsItemBox
              onClick={() => onClickTabItem(id)}
              className={id === tId ? "active" : ""}
              key={key}>
              {title}
            </ProjectTabsItemBox>
          ))
        )}
      </ProjectTabsBox>
      {whiteInfo === null ? (
        <EmptyStageBox>
          <ValueSkeleton width={500} height={50} />
        </EmptyStageBox>
      ) : (
       <>
       {whiteInfo && tId === 'white' ? <WhitelistStage
          stage="whitelist"
          title="Bitcoin Frogs Whitelist Stage"
          balance={balance}
          detail={detail}
          info={whiteInfo}
        />:''}
       {publicInfo && tId === 'public'  ? <WhitelistStage
          stage="public"
          title="Bitcoin Frogs Public Stage"
          balance={balance}
          detail={detail}
          info={publicInfo}
        />:''}
       {tId === 'info' ? <ProjectInformation show={detail.projecttype === "1"} id={detail?.pdid} />:''}
       </> 
      )}
    </>
  )
}

export default ProjectTabs

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

