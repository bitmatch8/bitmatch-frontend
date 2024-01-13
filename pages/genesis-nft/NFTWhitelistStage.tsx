import Button from "@/components/Button"
import ImgBox from "@/components/ImgBox"
import { Spaced } from "@/components/Spaced"
import TokenSymbol from "@/components/TokenSymbol"
import NFTSHOWImg from "@/assets/img/nft_show.png"
import styled from "@emotion/styled"
import { CSSProperties, ReactNode, useMemo, useState } from "react"
import Input from "@/components/Input"

const WhitelistStageProgress: React.FC<{ total: number; num: number }> = ({
  total,
  num,
}) => {
  const ProgressVal = useMemo(
    () => ((num / total) * 100).toFixed(2),
    [total, num]
  )
  return (
    <WhitelistStageCardBox style={{ gap: 24 }}>
      <ProgressLineBox>
        <ProgressLineInerBox />
      </ProgressLineBox>
      <WhitelistStageLine title="Progress" mark="">
        <span style={{ color: "#C2C5C8" }}>
          {ProgressVal}%{`(${num}/${total})`}
        </span>
      </WhitelistStageLine>
    </WhitelistStageCardBox>
  )
}
const WhitelistStageLine: React.FC<{
  title: string
  children?: ReactNode
  style?: CSSProperties
  mark?: string
}> = ({ title, children, style, mark = ":" }) => {
  return (
    <WhitelistStageLineItemBox>
      <WhitelistStageLineItemTitBox>
        {title}
        {mark}
      </WhitelistStageLineItemTitBox>
      <WhitelistStageLineItemValBox style={style}>
        {children}
      </WhitelistStageLineItemValBox>
    </WhitelistStageLineItemBox>
  )
}
const WhitelistStageButton:React.FC=()=>{

  const onCLick=()=>{
    
  }

  return <WhitelistStageButtonBox onClick={onCLick} >01D 24H 59M 59S</WhitelistStageButtonBox>
}
const WhitelistStage: React.FC = () => {
  const [value,setValue]=useState('')
  const onChangeInput = (e: any) => {
    let { value } = e.target;
    // const reg = /^-?\d*(\.\d*)?$/;
    const reg = /^-?\d*?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '') {
      // if (value > Number(getDisplayBalance(pageobj.maxVal))) {
      //   value = Number(getDisplayBalance(pageobj.maxVal))
      // }
      setValue(value)
    }
  }
  return (
    <WhitelistStageBox>
      <WhitelistStageTitleBox>
        Bitcoin Frogs Whitelist Stage
      </WhitelistStageTitleBox>
      <WhitelistStageCardBox style={{ flexDirection: "row", gap: 60 }}>
        <WhitelistStageItemBox style={{ flex: 1 }}>
          <WhitelistStageLine title="Whitelist Amount">100</WhitelistStageLine>
          <WhitelistStageLine title="Price">
            <TokenSymbol size={22} symbol="Bit" />
            <span>0.23456789</span>
          </WhitelistStageLine>
          <WhitelistStageLine title="Minimum Limit">100</WhitelistStageLine>
          <WhitelistStageLine title="Maximum Limit">100</WhitelistStageLine>
          <WhitelistStageLine title="Launch Time">
            <div>
            <div>
            Dec-30-2023 09:00:00 AM UTC+8
            </div>
            <div style={{marginTop:20}}>
            Dec-30-2023 09:00:00 AM UTC+8
            </div>
            </div>
          </WhitelistStageLine>

        </WhitelistStageItemBox>
        <WhitelistStageItemBox>
          <ImgBox alt="" src={NFTSHOWImg} width={388} />
        </WhitelistStageItemBox>
      </WhitelistStageCardBox>
      <Spaced size="40" />
      <WhitelistStageProgress total={10000} num={4000} />
      <Spaced size="100" />
      <WhitelistStageLineBox
        style={{ justifyContent: "space-between", gap: 0 }}>
        <WhitelistStageFooterItem>
          <WhitelistStageInputBox placeholder="0" value={value} onChange={onChangeInput} />
          <FooterTextLineBox>My Shares 8,000 $Frog</FooterTextLineBox>
        </WhitelistStageFooterItem>
        <WhitelistStageFooterItem>
         <WhitelistStageButton/> 
          <FooterTextLineBox>
            <span className="g">Balance</span>
            <span>1.23456789 BTC</span>
          </FooterTextLineBox>
        </WhitelistStageFooterItem>
      </WhitelistStageLineBox>
      <Spaced size="24" />
    </WhitelistStageBox>
  )
}
export default WhitelistStage

const FooterTextLineBox = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  line-height: 24px;
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .g {
    color: #6f6f76;
  }
`
const WhitelistStageFooterItem = styled.div``
const WhitelistStageButtonBox = styled(Button)`
  width: 420px;
  height: 120px;
  border-radius: 24px;

  font-size: 36px;
  font-weight: 600;
  color: #ffffff;
  line-height: 36px;
`
const WhitelistStageInputBox=styled(Input)`
  width: 520px;
`
const WhitelistStageFooterBox = styled.div``
const ProgressLineInerBox = styled.div`
  width: 429px;
  height: 24px;
  background: linear-gradient(90deg, #d87600 0%, #f38f17 78%, #ffbf49 100%);
  border-radius: 12px;
`
const ProgressLineBox = styled.div`
  height: 20px;
  background: #181b20;
  box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
`
const WhitelistStageLineItemTitBox = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #c2c5c8;
  line-height: 24px;
`
const WhitelistStageLineItemValBox = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  line-height: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
`
const WhitelistStageLineItemBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
`
const WhitelistStageLineBox = styled.div`
  display: flex;
  gap: 60px;
`
const WhitelistStageCardBox = styled.div`
  padding: 40px;
  background: #24272b;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`
const WhitelistStageTitleBox = styled.div`
  font-size: 60px;
  font-weight: 600;
  color: #ffffff;
  line-height: 60px;
  margin-bottom: 60px;
`
const WhitelistStageBox = styled.div`
  margin-top: 80px;
  /* height: 1059px; */
  background: #181b20;
  border-radius: 30px;
  padding: 60px 40px;
`

const WhitelistStageItemBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`
