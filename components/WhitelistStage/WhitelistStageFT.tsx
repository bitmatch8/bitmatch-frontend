import { Spaced } from "@/components/Spaced"
import TokenSymbol from "@/components/TokenSymbol"
import styled from "@emotion/styled"
import { useMemo, useState } from "react"
import Input from "@/components/Input"
import { formatUnitsAmount, parseFixedAmount } from "@/utils/formatBalance"
import WhitelistStageButton from "@/components/WhitelistStageButton"
import WhitelistStageProgress from "@/components/WhitelistStageProgress"
import WhitelistStageLine from "@/components/WhitelistStageLine"
import { addToast, useDispatch } from "@/lib/redux"
import Notice from "../Notice"
import { BigNumber } from "@ethersproject/bignumber"

const WhitelistStageFT: React.FC<{
  detail: any
  info: any
  balance: any
  title: string
  stage:any
}> = ({ info, balance, title, detail,stage }) => {
  console.log({stage})
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
  const price = useMemo(()=>Number((Number(info.targetnumber) / Number(info.tokennumber)).toFixed(8)),[info])
  const priceBig = useMemo(()=>{
    return parseFixedAmount(String(price),9)
  },[info,price])
 

  const callbackSuccess=()=>{
    setValue('')
    dispatch(
      addToast({
        contxt: (
          <Notice icon='success' text="success" />
        ),
      })
    )
  }
  const satoshis=useMemo(()=>{
    return priceBig.mul(BigNumber.from(value || 0)).toString()
  },[priceBig,value])
  console.log({info,price:price.toString(),satoshis:satoshis.toString(),priceBig})
  return (
    <WhitelistStageBox>
      <WhitelistStageTitleBox>{title}</WhitelistStageTitleBox>
      <WhitelistStageCardBox>
        <WhitelistStageLineBox>
          <WhitelistStageLine title="Token Name">
            {detail?.projecttokenname}
          </WhitelistStageLine>
          <WhitelistStageLine title="Total Shares">
            {info?.tokennumber}  {detail?.projecttokenname}
          </WhitelistStageLine>
        </WhitelistStageLineBox>
        <WhitelistStageLineBox>
          <WhitelistStageLine title="Total Fundraising Amount">
            <TokenSymbol size={22} symbol={info.projectcurrency} />
            <span>{Number(price)}</span>
          </WhitelistStageLine>
          <WhitelistStageLine title="Price">
            {Number(price)} {info.projectcurrency} / {detail?.projecttokenname}
          </WhitelistStageLine>
        </WhitelistStageLineBox>
        <WhitelistStageLineBox>
          <WhitelistStageLine title="Minimum Limit">
            {info?.mposa} {detail?.projecttokenname}
          </WhitelistStageLine>
          <WhitelistStageLine title="Maximum Limit">
            {info?.hposa} {detail?.projecttokenname}
          </WhitelistStageLine>
        </WhitelistStageLineBox>
        <WhitelistStageLineBox>
          <WhitelistStageLine
            style={{ flex: 1, paddingLeft: 16 }}
            title="Launch Time">
            {info?.starttime} ～ {info?.enttime}
          </WhitelistStageLine>
        </WhitelistStageLineBox>
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
          <FooterTextLineBox>
           <div>
          <span>{value || 0}</span> {detail?.projecttokenname}
           </div>
          </FooterTextLineBox>
        </WhitelistStageFooterItem>
        <WhitelistStageFooterItem>
          <WhitelistStageButton price={price} detail={detail} info={info} buyAmount={value} satoshis={satoshis} stage={stage} callback={callbackSuccess} />
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
export default WhitelistStageFT

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
  span{
    color:#F7931A ;
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
