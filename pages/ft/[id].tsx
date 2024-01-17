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
import useDetail from "@/hook/useDetail"
export default function IndexPage() {
  const {
    query: { id },
  }: any = useRouter()
  const {
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
      <Spaced size="80" />
      <ProjectCard detail={detail} buyType={buyType} />
      <ProjectTabs
        whiteRead={readWhtie}
        publicRead={readPublic}
        tabId={tabId}
        ProjectTabList={ProjectTabList}
        detail={detail}
        whiteInfo={whiteInfo}
        publicInfo={publicInfo}
      />
      <Spaced size="150" />
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
