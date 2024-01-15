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
  const [tId, setTabId] = useState<number>(tabId)
  const { balance } = useSelector(selectWallter)
  const onClickTabItem = (id: number) => setTabId(id)
  const WhitelistStage =
    String(detail?.projecttype) === "2" ? WhitelistStageNFT : WhitelistStageFT
  const ProjectShowBlock = useMemo(() => {
    if (ProjectTabList === null) {
      return null
    }
    const arr = []
    if (whiteInfo) {
      arr.push(
        <WhitelistStage
          stage="whitelist"
          title="Bitcoin Frogs Whitelist Stage"
          balance={balance}
          detail={detail}
          info={whiteInfo}
        />
      )
    }
    if (publicInfo) {
      arr.push(
        <WhitelistStage
          stage="public"
          title="Bitcoin Frogs Public Stage"
          balance={balance}
          detail={detail}
          info={publicInfo}
        />
      )
    }
    arr.push(
      <ProjectInformation show={detail.projecttype === "1"} id={detail?.pdid} />
    )
    return arr[tId]
  }, [detail, tabId, whiteInfo, publicInfo, ProjectTabList, tId])
  return (
    <>
      <ProjectTabsBox>
        {ProjectTabList === null ? (
          <ValueSkeleton width={1000} height={60} />
        ) : (
          ProjectTabList?.map((txt: any, key: any) => (
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
