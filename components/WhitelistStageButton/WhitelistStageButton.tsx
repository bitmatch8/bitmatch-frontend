import Button from "@/components/Button"
import styled from "@emotion/styled"
import { useMemo } from "react"
import TimeCountdown from "@/components/TimeCountdown"
import {
  useSelector,
  useDispatch,
  selectWallter,
  connectUnisat,
} from "@/lib/redux"
import { ConnectModal } from "@/components/Page/TopBar/ConnectButton"
import useModal from "@/hook/useModal"

const WhitelistStageButton: React.FC<{ info: any }> = ({ info }) => {
  const dispatch = useDispatch()

  const [onConnect, onDismiss] = useModal(
    <ConnectModal
      onDismiss={() => onDismiss()}
      connect={() => {
        dispatch(connectUnisat())
        onDismiss()
      }}></ConnectModal>
  )

  const { connected } = useSelector(selectWallter)
  const onCLickBuy = () => {}
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
        <TimeCountdown deadline={new Date(info.starttime)} />
      </WhitelistStageButtonBox>
    )
  } else if (endtime.getTime() < Date.now()) {
    return <WhitelistStageButtonBox disabled>Ended</WhitelistStageButtonBox>
  } else if (starttime.getTime() < Date.now()) {
    return (
      <WhitelistStageButtonBox onClick={onCLickBuy}>
        Buy
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


