import Button from "@/components/Button"
import styled from "@emotion/styled"
import { useMemo, useState } from "react"
import TimeCountdown from "@/components/TimeCountdown"
import { ConnectModal } from "@/components/Page/TopBar/ConnectButton"
import useModal from "@/hook/useModal"
import { fetchOrderlistIsRepeated, fetchSelectFaddress } from "@/api/api"
import {
  useSelector,
  useDispatch,
  selectWallter,
  connectUnisat,
  buySubmitAsync,
  selectBuy,
  addToast,
  WallterType,
} from "@/lib/redux"
import { toLocalTime } from "@/utils"
import useSwr from "@/hook/useSwr"
import refreshConfig from "@/utils/config"

const WhitelistStageButton: React.FC<{
  price: any
  info: any
  detail: any
  callback: any
  satoshis: any
  buyAmount: any
  stage: any
  reload: any
  isLimit: boolean
  isWhiteInfo: any
  mposa: any
  hposa: any
}> = ({
  info,
  detail,
  callback,
  satoshis,
  buyAmount,
  stage,
  price,
  reload,
  isLimit,
  isWhiteInfo,
  hposa,
  mposa,
}) => {
  const dispatch = useDispatch()
  const { address } = useSelector(selectWallter)
  const { status, refresh_opt } = useSelector(selectBuy)
  const [loading,setLoading]=useState(false)
  const { result: toAddress } = useSwr(
    { pid: detail.id },
    fetchSelectFaddress,
    {}
  )
  const disabled = useMemo(() => {
    if (toAddress === null) {
      return true
    }
    return stage === "whitelist" && (isWhiteInfo === null || isWhiteInfo === 0)
  }, [isWhiteInfo, stage, toAddress])



  const buttonText = useMemo(() => {
    if (isWhiteInfo === 0 && stage === "whitelist") {
      return "Not in whitelist"
    } else if (
      (stage === "whitelist" && isWhiteInfo === null) ||
      toAddress === null
    ) {
      return "Loading"
    }
    return !isLimit ? "Buy" : "Claim"
  }, [isWhiteInfo, toAddress])

  const [onConnect, onDismiss] = useModal(
    <ConnectModal
      onDismiss={() => onDismiss()}
      connect={(type: WallterType) => {
        dispatch(connectUnisat(type))
        onDismiss()
      }}></ConnectModal>
  )

  const onCLickBuy = async () => {
    if (status === "idle" && buyAmount && disabled === false && toAddress) {
      if (Number(mposa) > Number(buyAmount)) {
        dispatch(
          addToast({
            contxt: "Below minimum limit",
            icon: "warning",
          })
        )
        return
      }
      if (Number(hposa) < Number(buyAmount)) {
        dispatch(
          addToast({
            contxt: "Maximum purchase limit exceeded",
          })
        )
        return
      }
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
        moveLoading:()=>{
          setLoading(isLimit)
          setTimeout(() => {
            setLoading(false)
          }, refreshConfig.submit_order_refreshInterval);
        },
        reload: !isLimit ? () => 0 : async ()=>fetchOrderlistIsRepeated({
          "stage": stage,
          "pid": detail?.id,
          "fromaddr": address,
          buyAmount:buyAmount
        }).then(({ code }) => code),
        callback,
      }
      dispatch(buySubmitAsync(params))
    }
  }
  const endtime = toLocalTime(info?.enttime)
  const starttime = toLocalTime(info.starttime)
  const NotStarted = useMemo(
    () => starttime.getTime() > Date.now(),
    [starttime]
  )
  const isSoldOut = useMemo(
    () =>
      Number(info?.singlePersonPurchased) >= Number(hposa || 0) ||
      Number(info?.tokennumber || 0) <= Number(info?.totalPersonPurchased || 0),
    [info, hposa]
  )
  const isClaimed = useMemo(
    () => isLimit && Number(info?.singlePersonPurchased) >= Number(hposa),
    [hposa, info]
  )
  // console.log(isLimit , Number(info?.singlePersonPurchased) , Number(hposa))
  // if (network && network !== process.env.NEXT_PUBLIC_NETWORK && wallterType !== 'okx') {
  //   return (
  //     <WhitelistStageButtonBox onClick={onConnect}>
  //       Switch Network
  //     </WhitelistStageButtonBox>
  //   )
  // }
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
  } else if (isClaimed) {
    return <WhitelistStageButtonBox disabled>Claimed</WhitelistStageButtonBox>
  } else if (isSoldOut) {
    return <WhitelistStageButtonBox disabled>Sold out</WhitelistStageButtonBox>
  } else if (starttime.getTime() < Date.now()) {
    return (
      <WhitelistStageButtonBox
        disabled={status === "loading" || disabled || loading}
        isLoading={status === "loading" || loading}
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
