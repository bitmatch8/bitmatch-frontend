import ImgBox from "@/components/ImgBox"
import { Spaced } from "@/components/Spaced"
import TokenSymbol from "@/components/TokenSymbol"
import NFTSHOWImg from "@/assets/img/nft_show.png"
import styled from "@emotion/styled"
import { useMemo, useState } from "react"
import Input from "@/components/Input"
import ValueSkeleton from "@/components/ValueSkeleton"
import { formatUnitsAmount, getFullDisplayBalance } from "@/utils/formatBalance"
import WhitelistStageButton from "@/components/WhitelistStageButton"
import WhitelistStageProgress from "@/components/WhitelistStageProgress"
import WhitelistStageLine from "@/components/WhitelistStageLine"
import {
  useSelector,
  useDispatch,
  selectWallter,
  connectUnisat,
  buySubmitAsync,
  selectBuy,
  addToast,
} from "@/lib/redux"
import Notice from "../Notice"

const WhitelistStageNFT: React.FC<{
  detail: any
  info: any
  balance: any
  title: string,
  stage:any,
}> = ({ info, balance, title,detail,stage }) => {
  const dispatch=useDispatch()
  const [value, setValue] = useState("")
  const onChangeInput = (e: any) => {
    let { value } = e.target
    // const reg = /^-?\d*(\.\d*)?$/;
    const reg = /^-?\d*?$/
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      // if (value > Number(getDisplayBalance(pageobj.maxVal))) {
      //   value = Number(getDisplayBalance(pageobj.maxVal))
      // }
      setValue(value)
    }
  }
  const price = useMemo(()=>{
    return formatUnitsAmount(info.targetnumber,9)
  },[info])
  // const price = Number(
  //   (Number(info.targetnumber) / Number(info.tokennumber)).toFixed(8)
  // )
  const callbackSuccess=()=>{
    setValue('')
    dispatch(
      addToast({
        contxt: (
          <Notice icon='success' text="Success" />
        ),
      })
    )
  }
  const satoshis=useMemo(()=>{
    return Number(info.targetnumber) * Number((value || 0))
  },[price,value])

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
                <div>{info?.starttime}</div>
                <div style={{ marginTop: 20 }}>{info?.enttime}</div>
              </div>
            )}
          </WhitelistStageLine>
        </WhitelistStageItemBox>
        <WhitelistStageItemBox>
          <ImgBox alt="" src={NFTSHOWImg} width={388} />
        </WhitelistStageItemBox>
      </WhitelistStageCardBox>
      <Spaced size="40" />
      <WhitelistStageProgress total={info?.tokennumber || 0} num={info?.totalPersonPurchased || 0} />
      <Spaced size="100" />
      <WhitelistStageLineBox
        style={{ justifyContent: "space-between", gap: 0 }}>
        <WhitelistStageFooterItem>
          <WhitelistStageInputBox
            placeholder="0"
            value={value}
            onChange={onChangeInput}
          />
          <FooterTextLineBox><div><span>{value || 0}</span>  {detail?.projecttokenname}</div></FooterTextLineBox>
        </WhitelistStageFooterItem>
        <WhitelistStageFooterItem>
          <WhitelistStageButton price={price} detail={detail} info={info} satoshis={satoshis} buyAmount={value} stage={stage} callback={callbackSuccess} />
          <FooterTextLineBox>
            <span className="g">Balance</span>
            <span>{formatUnitsAmount(balance.confirmed, 8)} {info.projectcurrency}</span>
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
  span{
    color:#F7931A ;
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
