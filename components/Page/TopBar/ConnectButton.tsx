"use client";

import Button from "@/components/Button";
import { hidehash } from "@/utils";
import styled from "@emotion/styled";
import Notice from "@/components/Notice";
import QuitIcon from "@/assets/img/quit.png";
import XIcon from "@/assets/img/x.png";
import {
  wallterSlice,
  useSelector,
  useDispatch,
  selectWallter,
  addToast,
  connectUnisat,
} from "@/lib/redux";
import React, { useState } from "react";
import Image from "next/image";
import useModal from "@/hook/useModal";
import CloseIcon from "@/components/Svg/CloseIcon";
import LogoUnisatIcon from "@/assets/icon/1@2x.png";

const ConnectSuccess: React.FC<{ address: string }> = ({ address }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const onClickShow = () => {
    setShow(!show);
  };
  const onClickQuit = () => {
    setShow(false);
    dispatch(wallterSlice.actions.disconnect());
  };
  return (
    <ContentSuccessBox>
      <ContentSuccessTopBox>
        <ContentSuccessLineBox onClick={onClickShow}>
          {hidehash(address)}
        </ContentSuccessLineBox>
        {show ? (
          <ContentSuccessLineBox onClick={onClickQuit}>
            <ImgBox width={24} alt="" src={QuitIcon} />
            <span>Disconnect</span>
          </ContentSuccessLineBox>
        ) : (
          ""
        )}
      </ContentSuccessTopBox>
    </ContentSuccessBox>
  );
};

const ConnectButton = () => {
  const dispatch = useDispatch();
  const { unisatInstalled, address, connected } = useSelector(selectWallter);
  if (!unisatInstalled) {
    return (
      <ConnectButtonBox
        onClick={() =>
          dispatch(
            addToast({
              contxt: "UniSat Wallet not installed",
              icon: "warning",
            })
          )
        }
        variant="secondary"
      >
        Connect Wallet
      </ConnectButtonBox>
    );
  }

  return connected && address ? (
    <ConnectSuccess address={address} />
  ) : (
    <ConnectWallButton />
  );
};

export default ConnectButton;

const ConnectWallButton: React.FC = () => {
  const dispatch = useDispatch();

  const [onConnect, onDismiss] = useModal(
    <ConnectModal
      onDismiss={() => onDismiss()}
      connect={() => {
        dispatch(connectUnisat());
        onDismiss();
      }}
    ></ConnectModal>
  );
  return (
    <ConnectButtonBox
      variant="secondary"
      onClick={onConnect}
      // onClick={() => dispatch(connectUnisat())}
    >
      Connect Wallet
    </ConnectButtonBox>
  );
};
export const ConnectModal: React.FC<{ onDismiss: any; connect: any }> = ({
  onDismiss,
  connect,
}) => {
  return (
    <ConnectModalBox>
      <CloseButtonBox onClick={onDismiss}>
        <CloseIcon fill="#C2C5C8" width={36} />
      </CloseButtonBox>
      <ConnectBox>
        <LogoBox className="button" onClick={connect}>
          <ImgBox alt="" src={LogoUnisatIcon} width={77} />
        </LogoBox>
        <ConnectTitle className="text">UniSat Wallet</ConnectTitle>
      </ConnectBox>
    </ConnectModalBox>
  );
};

const ConnectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 48px;
  font-size: 24px;
  font-weight: 500;
  color: #c2c5c8;
  line-height: 24px;
  &:hover {
    color: #ffffff;
    .button {
      border: 5px solid #f7931a;
    }
  }
`;
const ConnectTitle = styled.div`
  font-family: Montserrat, Montserrat-Medium;
`;
const LogoBox = styled.div`
  width: 200px;
  height: 200px;
  background: #24272b;
  border-radius: 108px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
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
`;

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
  gap: 48px;
`;

const ImgBox = styled(Image)`
  height: auto;
`;

const ContentSuccessTopBox = styled.div`
  border: 3px solid #c2c5c8;
  border-radius: 16px;
  overflow: hidden;
`;
const ContentSuccessLineBox = styled.div`
  cursor: pointer;
  height: 56px;
  color: #fff;
  width: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 12px;
  &:hover {
    background-color: #24272b;
  }
`;
const ContentSuccessBox = styled.div`
  user-select: none;
  position: relative;
  cursor: pointer;
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 0.03em;
  color: #fff;
  width: 220px;
  height: 56px;
  /* overflow: hidden; */
`;
const ConnectButtonBox = styled(Button)`
  width: 220px;
  font-size: 20px;
  /* padding: 0 30px; */
`;
