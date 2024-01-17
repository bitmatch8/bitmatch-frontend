import Button from "@/components/Button"
import styled from "@emotion/styled"
import { useEffect, useMemo, useState } from "react"
import TimeCountdown from "@/components/TimeCountdown"
import { ConnectModal } from "@/components/Page/TopBar/ConnectButton"
import useModal from "@/hook/useModal"
import { fetchQueryByWhitelist, fetchSelectFaddress } from "@/api/api"
import {
  useSelector,
  useDispatch,
  selectWallter,
  connectUnisat,
  buySubmitAsync,
  selectBuy,
  addToast,
} from "@/lib/redux"
import { parseFixedAmount } from "@/utils/formatBalance"
import Notice from "../Notice"

const WhitelistStageButton: React.FC<{
  price:any,
  info: any
  detail: any
  callback: any
  satoshis: any
  buyAmount: any
  stage: any
}> = ({ info, detail, callback, satoshis, buyAmount, stage,price }) => {
  const dispatch = useDispatch()
  const { connected, address } = useSelector(selectWallter)
  const { status } = useSelector(selectBuy)
  const [disabled, setDisabled] = useState(true)
  const [buttonText,setButtonText]=useState('Buy')
  const [toAddress,setToAddress]=useState('')
  const [onConnect, onDismiss] = useModal(
    <ConnectModal
      onDismiss={() => onDismiss()}
      connect={() => {
        dispatch(connectUnisat())
        onDismiss()
      }}></ConnectModal>
  )
  const isWhiteUser = async () => {
    //如果是白名单查询这里做判断是否禁用按钮
    if(!address){
      return
    }
    if (stage === "whitelist") {
      const {code, data} = await fetchQueryByWhitelist({
        pid: detail.id,
        address,
      })
      if (code === 0) {
        setDisabled(data === 0)
        setButtonText(data === 0 ? 'Not in whitelist' : 'Buy')
      }
    } else {
      setDisabled(false)
    }
  }
  //这里写收款地址逻辑。没写完，如果是白名单，查询用户是否在白名单
  const initAddress = async () => {

    const { code, data } = await fetchSelectFaddress({ pid: detail.id })
    if (code === 0) {
      setToAddress(data)
    }
  }
  useEffect(() => {
    isWhiteUser()
    initAddress()
  }, [detail, address,stage])
  const onCLickBuy = () => {
    if(!buyAmount){
      dispatch(addToast({
        contxt: "Please enter the quantity",
        icon:'warning'
      })) 
      return
    }
    if (status === "idle" && buyAmount && disabled === false && toAddress ) {
      dispatch(
        buySubmitAsync({
          price:price.toString(),
          projectname: detail.projectname,
          type: detail.projecttype,
          tokenname: detail.projecttokenname,
          fromaddr: address,
          fundaddr: toAddress,
          stage,
          receivedAddr: address,
          amount: satoshis,
          transmitAddr: '',
          pid: detail.id,
          buyAmount,
          toAddress,
          satoshis,
          callback,
        })
      )
    }
  }
  const endtime = new Date(info.enttime)
  const starttime = new Date(info.starttime)

  const NotStarted = useMemo(
    () => starttime.getTime() > Date.now(),
    [starttime]
  )

  if (!connected) {
    return (
      <WhitelistStageButtonBox onClick={onConnect}>
        Connect Wallet
      </WhitelistStageButtonBox>
    )
  }
  if (NotStarted) {
    return (
      <WhitelistStageButtonBox>
        <TimeCountdown onComplete={callback} deadline={new Date(info.starttime)} />
      </WhitelistStageButtonBox>
    )
  } else if (endtime.getTime() < Date.now()) {
    return <WhitelistStageButtonBox disabled>Ended</WhitelistStageButtonBox>
  } else if (starttime.getTime() < Date.now()) {
    return (
      <WhitelistStageButtonBox
        disabled={status === "loading" || disabled}
        isLoading={status === "loading"}
        onClick={onCLickBuy}>
          {buttonText}
      </WhitelistStageButtonBox>
    )
  }
  return <div></div>
}

export default WhitelistStageButton

const WhitelistStageButtonBox = styled(Button)`
  width: 420px;
  height: 120px;
  border-radius: 24px;

  font-size: 36px;
  font-weight: 600;
  color: #ffffff;
  line-height: 36px;
`
