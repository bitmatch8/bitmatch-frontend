import Button from "@/components/Button"
import { Spaced } from "@/components/Spaced"
import TokenSymbol from "@/components/TokenSymbol"
import styled from "@emotion/styled"
import { CSSProperties, ReactNode, useEffect, useMemo, useRef, useState } from "react"
import echarts from 'echarts'
import dynamic from 'next/dynamic'
import TokenomicsEcharts from './TokenomicsEcharts'
import { fetchProjectDetailsApi } from "@/api/api"
import ValueSkeleton from "@/components/ValueSkeleton"
import Image from "next/image"
// const TokenomicsEcharts = dynamic(
//   () => import('./TokenomicsEcharts'),
//   { ssr: false },
// )
const ProjectInformation: React.FC<{id:any,show:boolean}> = ({id,show}) => {
  const [detail,setDetail]=useState<any>(null)
  const initPage=async()=>{
    if(!id){
      return null
    }
    const {code,data} =await fetchProjectDetailsApi(id)
    if(code === 0){
      setDetail(data)
    }
  }
  useEffect(()=>{
    initPage()
  },[id])
  return (
    <ProjectInformationBox>
      <PageTitleBox>Bitcoin Frogs Information</PageTitleBox>
      <PageSubTitleBox>About Bitcoin Frogs</PageSubTitleBox>
      <InfoContainerBox>
        <InfoContainerTitleBox>
        Introduction
        </InfoContainerTitleBox>
        <InfoContainerLineBox>
          {detail === null ?  <ValueSkeleton width={300} height={38}/>:<div dangerouslySetInnerHTML={{__html:String(detail?.projectrelated).replaceAll("\n","<br/>")}}/>}
        {/* 10,000 timeless frog collectibles stored on the Bitcoin Blockchain.
        <br /><br />
These are 10,000 pure digital collectibles that will remain on Bitcoin forever. No more will ever be created.
<br /><br />
Rarities of all traits within each layer are equal, allowing subjective appreciation of aesthetics and satoshi-based rarities to emerge. */}
        </InfoContainerLineBox>

        <InfoContainerTitleBox>
        Advantages
        </InfoContainerTitleBox>
        <InfoContainerLineBox>
        {detail === null ?  <ValueSkeleton width={300} height={38}/>:<div dangerouslySetInnerHTML={{__html:String(detail?.projectfeatures).replaceAll("\n","<br/>")}}/>}
        {/* 1. 10,000 timeless frog collectibles stored on the Bitcoin Blockchain.
<br /><br />
2. These are 10,000 pure digital collectibles that will remain on Bitcoin forever. No more will ever be created.
<br /><br />
3. Rarities of all traits within each layer are equal, allowing subjective appreciation of aesthetics and satoshi-
<br /><br />
4. based rarities to emerge. */}
        </InfoContainerLineBox>
      </InfoContainerBox>
     {show? <>
      <PageSubTitleBox>Tokenomics</PageSubTitleBox>
      <TokenomicsEchartsBox>
      <TokenomicsImgBox alt="" width={1120} height={639} src={`data:image/jpeg;base64,${detail?.tokenomics}`}/>
      </TokenomicsEchartsBox>
     </>:''}
    </ProjectInformationBox>
  )
}
export default ProjectInformation

const TokenomicsImgBox=styled(Image)`
border-radius: 20px;
`
const TokenomicsEchartsBox=styled.div`
  width: 1120px;
  /* height: 693px; */
  border-radius: 30px;
  margin: 40px auto;
  /* background-color: #fff; */
`
const InfoContainerBox=styled.div`
  padding: 20px;
  margin-top: 40px;
`
const InfoContainerLineBox=styled.div`
font-size: 24px;
font-weight: 300;
color: #C2C5C8;
line-height: 36px;
margin: 36px 0;
padding-bottom: 30px;
min-height: 300px;
`
const InfoContainerTitleBox=styled.div`
font-size: 24px;
font-weight: 600;
color: #FFFFFF;
line-height: 24px;
`
const ProjectInformationBox = styled.div`
  margin-top: 80px;
  background: #181b20;
  border-radius: 30px;
  padding: 60px 40px;
`
const PageTitleBox = styled.div`
  font-size: 60px;
  font-weight: 600;
  color: #ffffff;
  line-height: 60px;
  margin-bottom: 60px;
`
const PageSubTitleBox = styled.div`
  font-size: 32px;
  font-weight: 600;
  color: #c2c5c8;
  line-height: 32px;
  position: relative;
  margin-bottom: 20px;
  &::after {
    content: "";
    position: absolute;
    width: 70px;
    height: 6px;
    background-color: #f7931a;
    bottom: -18px;
    left: 0;
    border-radius: 3px;
    /* transform: translateX(-50%); */
  }
`
