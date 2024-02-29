import styled from "@emotion/styled"
import React, { useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { buySlice, selectBuy, selectWallter, useDispatch } from "@/lib/redux"
import EmptyStageBox from "../EmptyStageBox"
import ValueSkeleton from "../ValueSkeleton"
import WhitelistStageNFT from "../WhitelistStage/WhitelistStageNFT"
import WhitelistStageFT from "../WhitelistStage/WhitelistStageFT"
import ProjectInformation from "../ProjectInformation"
import { DetailInfoType, ProjectType } from "@/utils/types"
import { useRouter } from "next/router"

const ProjectTabs: React.FC<{
  ProjectTabList: any
  whiteInfo: any
  publicInfo: any
  detail: any
  tabId: any
  whiteRead: any
  publicRead: any
}> = ({
  ProjectTabList,
  whiteInfo,
  publicInfo,
  detail,
  tabId,
  whiteRead,
  publicRead,
}) => {
  const dispatch = useDispatch()
  const {replace} = useRouter()
  const { balance:user_balance,address } = useSelector(selectWallter)
 
  const onClickTabItem = (type: string) =>{
    replace(`#${type}`)
    dispatch(buySlice.actions.setTabType({type}))
  }
  
  const balance=useMemo(()=>{
    return address ? user_balance : {
      confirmed: 0,
      unconfirmed: 0,
      total: 0
    }
  },[user_balance,address])
  const WhitelistStage =
    String(detail?.projecttype) === ProjectType.NFT
      ? WhitelistStageNFT
      : WhitelistStageFT

  return (
    <>
      <ProjectTabsBox>
        {ProjectTabList === null ? (
          <ValueSkeleton width={1000} height={60} />
        ) : (
          ProjectTabList?.map(({ title, id }: any, key: any) => (
            <ProjectTabsItemBox
              onClick={() => onClickTabItem(id)}
              className={id === tabId ? "active" : ""}
              key={key}>
              {title}
            </ProjectTabsItemBox>
          ))
        )}
      </ProjectTabsBox>
      {whiteInfo === null && publicInfo === null ? (
        <EmptyStageBox>
          <ValueSkeleton width={500} height={50} />
        </EmptyStageBox>
      ) : (
        <>
          {whiteInfo && tabId === DetailInfoType.white ? (
            <WhitelistStage
              readData={whiteRead}
              stage="whitelist"
              title={detail?.projectname}
              balance={balance}
              detail={detail}
              info={whiteInfo}
            />
          ) : null}
          {publicInfo && tabId === DetailInfoType.public ? (
            <WhitelistStage
              readData={publicRead}
              stage="public"
              title={detail?.projectname}
              balance={balance}
              detail={detail}
              info={publicInfo}
            />
          ) : null}
          {tabId === DetailInfoType.info ? (
            <ProjectInformation
            title={detail?.projectname}
              show={detail.projecttype === ProjectType.FT}
              id={detail?.pdid}
            />
          ) : null}
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
