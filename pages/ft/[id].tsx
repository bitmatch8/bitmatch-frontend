/* Components */

import Button from "@/components/Button"
import Page from "@/components/Page"
import styled from "@emotion/styled"
import React, { useState } from "react"
import WhitelistStage from "./pages/WhitelistStage"
import ProjectCard from "./pages/ProjectCard"
import { Spaced } from "@/components/Spaced"
import OrderHistory from "./pages/OrderHistory"
import PublicStage from "./pages/PublicStage"
import DetailTitle from "./DetailTitle"
import DemoImg from "@/assets/img/demo_1.png"
export default function IndexPage() {
  const [tabId, setTabId] = useState(0)
  const onClickTabItem = (id: number) => setTabId(id)
  const ProjectTabList = [
    "Whitelist Stage",
    "Public Stage",
    "Project Information",
  ]
  const ProjectShowBlock = [
    <WhitelistStage />,
    <PublicStage />,
    // <ProjectInformation />,
  ][tabId]
  return (
    <Page>
      <DetailTitle title="Bitcoin Frogs" />
      <Spaced size="80" />
      <ProjectCard symbol="$Frog" title="Bitcoin Frogs" cardImg={DemoImg} />
      <ProjectTabsBox>
        {ProjectTabList.map((txt, key) => (
          <ProjectTabsItemBox
            onClick={() => onClickTabItem(key)}
            className={key === tabId ? "active" : ""}
            key={key}>
            {txt}
          </ProjectTabsItemBox>
        ))}
      </ProjectTabsBox>
      {ProjectShowBlock}
      <Spaced size="150" />
      <OrderHistory />
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
