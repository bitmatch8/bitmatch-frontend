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
import { ProjectType } from "@/utils/types"
import { toLocalTime } from "@/utils"

const WhitelistStageButton: React.FC<{
  price: any
  info: any
  detail: any
  callback: any
  satoshis: any
  buyAmount: any
  stage: any
  reload:any
}> = ({ info, detail, callback, satoshis, buyAmount, stage, price,reload }) => {
  const dispatch = useDispatch()
  const { connected, address } = useSelector(selectWallter)
  const { status } = useSelector(selectBuy)
  const [disabled, setDisabled] = useState(true)
  const [buttonText, setButtonText] = useState("Loading")
  const [toAddress, setToAddress] = useState("")
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
    if (!address) {
      return
    }
    if (stage === "whitelist") {
      const { code, data } = await fetchQueryByWhitelist({
        pid: detail.id,
        address,
      })
      if (code === 0) {
        setDisabled(data === 0)
        setButtonText(data === 0 ? "Not in whitelist" : "Buy")
      }
    } else {
      setButtonText('Buy')
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

  const setStep=(hash:string,num:number)=>{
      setButtonText(`Buy(${num}/${buyAmount})`)
  }

  
  // const minAmount = useMemo(() => {
  //   return mposa
  // }, [mposa])
  // const maxAmount = useMemo(() => {
  //   const maxNum = hposa - singlePersonPurchased
  //   return maxNum > availableAmount ? availableAmount : maxNum
  // }, [hposa, singlePersonPurchased, availableAmount])


  const onCLickBuy = async () => {
    setDisabled(true)
    const res_data = await reload()
    setDisabled(false)
    if (!buyAmount) {
      dispatch(
        addToast({
          contxt: "Please enter the quantity",
          icon: "warning",
        })
      )
      return
    }
    if(res_data){
      const availableAmount = (res_data?.tokennumber || 0) - (res_data?.totalPersonPurchased || 0)
      if(!availableAmount){
        dispatch(addToast({
          contxt:'Maximum purchase limit exceeded'
        }))
        return
      }
      if (status === "idle" && buyAmount && disabled === false && toAddress) {
        const params = {
          price: price.toString(),
          projectname: detail.projectname,
          type: detail.projecttype,
          tokenname: detail.projecttokenname,
          fromaddr: address,
          fundaddr: toAddress,
          stage,
          receivedAddr: address,
          amount: satoshis,
          transmitAddr: "",
          pid: detail.id,
          buyAmount,
          toAddress,
          satoshis,
          callback:()=>{
            setButtonText('Buy')
            callback()
          },
          setStep
        }
        dispatch(buySubmitAsync(params))
      }
    }
    
  }
  const endtime = toLocalTime(info.enttime)
  const starttime = toLocalTime(info.starttime)

  const NotStarted = useMemo(
    () => starttime.getTime() > Date.now(),
    [starttime]
  )

  useEffect(() => {
    isWhiteUser()
    initAddress()
  }, [detail, address, stage])
 
  if (!address) {
    return (
      <WhitelistStageButtonBox onClick={onConnect}>
        Connect Wallet
      </WhitelistStageButtonBox>
    )
  }
  if (NotStarted) {
    return (
      <WhitelistStageButtonBox>
        <TimeCountdown
          onComplete={callback}
          deadline={toLocalTime(info.starttime)}
        />
      </WhitelistStageButtonBox>
    )
  } else if (endtime.getTime() < Date.now()) {
    return <WhitelistStageButtonBox disabled>Ended</WhitelistStageButtonBox>
  }else if(Number(info?.totalPersonPurchased) >= Number(info?.tokennumber)){
return <WhitelistStageButtonBox disabled>Sold out</WhitelistStageButtonBox>
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
