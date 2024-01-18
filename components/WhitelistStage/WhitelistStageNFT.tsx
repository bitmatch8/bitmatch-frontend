import ImgBox from "@/components/ImgBox"
import { Spaced } from "@/components/Spaced"
import { BigNumber } from "@ethersproject/bignumber"
import TokenSymbol from "@/components/TokenSymbol"
import NFTSHOWImg from "@/assets/img/nft_show.png"
import styled from "@emotion/styled"
import { useMemo } from "react"
import Input from "@/components/Input"
import ValueSkeleton from "@/components/ValueSkeleton"
import { formatUnitsAmount, parseFixedAmount } from "@/utils/formatBalance"
import WhitelistStageButton from "@/components/WhitelistStageButton"
import WhitelistStageProgress from "@/components/WhitelistStageProgress"
import WhitelistStageLine from "@/components/WhitelistStageLine"
import useBuy from "@/hook/useBuy"
import { dateFormat } from "@/utils"

const WhitelistStageNFT: React.FC<{
  detail: any
  info: any
  balance: any
  title: string
  stage: any
  readData: any
}> = ({ info, balance, title, detail, stage, readData }) => {
  const { value, onChangeInput, callbackSuccess, onMax } = useBuy(
    info,
    readData
  )
  const price = useMemo(() => {
    // console.log(parseFixedAmount(info.targetnumber,8))
    
    return parseFixedAmount(info.targetnumber,8)
    // return BigNumber.from(String(info.targetnumber || 0))
  }, [info])
  const satoshis = useMemo(() => {
    return price.mul(BigNumber.from(value || 0)).toString()
  }, [price, value])


  return (
    <WhitelistStageBox>
      <WhitelistStageTitleBox>{title}</WhitelistStageTitleBox>
      <WhitelistStageCardBox style={{ flexDirection: "row", gap: 60 }}>
        <WhitelistStageItemBox style={{ flex: 1 }}>
          <WhitelistStageLine title="Whitelist Amount">
            {info?.tokennumber}
          </WhitelistStageLine>
          <WhitelistStageLine title="Price">
            <TokenSymbol size={22} symbol={info?.projectcurrency} />
            <span>{info?.targetnumber}</span>
          </WhitelistStageLine>
          <WhitelistStageLine title="Minimum Limit">
            {info?.mposa}
          </WhitelistStageLine>
          <WhitelistStageLine title="Maximum Limit">
            {info?.hposa}
          </WhitelistStageLine>
          <WhitelistStageLine title="Launch Time">
            {info === null ? (
              <ValueSkeleton width={200} height={50} />
            ) : (
              <div>
                <div>{dateFormat(info?.starttime)}</div>
                <div style={{ marginTop: 20 }}>{dateFormat(info?.enttime)}</div>
              </div>
            )}
          </WhitelistStageLine>
        </WhitelistStageItemBox>
        <WhitelistStageItemBox>
          <ImgBox alt="" src={NFTSHOWImg} width={388} />
        </WhitelistStageItemBox>
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
            onMax={onMax}
            onChange={onChangeInput}
          />
          <FooterTextLineBox>
            <div>
              <span>{value || 0}</span> {detail?.projecttokenname}
            </div>
          </FooterTextLineBox>
        </WhitelistStageFooterItem>
        <WhitelistStageFooterItem>
          <WhitelistStageButton
            price={price}
            detail={detail}
            info={info}
            satoshis={satoshis}
            buyAmount={value}
            stage={stage}
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
export default WhitelistStageNFT

const FooterTextLineBox = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  line-height: 24px;
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
