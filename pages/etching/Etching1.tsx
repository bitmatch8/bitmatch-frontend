import React, { useMemo } from "react";
import EtchFlowPath from "@/components/EtchFlowPath";
import TextTooltip from "@/components/TextTooltip";
import { Switch } from "@mui/material";
import {
  useSelector,
  selectWallter,
  WallterType,
  useDispatch,
  connectUnisat,
} from "@/lib/redux";
import { ConnectModal } from "@/components/Page/TopBar/ConnectButton";
import useModal from "@/hook/useModal";
import bitcoin from "bitcoinjs-lib";

export default function Etching1(props: any) {
  const { handleBackData } = props;

  const [checked, setChecked] = React.useState(false);
  const [rune, setRune] = React.useState("");
  const [premine, setPremine] = React.useState(0);
  const [premineReceiveAddress, setPremineReceiveAddress] = React.useState("");
  const [cap, setCap] = React.useState(0);
  const [amount, setAmount] = React.useState(0);
  const [offOrHei, setOffOrHei] = React.useState("offset");
  const [offset, setOffset] = React.useState(0);
  const [startHeight, setStartHeight] = React.useState(0);
  const [endHeight, setEndHeight] = React.useState(0);
  const {
    address,
    balance,
    status: connectStatus,
  } = useSelector(selectWallter);
  const dispatch = useDispatch();
  const [onConnect, onDismiss] = useModal(
    <ConnectModal
      onDismiss={() => onDismiss()}
      connect={(type: WallterType) => {
        dispatch(connectUnisat(type));
        onDismiss();
      }}
    ></ConnectModal>
  ); //钱包弹窗

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const RuneTipText = useMemo(
    () => (
      <div className="etch-tipInnerBox">
        <p>12 characters</p>
        <p>Can contain a "·" between characters.</p>
      </div>
    ),
    []
  );
  const RuneOffsetTipText = useMemo(
    () => (
      <div className="etch-tipInnerBox">
        <p>After Etching to the height to start Mint</p>
      </div>
    ),
    []
  );
  const RuneHieghtTipText = useMemo(
    () => (
      <div className="etch-tipInnerBox">
        <p>Open Minting start height and end height</p>
      </div>
    ),
    []
  );

  const setRuneName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRune(event.target.value);
  };
  const setPremineAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPremine(Number(event.target.value));
  };
  const setPremineRecAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPremineReceiveAddress(event.target.value);
  };
  const setPublicAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCap(Number(event.target.value));
  };
  const setMintAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };
  const setOffsetAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOffset(Number(event.target.value));
  };
  const setStartHeightNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartHeight(Number(event.target.value));
  };
  const setEndtHeightNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndHeight(Number(event.target.value));
  };

  const assembleFormData = () => {
    let callbackData: any = {
      flowIndex: 2,
      rune,
      divisibility: 0,
      premine,
      premineReceiveAddress,
      cap,
      amount,
    };
    callbackData["start"] = offset + startHeight;
    callbackData["end"] = offset + endHeight;
    if (offOrHei === "height") {
      callbackData["start"] = startHeight;
      callbackData["end"] = endHeight;
    }
    handleBackData(callbackData);
  };

  return (
    <div className="etch-blockBox">
      <EtchFlowPath flowType={1} flowName="etching"></EtchFlowPath>
      <div className="etch-formBox">
        <div className="etch-formItemBox">
          <div className="etch-formTitleBox">
            <span className="etch-star">*</span>
            <span className="etch-itemTitle">Rune</span>
            <TextTooltip arrow title={RuneTipText}>
              <span className="etch-askIcon"></span>
            </TextTooltip>
          </div>
          <div className="etch-inputBox1">
            <input
              type="text"
              placeholder="12 letter identifier like ”ABCDE·FGHI”"
              onBlur={setRuneName}
            />
          </div>
          <p className="etch-formErrorTip">Please input max supply!</p>
        </div>
        <div className="etch-formItemBox">
          <div className="etch-formTitleBox">
            <span className="etch-star">*</span>
            <span className="etch-itemTitle">Premine Amount</span>
          </div>
          <div className="etch-inputBox1">
            <input
              type="text"
              placeholder="21000000"
              onBlur={setPremineAmount}
            />
          </div>
          <p className="etch-formErrorTip"></p>
        </div>
        <div className="etch-formItemBox">
          <div className="etch-formTitleBox">
            <span className="etch-star">*</span>
            <span className="etch-itemTitle">Premine Receive Address</span>
          </div>
          <div className="etch-inputBox1">
            <input type="text" placeholder="bc1p…" onBlur={setPremineRecAdd} />
          </div>
          <p className="etch-formErrorTip"></p>
        </div>

        <div className="etch-mintSetBtnBox">
          <span className="etch-mintSetTit">Public Mint</span>
          <div className="etch-mintSetSwitchBox">
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
        </div>

        <div>
          <div className="etch-formItemBox etch-formTtemBox2">
            <div className="etch-formItemInner">
              <div className="etch-formItemBox">
                <div className="etch-formTitleBox">
                  <span className="etch-star">*</span>
                  <span className="etch-itemTitle">Public Amount</span>
                </div>
                <div className="etch-inputBox1">
                  <input
                    type="text"
                    placeholder="21000000"
                    onBlur={setPublicAmount}
                  />
                </div>
                <p className="etch-formErrorTip"></p>
              </div>
            </div>
            <div className="etch-formItemInner">
              <div className="etch-formItemBox">
                <div className="etch-formTitleBox">
                  <span className="etch-star">*</span>
                  <span className="etch-itemTitle">Mint Amount</span>
                </div>
                <div className="etch-inputBox1">
                  <input
                    type="text"
                    placeholder="2100"
                    onBlur={setMintAmount}
                  />
                </div>
                <p className="etch-formErrorTip"></p>
              </div>
            </div>
          </div>

          <div className="etch-formItemBox etch-formTtemBox2">
            <div className="etch-formItemInner">
              <div className="etch-formItemBox">
                <div className="etch-formTitleBox">
                  <span className="etch-star">*</span>
                  <span className="etch-itemTitle">Time Type</span>
                </div>
                <div
                  className="etch-inputBox1 etch-timeType cur"
                  onClick={() => setOffOrHei("offset")}
                >
                  Offset
                  <span className="etch-timeTypeCur"></span>
                </div>
                <p className="etch-formErrorTip"></p>
              </div>
            </div>
            <div className="etch-formItemInner">
              <div className="etch-formItemBox">
                <div className="etch-formTitleBox">
                  <span className="etch-star"></span>
                  <span className="etch-itemTitle"></span>
                </div>
                <div
                  className="etch-inputBox1 etch-timeType"
                  onClick={() => setOffOrHei("height")}
                >
                  Height
                  <span className="etch-timeTypeCur"></span>
                </div>
                <p className="etch-formErrorTip"></p>
              </div>
            </div>
          </div>
          <div className="etch-formItemBox">
            <div className="etch-formTitleBox">
              <span className="etch-star">*</span>
              <span className="etch-itemTitle">Offset</span>
              <TextTooltip arrow title={RuneOffsetTipText}>
                <span className="etch-askIcon"></span>
              </TextTooltip>
            </div>
            <div className="etch-inputBox1">
              <input type="text" onBlur={setOffsetAmount} />
            </div>
            <p className="etch-formErrorTip"></p>
          </div>
          <div className="etch-formItemBox etch-formTtemBox2">
            <div className="etch-formItemInner">
              <div className="etch-formItemBox">
                <div className="etch-formTitleBox">
                  <span className="etch-star">*</span>
                  <span className="etch-itemTitle">Height</span>
                  <TextTooltip arrow title={RuneHieghtTipText}>
                    <span className="etch-askIcon"></span>
                  </TextTooltip>
                </div>
                <div className="etch-inputBox1">
                  <input
                    type="text"
                    placeholder="8400000"
                    className="etch-mintHeightInput"
                    onBlur={setStartHeightNumber}
                  />
                  <span className="etch-mintHieghtZc">Start Height</span>
                </div>
                <p className="etch-formErrorTip"></p>
              </div>
            </div>
            <div className="etch-formItemInner">
              <div className="etch-formItemBox">
                <div className="etch-formTitleBox">
                  <span className="etch-star"></span>
                  <span className="etch-itemTitle"></span>
                </div>
                <div className="etch-inputBox1">
                  <input
                    type="text"
                    placeholder="2100"
                    className="etch-mintHeightInput"
                    onBlur={setEndtHeightNumber}
                  />
                  <span className="etch-mintHieghtZc">End Height</span>
                </div>
                <p className="etch-formErrorTip"></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="etch-bottomBalanceBox">
        <span className="etch-balanceTxt">Balance</span>
        <span className="etch-balanceNum">{balance.total / 1e8} BTC</span>
      </div>
      {address ? (
        <>
          {connectStatus === "loading" ? (
            <div className="etch-bottomBtn">
              Next
              <span className="etch-bottomBtnLoading"></span>
            </div>
          ) : (
            <div className="etch-bottomBtn" onClick={assembleFormData}>
              Next
            </div>
          )}
        </>
      ) : (
        <div className="etch-bottomBtn" onClick={onConnect}>
          Connect wallet
        </div>
      )}
    </div>
  );
}
