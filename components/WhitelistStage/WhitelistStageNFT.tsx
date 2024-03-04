/** @type {import('next').NextConfig} */
import ImgBox from "@/components/ImgBox"
import { Spaced } from "@/components/Spaced"
import { BigNumber } from "@ethersproject/bignumber"
import TokenSymbol from "@/components/TokenSymbol"
import styled from "@emotion/styled"
import { useMemo } from "react"
import Input from "@/components/Input"
import ValueSkeleton from "@/components/ValueSkeleton"
import {
  getFullDisplayBalance,
  parseFixedAmount,
} from "@/utils/formatBalance"
import WhitelistStageButton from "@/components/WhitelistStageButton"
import WhitelistStageProgress from "@/components/WhitelistStageProgress"
import WhitelistStageLine from "@/components/WhitelistStageLine"
import useBuy from "@/hook/useBuy"
import { dateFormat } from "@/utils"
import TextTooltip from "../TextTooltip"
import HelpIcon from "../Svg/HelpIcon"
import { VirtualBytesConfig } from "@/utils/config"

const WhitelistStageNFT: React.FC<{
  detail: any
  info: any
  balance: any
  title: string
  stage: any
  readData: any
}> = ({ info, balance, title, detail, stage, readData }) => {
  // const [fees, setFees] = useState(0)
  const {
    value,
    inputLoad,
    onChangeInput,
    callbackSuccess,
    onMax,
    maxAmount,
    isWhiteInfo,
    isLimit,
    mposa,
    hposa,
    fees,
    fetchFees,
  } = useBuy(info, readData, detail, stage)

  const price = useMemo(() => {
    return parseFixedAmount(info.targetnumber || 0, 8)
  }, [info, stage, fees])

  const fileSize = useMemo(() => {
    return Number(detail.size || 550)
  }, [detail])

  const NetworkFee = useMemo(() => {
    return fees ? (fees * VirtualBytesConfig.NFT) : 0
  }, [value, fees, fileSize])

  const calcFees = (fees: any) => {
    return (value || 0) * Number(Math.ceil(fees * fileSize * 1.3))
  }
  const calcSatoshis=(Transferfee:any)=>{
    if (isLimit) {
      return Transferfee
    }
    return price
      .mul(BigNumber.from(value || 0))
      .add(BigNumber.from(Transferfee))
      .toString()
  }
  /**
   * Value =price*value
   * Mint & Transfer fees = size * fees * 1.3 * (nft = value | ft=1)
   * Network Fee (Standard) = fees
   * Total Pay = value + transfer fees + network fee
   */
  const Transferfee = useMemo(() => {
    return calcFees(fees) || 0
  }, [value, price, fees, fileSize])

  const satoshis = useMemo(() => {
    return calcSatoshis(Transferfee)
  }, [price, value, fees, isLimit, Transferfee])

  const TotalFees = useMemo(() => {
    return BigNumber.from(satoshis || 0)
      .add(BigNumber.from(NetworkFee))
      .toString()
  }, [NetworkFee, satoshis, Transferfee])

  const PayValue = useMemo(() => {
    return value * Number(price)
  }, [value, price])

  const HelpTipText = useMemo(
    () => (
      <TipTitleBox>
        <p>
          Users need to pay costs for the minting and transfer transactions
          included in the NFT order
        </p>
        <p>The larger the bytes a transaction contains, the higher the cost.</p>
      </TipTitleBox>
    ),
    []
  )

  const TotalPayText = useMemo(() => {
    return (
      <TipTitleBox width="450px">
        <p>
          <span>Value({value | 0})</span>{" "}
          <span>{PayValue ? getFullDisplayBalance(PayValue, 8) : 0} BTC</span>
        </p>
        <p>
          <span>Mint & Transfer fees({value | 0})</span>{" "}
          <span>
            {Transferfee ? getFullDisplayBalance(Transferfee, 8) : 0} BTC
          </span>
        </p>
        <p>
          <span>Network Fee (Standard)</span>{" "}
          <span>
            {NetworkFee ? `~${getFullDisplayBalance(NetworkFee, 8)}` : 0} BTC
          </span>
        </p>
        <p style={{fontWeight:500}}>
          <span>Total Pay</span>{" "}
          <span>{TotalFees ? `~${getFullDisplayBalance(TotalFees, 8)}` : 0} BTC</span>
        </p>
      </TipTitleBox>
    )
  }, [Transferfee, NetworkFee, TotalFees, value])

  return (
    <WhitelistStageBox>
      <WhitelistStageTitleBox>{title}</WhitelistStageTitleBox>
      <WhitelistStageCardBox style={{ flexDirection: "row", gap: 60 }}>
        <WhitelistStageItemBox style={{ flex: 1 }}>
          {/* <WhitelistStageLine title={DetailInfoType.public === String(info.type) ? 'Total Supply':'Whitelist Amount'}> */}
          <WhitelistStageLine title="Total Supply">
            {info?.tokennumber}
          </WhitelistStageLine>
          <WhitelistStageLine title="Price">
            <TokenSymbol size={22} symbol={info?.projectcurrency} />
            <span>{info?.targetnumber}</span>
          </WhitelistStageLine>
          <WhitelistStageLine
            mark=""
            title={
              <SizeBox>
                Size:
                <TextTooltip arrow title={HelpTipText}>
                  <div>
                    <HelpIcon width={24} />
                  </div>
                </TextTooltip>
              </SizeBox>
            }>
            {" "}
            <span>{Number(fileSize)} vB</span>
          </WhitelistStageLine>
          <WhitelistStageLine title="Minimum Limit">{mposa}</WhitelistStageLine>
          <WhitelistStageLine title="Maximum Limit">{hposa}</WhitelistStageLine>
          <WhitelistStageLine title="Launch Time">
            {info === null ? (
              <ValueSkeleton width={200} height={50} />
            ) : (
              <div style={{ textAlign: "right" }}>
                <div>{dateFormat(info?.starttime) || "TBA"}</div>
                <div>～</div>
                <div>{dateFormat(info?.enttime) || "TBA"}</div>
              </div>
            )}
          </WhitelistStageLine>
        </WhitelistStageItemBox>
        <WhitelistStageItemImgBox>
          <ImgBox
            alt=""
            src={`data:image/jpeg;base64,${detail.projectnft}`}
            width={388}
            height={388}
          />
        </WhitelistStageItemImgBox>
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
            value={value}
            disabled={maxAmount <= 0 || inputLoad}
            onMax={onMax}
            onChange={onChangeInput}
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
            isLimit={isLimit}
            fileSize={fileSize}
            mposa={mposa}
            hposa={hposa}
            isWhiteInfo={isWhiteInfo}
            price={price}
            fetchData={async () => {
              const { data } = await fetchFees()
              const handlingfee= calcFees(data)
              const satoshis=calcSatoshis(handlingfee)
              const amount=calcSatoshis(0)
              return {handlingfee,satoshis,amount}
            }}
            detail={detail}
            info={info}
            satoshis={satoshis}
            buyAmount={value}
            stage={stage}
            reload={readData}
            callback={callbackSuccess}
          />
          <FooterTextLineBox>
            <span className="g">Balance</span>
            <span>
              {getFullDisplayBalance(balance.confirmed, 8) || 0}{" "}
              {info.projectcurrency}
            </span>
          </FooterTextLineBox>
        </WhitelistStageFooterItem>
      </WhitelistStageLineBox>
      <Spaced size="24" />
    </WhitelistStageBox>
  )
}
export default WhitelistStageNFT

const SizeBox = styled.div`
  display: flex;
  gap: 10px;
`
const TipTitleBox = styled.div<{ width?: string }>`
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
  span {
    color: #f7931a;
  }
  .g {
    color: #6f6f76;
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

const WhitelistStageItemImgBox = styled.div`
  display: flex;
  gap: 50px;
  align-items: center;
  justify-content: center;
`
