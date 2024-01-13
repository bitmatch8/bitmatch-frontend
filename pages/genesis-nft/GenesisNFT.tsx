/* Components */

import Page from "@/components/Page";
import DetailTitle from "../ft/DetailTitle";
import { Spaced } from "@/components/Spaced";
import ProjectCard from "./ProjectCard";
import NftImg from '@/assets/img/nft_img.png'
import { useEffect, useState } from "react";
import NFTWhitelistStage from "./NFTWhitelistStage";
import PublicStage from "../ft/pages/PublicStage";
import ProjectInformation from "../ft/pages/ProjectInformation";
import styled from "@emotion/styled";
import Button from "@/components/Button";
import OrderHistory from "./OrderHistory";
import { fetchProjectInfoApi } from "@/api/api";

export default function GenesisNFT() {
	const [tabId, setTabId] = useState(0)
  const [detail,setDetail]=useState<any>(null)
  const [whtielist,setWhtielist]=useState(null)
  const id = 56
	const onClickTabItem = (id: number) => setTabId(id)
  
	const ProjectTabList = [
	  "Whitelist Stage",
	  "Public Stage",
	  "Project Information",
	]
  const initWhtielist=async()=>{

  }
  const initPage= async()=>{
    const {data,code} = await fetchProjectInfoApi(id)
    if(code === 0){
      setDetail(data)
    }
  }
  useEffect(()=>{
    if(detail){
      initWhtielist()
    }
  },[detail])
  useEffect(()=>{
    initPage()
  },[id])
	const ProjectShowBlock = [<NFTWhitelistStage detail={detail}/>,<PublicStage/>,<ProjectInformation/>][tabId]
	return <Page>
		     <DetailTitle title="BitMatch Genesis NFT"/> 
      <Spaced size="80"/>
      <ProjectCard detail={detail}/>
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
      <Spaced size="150"/>
      {/* <OrderHistory/> */}
	</Page> 
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