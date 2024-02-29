/** @type {import('next').NextConfig} */
import { Spaced } from "@/components/Spaced"
import TokenSymbol from "@/components/TokenSymbol"
import { BigNumber } from "@ethersproject/bignumber"
import styled from "@emotion/styled"
import React, { ReactElement, ReactNode, useEffect, useMemo, useState } from "react"
import Input from "@/components/Input"
import { formatUnitsAmount, getFullDisplayBalance, parseFixedAmount } from "@/utils/formatBalance"
import WhitelistStageButton from "@/components/WhitelistStageButton"
import WhitelistStageProgress from "@/components/WhitelistStageProgress"
import WhitelistStageLine from "@/components/WhitelistStageLine"
import useBuy from "@/hook/useBuy"
import { dateFormat } from "@/utils"
import { fetchFeesApi } from "@/api/api"
import HelpIcon from "../Svg/HelpIcon"
import TextTooltip from "../TextTooltip"


const WhitelistStageFT: React.FC<{
  detail: any
  info: any
  balance: any
  title: string
  stage: any
  readData: any
}> = ({ info, balance, title, detail, stage, readData }) => {
  const [fees, setFees] = useState(0)
  
  // console.log({balance})

  const {
    value,
    inputLoad,
    onChangeInput,
    callbackSuccess,
    onMax,
    isWhiteInfo,
    isLimit,
    mposa,
    hposa,
    maxAmount,
  } = useBuy(info, readData, detail, stage)

  const isTest = useMemo(
    () => process.env.NEXT_PUBLIC_TEST === "test",
    [process.env]
  )
  const initFees = async () => {
    // if (isTest) {
    //   setFees(1)
    // } else {
      const fees = await fetchFeesApi()
      setFees(fees?.fastestFee || 0)
    // }
  }
  useEffect(() => {
    initFees()
  }, [isTest])

  // const old_price = useMemo(() => {
  //   return Number((Number(info.targetnumber || 0) / Number(info.tokennumber || 0)).toFixed(8))
  // }, [info, fees])

  const price = useMemo(() => {
    return info.targetnumber
    // return parseFixedAmount(String(info.targetnumber || old_price), 8)
  }, [info, stage, fees])

  const priceBig = useMemo(() => {
    return parseFixedAmount(String(price), 8)
  }, [info, price])

  const fileSize=useMemo(()=>{
    return Number(detail.size || 550)
  },[detail])

  const NetworkFee = useMemo(() => {
    return value ? (fees) : 0
  }, [value, fees, fileSize])
  /**
   * Value =price*value
   * Mint & Transfer fees = size * fees * 1.3 * (nft = value | ft=1)
   * Network Fee (Standard) = fees
   * Total Pay = value + transfer fees + network fee
   */
  const Transferfee = useMemo(() => {
    return value ?  Number(Math.ceil(((fees ) * fileSize * 1.3))) : 0
  }, [value, price,fees,fileSize,value])

  const satoshis = useMemo(() => {
    if (isLimit){
      return Transferfee
    }
    return priceBig.mul(BigNumber.from(value || 0)).add(BigNumber.from(Transferfee)).toString()
  }, [priceBig, fees, isLimit, value,Transferfee])

  const TotalFees = useMemo(() => {
    return BigNumber.from(satoshis || 0).add(BigNumber.from(NetworkFee)).toString()
  }, [NetworkFee, Transferfee,satoshis])

  const PayValue=useMemo(()=>{
    return value * price
  },[value,price])

  const HelpTipText = useMemo(()=>(
    <TipTitleBox>
      <p>
        Users need to pay the cost for the burning and transfer transactions
        included in FT orders, which is determined by the characteristics of the
        Ordinals protocol.
      </p>
      <p>The larger the bytes a transaction contains, the higher the cost.</p>
    </TipTitleBox>
  ),[])

  const TotalPayText = useMemo(() => {
    return (
      <TipTitleBox width="500px">
        <p>
          Value {PayValue ? PayValue : 0} BTC
        </p>
        <p>
          Inscribe & Transfer fees {Transferfee ? getFullDisplayBalance(Transferfee, 8) : 0} BTC
        </p>
        <p>Network Fee (Standard) {NetworkFee ? getFullDisplayBalance(NetworkFee, 8) : 0} BTC</p>
        <p>Total Pay {TotalFees ? getFullDisplayBalance(TotalFees, 8):0} BTC</p>
      </TipTitleBox>
    )
  }, [Transferfee, NetworkFee, TotalFees,PayValue])

  console.log({PayValue})
  return (
    <WhitelistStageBox>
      <WhitelistStageTitleBox>{title}</WhitelistStageTitleBox>
      <WhitelistStageCardBox>
        <WhitelistStageLineBox>
          <WhitelistStageLine title="Token Name">
            {detail?.projecttokenname}
          </WhitelistStageLine>
          <WhitelistStageLine title="Total Supply">
            {info?.tokennumber} {detail?.projecttokenname}
          </WhitelistStageLine>
        </WhitelistStageLineBox>
        <WhitelistStageLineBox>
          <WhitelistStageLine mark="" title={<SizeBox>
             Size: 
              <TextTooltip arrow title={HelpTipText}>
                <div>
                  <HelpIcon width={24} />
                </div>
              </TextTooltip>
            </SizeBox>}>
            {/* <TokenSymbol size={22} symbol={info.projectcurrency} /> */}
            <span>{fileSize} vB</span>
          </WhitelistStageLine>
          <WhitelistStageLine title="Price">
            {Number(price)} {info.projectcurrency} / {detail?.projecttokenname}
          </WhitelistStageLine>
        </WhitelistStageLineBox>
        <WhitelistStageLineBox>
          <WhitelistStageLine title="Minimum Limit">
            {mposa} {detail?.projecttokenname}
          </WhitelistStageLine>
          <WhitelistStageLine title="Maximum Limit">
            {hposa} {detail?.projecttokenname}
          </WhitelistStageLine>
        </WhitelistStageLineBox>
        <WhitelistStageLineBox>
          <WhitelistStageLine
            style={{ flex: 1, paddingLeft: 16 }}
            title="Launch Time">
            {dateFormat(info?.starttime) || "TBA"} ～{" "}
            {dateFormat(info?.enttime) || "TBA"}
          </WhitelistStageLine>
        </WhitelistStageLineBox>
      </WhitelistStageCardBox>
      <Spaced size="40" />
      <WhitelistStageProgress
        total={info?.tokennumber || 0}
        num={info?.totalPersonPurchased || 0}
      />
      <Spaced size="100" />
      <WhitelistStageLineBox
        style={{ justifyContent: "space-between", gap: 0 }}>
        <WhitelistStageFooterItem>
          <WhitelistStageInputBox
            placeholder="0"
            disabled={maxAmount <= 0 || inputLoad}
            value={value}
            onChange={onChangeInput}
            onMax={onMax}
          />
          <FooterTextLineBox>
            <div className="g">
              Total Pay
              <TextTooltip arrow title={TotalPayText}>
                <div>
                  <HelpIcon width={24} />
                </div>
              </TextTooltip>
            </div>
            
          </FooterTextLineBox>
        </WhitelistStageFooterItem>
        <WhitelistStageFooterItem>
          <WhitelistStageButton
            hposa={hposa}
            mposa={mposa}
            fileSize={fileSize}
            transferfee={Transferfee}
            isLimit={isLimit}
            isWhiteInfo={isWhiteInfo}
            price={priceBig}
            detail={detail}
            info={info}
            buyAmount={value}
            satoshis={satoshis}
            stage={stage}
            reload={readData}
            callback={callbackSuccess}
          />
          <FooterTextLineBox>
            <span className="g">Balance</span>
            <span>
              {getFullDisplayBalance(balance.confirmed, 8) || 0} {info.projectcurrency}
            </span>
          </FooterTextLineBox>
        </WhitelistStageFooterItem>
      </WhitelistStageLineBox>
      <Spaced size="24" />
    </WhitelistStageBox>
  )
}
export default WhitelistStageFT

const SizeBox=styled.div`
  display: flex;
  gap: 10px;
`
const TipTitleBox = styled.div<{width?:string}>`
  max-width: ${({width})=>width || '345px'};
  font-family: Montserrat, Montserrat;
  font-weight: 300;
  font-size: 20px;
  color: #c2c5c8;
  line-height: 26px;
  text-align: left;
`
const FooterTextLineBox = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  line-height: 24px;
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    display: flex;
    gap: 12px;
  }
  .g {
    color: #6f6f76;
  }
  span {
    color: #f7931a;
  }
`
const WhitelistStageFooterItem = styled.div``
const WhitelistStageInputBox = styled(Input)`
  width: 520px;
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
