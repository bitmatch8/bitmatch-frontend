/** @type {import('next').NextConfig} */
import { Spaced } from "@/components/Spaced"
import { BigNumber } from "@ethersproject/bignumber"
import styled from "@emotion/styled"
import React, { useMemo } from "react"
import Input from "@/components/Input"
import { getFullDisplayBalance, parseFixedAmount } from "@/utils/formatBalance"
import WhitelistStageButton from "@/components/WhitelistStageButton"
import WhitelistStageProgress from "@/components/WhitelistStageProgress"
import WhitelistStageLine from "@/components/WhitelistStageLine"
import useBuy from "@/hook/useBuy"
import { dateFormat } from "@/utils"
import HelpIcon from "../Svg/HelpIcon"
import TextTooltip from "../TextTooltip"
import { VirtualBytesConfig } from "@/utils/config"


const WhitelistStageFT: React.FC<{
  detail: any
  info: any
  balance: any
  title: string
  stage: any
  readData: any
}> = ({ info, balance, title, detail, stage, readData }) => {
  
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
    fees,
    fetchFees
  } = useBuy(info, readData, detail, stage)

  const price = useMemo(() => {
    return info.targetnumber
  }, [info, stage, fees])

  const priceBig = useMemo(() => {
    return parseFixedAmount(String(price), 8)
  }, [info, price])

  const fileSize=useMemo(()=>{
    return Number(detail.size || 550)
  },[detail])

  const NetworkFee = useMemo(() => {
    return fees ? (fees * VirtualBytesConfig.FT) : 0
  }, [value, fees, fileSize])
  const calcFees=(fees:any)=>{
    return value ?  Number(Math.ceil(((fees ) * fileSize * 1.3))) : 0
  }
  const calcSatoshis=(Transferfee:any)=>{
    return priceBig.mul(BigNumber.from(value || 0)).add(BigNumber.from(Transferfee)).toString()
  }
  /**
   * Value =price*value
   * Mint & Transfer fees = size * fees * 1.3 * (nft = value | ft=1)
   * Network Fee (Standard) = fees
   * Total Pay = value + transfer fees + network fee
   */
  const Transferfee = useMemo(() => {
    return calcFees(fees) 
  }, [value, price,fees,fileSize,value])

  const satoshis = useMemo(() => {
    if (isLimit){
      return Transferfee
    }
    return calcSatoshis(Transferfee)
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
      <TipTitleBox width="450px">
        <p>
          <span>Value</span> <span>{PayValue ? PayValue : 0} BTC</span>
        </p>
        <p>
          <span>Inscribe & Transfer fees</span> <span>{Transferfee ? getFullDisplayBalance(Transferfee, 8) : 0} BTC</span>
        </p>
        <p><span>Network Fee (Standard)</span> <span>{NetworkFee ? `~${getFullDisplayBalance(NetworkFee, 8)}` : 0} BTC</span></p>
        <p style={{fontWeight:500}}><span>Total Pay</span> <span>{TotalFees ? `~${getFullDisplayBalance(TotalFees, 8)}`:0} BTC</span></p>
      </TipTitleBox>
    )
  }, [Transferfee, NetworkFee, TotalFees,PayValue])

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
            fetchData={async () => {
              const { data } = await fetchFees()
              const handlingfee= calcFees(data)
              const satoshis=calcSatoshis(handlingfee)
              const amount=calcSatoshis(0)
              return {handlingfee,satoshis,amount}
            }}
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
  width: ${({ width }) => width || "345px"};
  font-family: 'Montserrat Light';
  font-weight: 300;
  font-size: 20px;
  color: #c2c5c8;
  line-height: 26px;
  text-align: left;
  p {
    /* padding: 0;
    margin: 0; */
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
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
