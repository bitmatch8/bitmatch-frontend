/** @type {import('next').NextConfig} */
import { Spaced } from "@/components/Spaced"
import TokenSymbol from "@/components/TokenSymbol"
import { BigNumber } from "@ethersproject/bignumber"
import styled from "@emotion/styled"
import React, { useEffect, useMemo, useState } from "react"
import Input from "@/components/Input"
import { formatUnitsAmount, parseFixedAmount } from "@/utils/formatBalance"
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

  const tipText = (
    <TipTitleBox>
      <p>
        Users need to pay the cost for the burning and transfer transactions
        included in FT orders, which is determined by the characteristics of the
        Ordinals protocol.
      </p>
      <p>The larger the bytes a transaction contains, the higher the cost.</p>
    </TipTitleBox>
  )
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
  const price = useMemo(() => {
    return Number(
      (Number(info.targetnumber || 0) / Number(info.tokennumber || 0)).toFixed(
        8
      )
    )
  }, [info, fees])

  const isTest = useMemo(
    () => process.env.NEXT_PUBLIC_TEST === "test",
    [process.env]
  )
  const initFees = async () => {
    if (isTest) {
      setFees(1)
    } else {
      const fees = await fetchFeesApi()
      setFees(fees?.fastestFee || 0)
    }
  }
  useEffect(() => {
    initFees()
  }, [isTest])
  const priceBig = useMemo(() => {
    return parseFixedAmount(String(price), 8)
  }, [info, price])
  const satoshis = useMemo(() => {
    if (isLimit) {
      return ((fees + 1) * 550 * 1.1).toFixed(0)
    }
    return priceBig.mul(BigNumber.from(value || 0)).toString()
  }, [priceBig, fees, isLimit, value])

  return (
    <WhitelistStageBox>
      <WhitelistStageTitleBox>{title}</WhitelistStageTitleBox>
      <WhitelistStageCardBox>
        <WhitelistStageLineBox>
          <WhitelistStageLine title="Token Name">
            {detail?.projecttokenname}
            {/* <TextTooltip arrow title={tipText}>
              <div>
             <HelpIcon width={24}/>
             </div> 
            </TextTooltip> */}
          </WhitelistStageLine>
          <WhitelistStageLine title="Total Supply">
            {info?.tokennumber} {detail?.projecttokenname}
          </WhitelistStageLine>
        </WhitelistStageLineBox>
        <WhitelistStageLineBox>
          <WhitelistStageLine mark="" title={<SizeBox>
             Size: 
              <TextTooltip arrow title={tipText}>
                <div>
                  <HelpIcon width={24} />
                </div>
              </TextTooltip>
            </SizeBox>}>
            {/* <TokenSymbol size={22} symbol={info.projectcurrency} /> */}
            <span>{Number(detail.size)} vB</span>
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
              <TextTooltip arrow title={tipText}>
                <div>
                  <HelpIcon width={24} />
                </div>
              </TextTooltip>
            </div>

            {/* <div>
              <span>{value || 0}</span> {detail?.projecttokenname}
            </div> */}
          </FooterTextLineBox>
        </WhitelistStageFooterItem>
        <WhitelistStageFooterItem>
          <WhitelistStageButton
            hposa={hposa}
            mposa={mposa}
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
              {formatUnitsAmount(balance.confirmed, 8)} {info.projectcurrency}
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
const TipTitleBox = styled.div`
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
