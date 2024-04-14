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
  const [runeErrorTip, setRuneErrorTip] = React.useState("");
  const [premine, setPremine] = React.useState("");
  const [premineErrorTip, setPremineErrorTip] = React.useState("");
  const [premineReceiveAddress, setPremineReceiveAddress] = React.useState("");
  const [premineReceiveAddressErrorTip, setPremineReceiveAddressErrorTip] =
    React.useState("");
  const [cap, setCap] = React.useState("");
  const [capErrorTip, setCapErrorTip] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [amountErrorTip, setAmountErrorTip] = React.useState("");
  const [offOrHei, setOffOrHei] = React.useState("offset");
  const [offset, setOffset] = React.useState("");
  const [offsetErrorTip, setOffsetErrorTip] = React.useState("");
  const [startHeight, setStartHeight] = React.useState("");
  const [startHeightErrorTip, setSstartHeightErrorTip] = React.useState("");
  const [endHeight, setEndHeight] = React.useState("");
  const [endHeightErrorTip, setEndHeightErrorTip] = React.useState("");

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
  const checkRuneName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const runeVal: string = event.target.value;
    const runeValLength = runeVal.length;
    if (runeVal[0] === "·" || runeVal[runeValLength - 1] === "·") {
      setRuneErrorTip("The first and last characters cannot be ·");
      setRune("");
      return;
    }
    let charArr = [];
    let isUpperLetter = false; // 验证是否是大写字母
    for (let i = 0; i < runeValLength; i++) {
      if (runeVal[i] !== "·") {
        charArr.push(runeVal[i]);
        if (
          runeVal.charCodeAt(i) >= 0x0041 &&
          runeVal.charCodeAt(i) <= 0x005a
        ) {
          isUpperLetter = false;
        } else {
          isUpperLetter = true;
        }
      }
    }
    if (charArr.length !== 12) {
      setRuneErrorTip("Rune must 12 letters");
      setRune("");
      return;
    }
    if (isUpperLetter) {
      setRuneErrorTip("Characters must be all uppercase");
      setRune("");
      return;
    }
    setRuneErrorTip("");
  };
  const setPremineAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPremine(event.target.value);
  };
  const checkPremineAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const premineAmontValue: string = event.target.value;
    if (
      isNaN(Number(premineAmontValue)) ||
      Number(premineAmontValue) <= 0 ||
      Number(premineAmontValue) % 1 !== 0
    ) {
      setPremineErrorTip("Premine Amount must be a positive integer");
      setPremine("");
      return;
    }
    setPremineErrorTip("");
  };
  const setPremineRecAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPremineReceiveAddress(event.target.value);
  };
  const checkPremineRecAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    const premineAddressValue = event.target.value;
    if (!premineAddressValue) {
      setPremineReceiveAddressErrorTip("Please input Premine Receive Address");
      return;
    }
    setPremineReceiveAddressErrorTip("");
  };
  const setPublicAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCap(event.target.value);
  };
  const checkPublicAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    let pubAmontValue = event.target.value;
    if (
      isNaN(Number(pubAmontValue)) ||
      Number(pubAmontValue) <= 0 ||
      Number(pubAmontValue) % 1 !== 0
    ) {
      setCapErrorTip("Public Amount must be a positive integer");
      setCap("");
      return;
    }
    setCapErrorTip("");
  };
  const setMintAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };
  const checkMintAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const mintAmountValue = event.target.value;
    if (
      isNaN(Number(mintAmountValue)) ||
      Number(mintAmountValue) <= 0 ||
      Number(mintAmountValue) % 1 !== 0
    ) {
      setAmountErrorTip("Mint Amount must be a positive integer");
      setAmount("");
      return;
    }
    if (Number(mintAmountValue) > Number(cap)) {
      setAmountErrorTip("Mint Amount cannot be greater than Public Amount");
      setAmount("");
      return;
    }
    setAmountErrorTip("");
  };
  const setOffsetAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOffset(event.target.value);
  };
  const checkOffsetAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const offsetValue = event.target.value;
    if (
      isNaN(Number(offsetValue)) ||
      Number(offsetValue) <= 0 ||
      Number(offsetValue) % 1 !== 0
    ) {
      setOffsetErrorTip("Offset must be a positive integer");
      setOffset("");
      return;
    }
    setOffsetErrorTip("");
  };
  const setStartHeightNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartHeight(event.target.value);
  };
  const checkStartHeightNumber = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const startHeightValue = event.target.value;
    if (
      isNaN(Number(startHeightValue)) ||
      Number(startHeightValue) <= 0 ||
      Number(startHeightValue) % 1 !== 0
    ) {
      setSstartHeightErrorTip("Start Height must be a positive integer");
      setStartHeight("");
      return;
    }
    setSstartHeightErrorTip("");
  };
  const setEndtHeightNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndHeight(event.target.value);
  };
  const checkEndtHeightNumber = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const endHeightValue = event.target.value;
    if (
      isNaN(Number(endHeightValue)) ||
      Number(endHeightValue) <= 0 ||
      Number(endHeightValue) % 1 !== 0
    ) {
      setEndHeightErrorTip("End Height must be a positive integer");
      setEndHeight("");
      return;
    }
    setEndHeightErrorTip("");
  };

  const checkFormData = () => {
    if (!rune) {
      setRuneErrorTip("Please input Rune");
      return false;
    }
    if (runeErrorTip) {
      return false;
    }
    if (!premine) {
      setPremineErrorTip("Please input Premine Amount");
      return false;
    }
    if (premineErrorTip) {
      return false;
    }
    if (!premineReceiveAddress) {
      setPremineReceiveAddressErrorTip("Please input Premine Receive Address");
      return false;
    }
    if (checked) {
      if (!cap) {
        setCapErrorTip("Please input Public Amount");
        return false;
      }
      if (capErrorTip) {
        return false;
      }
      if (!amount) {
        setCapErrorTip("Please input Mint Amount");
        return false;
      }
      if (amountErrorTip) {
        return false;
      }
      if (offOrHei === "offset") {
        if (!offset) {
          setCapErrorTip("Please input Offset");
          return false;
        }
        if (offsetErrorTip) {
          return false;
        }
      }
      if (!startHeight) {
        setCapErrorTip("Please input Start Height");
        return false;
      }
      if (startHeightErrorTip) {
        return false;
      }
      if (!endHeight) {
        setCapErrorTip("Please input End Height");
        return false;
      }
      if (endHeightErrorTip) {
        return false;
      }
    }
    return true;
  };

  const assembleFormData = () => {
    const checkFormResult = true; //checkFormData();
    if (!checkFormResult) {
      return;
    }
    let callbackData: any = {
      flowIndex: 2,
      rune,
      divisibility: 0,
      premine,
      premineReceiveAddress,
    };
    if (checked) {
      callbackData["cap"] = cap;
      callbackData["amount"] = amount;
      callbackData["timeType"] = offOrHei;
      callbackData["start"] = offset + startHeight;
      callbackData["end"] = offset + endHeight;
      if (offOrHei === "height") {
        callbackData["start"] = startHeight;
        callbackData["end"] = endHeight;
      }
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
              value={rune}
              onChange={setRuneName}
              onBlur={checkRuneName}
            />
          </div>
          <p className="etch-formErrorTip">{runeErrorTip}</p>
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
              value={premine}
              onChange={setPremineAmount}
              onBlur={checkPremineAmount}
            />
          </div>
          <p className="etch-formErrorTip">{premineErrorTip}</p>
        </div>
        <div className="etch-formItemBox">
          <div className="etch-formTitleBox">
            <span className="etch-star">*</span>
            <span className="etch-itemTitle">Premine Receive Address</span>
          </div>
          <div className="etch-inputBox1">
            <input
              type="text"
              placeholder="bc1p…"
              value={premineReceiveAddress}
              onChange={setPremineRecAdd}
              onBlur={checkPremineRecAdd}
            />
          </div>
          <p className="etch-formErrorTip">{premineReceiveAddressErrorTip}</p>
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
        {checked && (
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
                      value={cap}
                      onChange={setPublicAmount}
                      onBlur={checkPublicAmount}
                    />
                  </div>
                  <p className="etch-formErrorTip">{capErrorTip}</p>
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
                      value={amount}
                      onChange={setMintAmount}
                      onBlur={checkMintAmount}
                    />
                  </div>
                  <p className="etch-formErrorTip">{amountErrorTip}</p>
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
                    className={`etch-inputBox1 etch-timeType ${
                      offOrHei === "offset" ? "cur" : ""
                    }`}
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
                    className={`etch-inputBox1 etch-timeType ${
                      offOrHei === "height" ? "cur" : ""
                    }`}
                    onClick={() => setOffOrHei("height")}
                  >
                    Height
                    <span className="etch-timeTypeCur"></span>
                  </div>
                  <p className="etch-formErrorTip"></p>
                </div>
              </div>
            </div>
            {offOrHei === "offset" && (
              <div className="etch-formItemBox">
                <div className="etch-formTitleBox">
                  <span className="etch-star">*</span>
                  <span className="etch-itemTitle">Offset</span>
                  <TextTooltip arrow title={RuneOffsetTipText}>
                    <span className="etch-askIcon"></span>
                  </TextTooltip>
                </div>
                <div className="etch-inputBox1">
                  <input
                    type="text"
                    placeholder="100"
                    value={offset}
                    onChange={setOffsetAmount}
                    onBlur={checkOffsetAmount}
                  />
                </div>
                <p className="etch-formErrorTip">{offsetErrorTip}</p>
              </div>
            )}
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
                      value={startHeight}
                      onChange={setStartHeightNumber}
                      onBlur={checkStartHeightNumber}
                    />
                    <span className="etch-mintHieghtZc">Start Height</span>
                  </div>
                  <p className="etch-formErrorTip">{startHeightErrorTip}</p>
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
                      value={endHeight}
                      onChange={setEndtHeightNumber}
                      onBlur={checkEndtHeightNumber}
                    />
                    <span className="etch-mintHieghtZc">End Height</span>
                  </div>
                  <p className="etch-formErrorTip">{endHeightErrorTip}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="etch-bottomBalanceBox">
        <span className="etch-balanceTxt">Balance</span>
        <span className="etch-balanceNum">{balance.total / 1e8} BTC</span>
      </div>
      {address ? (
        <>
          {connectStatus === "loading" ? (
            <div className="etch-bottomBtn etch-bottomBtnLoading">
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