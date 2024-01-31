"use client"

import Button from "@/components/Button"
import { hidehash } from "@/utils"
import styled from "@emotion/styled"
import Notice from "@/components/Notice"
import QuitIcon from "@/assets/img/quit.png"
import QuitLightIcon from "@/assets/img/quit_light.png"
import XIcon from "@/assets/img/x.png"
import {
  wallterSlice,
  useSelector,
  useDispatch,
  selectWallter,
  addToast,
  connectUnisat,
  WallterType,
} from "@/lib/redux"
import React, { useState } from "react"
import Image from "next/image"
import useModal from "@/hook/useModal"
import CloseIcon from "@/components/Svg/CloseIcon"

import Link from "next/link"
import WallterSymbol from "@/components/WallterSymbol"

const ConnectSuccess: React.FC<{ address: string }> = ({ address }) => {
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const { wallterType } = useSelector(selectWallter)
  const onClickShow = () => {
    setShow(!show)
  }
  const onClickQuit = () => {
    setShow(false)
    dispatch(wallterSlice.actions.disconnect())
  }
  return (
    <UserToolsBox>
      <HistoryButtonBox href={"/history"}>History</HistoryButtonBox>
      <ContentSuccessBox>
        <ContentSuccessTopBox>
          <ContentSuccessLineBox onClick={onClickShow}>
          <WallterSymbol size={20} symbol={String(wallterType || '').toLocaleUpperCase()}/>  {hidehash(address)} 
          </ContentSuccessLineBox>
          {show ? (
            <ContentSuccessLineBox onClick={onClickQuit}>
              <ImgBgBox />
              <DisconnectTextBox>Disconnect</DisconnectTextBox>
            </ContentSuccessLineBox>
          ) : (
            ""
          )}
        </ContentSuccessTopBox>
      </ContentSuccessBox>
    </UserToolsBox>
  )
}

const ConnectButton = () => {
  const dispatch = useDispatch()
  const { unisatInstalled, address, connected, network } = useSelector(selectWallter)
  const [onConnect, onDismiss] = useModal(
    <ConnectModal
      onDismiss={() => onDismiss()}
      connect={(type: WallterType) => {
        dispatch(connectUnisat(type))
        onDismiss()
      }}></ConnectModal>
  )
  if (!unisatInstalled) {
    return (
      <UserToolsBox>
        <div />
        <ConnectButtonBox
          onClick={() =>
            dispatch(
              addToast({
                contxt: "UniSat Wallet not installed",
                icon: "warning",
              })
            )
          }
          variant="secondary">
          Connect Wallet
        </ConnectButtonBox>
      </UserToolsBox>
    )
  }
  if (network && network !== process.env.NEXT_PUBLIC_NETWORK) {
    return (
      <ConnectButtonBox onClick={onConnect}>Switch Network</ConnectButtonBox>
    )
  }
  return connected && address ? (
    <ConnectSuccess address={address} />
  ) : (
    <ConnectWallButton onConnect={onConnect} />
  )
}

export default ConnectButton

const ConnectWallButton: React.FC<{ onConnect: any }> = ({ onConnect }) => {
  const dispatch = useDispatch()

  return (
    <UserToolsBox>
      <div />
      <ConnectButtonBox
        variant="secondary"
        onClick={onConnect}
        // onClick={() => dispatch(connectUnisat())}
      >
        Connect Wallet
      </ConnectButtonBox>
    </UserToolsBox>
  )
}
export const ConnectModal: React.FC<{ onDismiss: any; connect: any }> = ({
  onDismiss,
  connect,
}) => {
  return (
    <ConnectModalBox>
      <CloseButtonBox onClick={onDismiss}>
        <CloseIcon fill="#C2C5C8" width={36} />
      </CloseButtonBox>
      <ConnectLineBox onClick={() => connect("unisat")}>
        <WallterSymbol size={60} symbol={"UNISAT"} />
        <ConnectTitle className="text">UniSat Wallet</ConnectTitle>
      </ConnectLineBox>
      <ConnectLineBox onClick={() => connect("okx")}>
        <WallterSymbol size={60} symbol={"OKX"} />
        <ConnectTitle className="text">OKX Wallet</ConnectTitle>
      </ConnectLineBox>
    </ConnectModalBox>
  )
}

const HistoryButtonBox = styled(Link)`
  font-size: 20px;
  font-family: Montserrat, Montserrat;
  font-weight: 600;
  color: #ffffff;
  line-height: 20px;
  text-decoration: none;
  &:hover {
    color: #f7931a;
  }
`
const UserToolsBox = styled.div`
  display: flex;
  align-items: center;
  /* gap: 32px; */
  cursor: pointer;
  user-select: none;
  width: 305px;
  justify-content: space-between;
`

const ConnectLineBox = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  /* flex-direction: column; */
  padding-left: 30px;
  gap: 48px;
  font-size: 24px;
  font-weight: 500;
  color: #c2c5c8;
  line-height: 24px;
  border: 2px solid #6f6f76;
  width: 500px;
  height: 100px;
  border-radius: 16px;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    border-color: #f7931a;
    .button {
      border: 5px solid #f7931a;
    }
  }
`
const ConnectTitle = styled.div`
  font-size: 24px;
  font-family: Montserrat, Montserrat-Medium;
`
const LogoBox = styled.div`
  width: 200px;
  height: 200px;
  background: #24272b;
  border-radius: 108px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
const CloseButtonBox = styled.div`
  width: 36px;
  height: 36px;
  position: absolute;
  top: 36px;
  right: 36px;
  cursor: pointer;
  &:hover {
    svg {
      fill: #f7931a;
    }
  }
`

const ConnectModalBox = styled.div`
  width: 600px;
  height: 432px;
  background: #181b20;
  border-radius: 30px;
  padding: 32px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 32px;
`

const ImgBox = styled(Image)`
  height: auto;
`

const ImgBgBox = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url(${QuitIcon.src});
  background-size: 24px 24px;
`

const ContentSuccessTopBox = styled.div`
  border: 3px solid #c2c5c8;
  border-radius: 16px;
  overflow: hidden;
`
const ContentSuccessLineBox = styled.div`
  cursor: pointer;
  height: 52px;
  color: #fff;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 12px;
  border-radius: 12px;
  &:nth-child(2) {
    color: #c2c5c8;
  }

  &:hover {
    background-color: #24272b;
    color: #fff;
  }
  &:nth-child(2):hover {
    span {
      background-image: url(${QuitLightIcon.src});
      background-size: 24px 24px;
    }
  }
`
const DisconnectTextBox = styled.div``
const ContentSuccessBox = styled.div`
  user-select: none;
  position: relative;
  cursor: pointer;
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 0.03em;
  color: #fff;
  width: 200px;
  height: 56px;
  /* overflow: hidden; */
`
const ConnectButtonBox = styled(Button)`
  width: 200px;
  font-size: 20px;
  /* padding: 0 30px; */
`
