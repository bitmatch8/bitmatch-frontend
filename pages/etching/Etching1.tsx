import React, { useMemo, useEffect } from "react";
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
import { fetchRuneSearchApi } from "@/api/api";

export default function Etching1(props: any) {
  const { handleBackData, from2To1Data } = props;

  const [checked, setChecked] = React.useState(false);
  const [turbo, setTurbo] = React.useState(false);
  const [rune, setRune] = React.useState("");
  const [runeErrorTip, setRuneErrorTip] = React.useState("");
  const [symbol, setSymbol] = React.useState("");
  const [symbolErrorTip, setSymbolErrorTip] = React.useState("");
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
  const [maxSupply, setMaxSupply] = React.useState("0");

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
  const handleChangeTurbo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTurbo(event.target.checked);
  };

  
  const TurboTipText = useMemo(
    () => (
      <div className="etch-tipInnerBox">
        <p>opting into future protocol changes</p>
      </div>
    ),
    []
  );
  const RuneTipText = useMemo(
    () => (
      <div className="etch-tipInnerBox">
        <p>12 characters</p>
        <p>Can contain a "." between characters.</p>
      </div>
    ),
    []
  );
  const CapacityTipText = useMemo(
    () => (
      <div className="etch-tipInnerBox">
        <p>the allowed number of mints.</p>
      </div>
    ),
    []
  );
  const MintAmountTipText = useMemo(
    () => (
      <div className="etch-tipInnerBox">
        <p>the amount of runes each</p>
        <p>mint transaction receives.</p>
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
  const premineAmountTipText = useMemo(
    () => (
      <div className="etch-tipInnerBox">
        <p>The Premine field</p>
        <p>contains the amount</p>
        <p>of premined runes.</p>
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

  const addRunePoint = () => {
    const runeVal = rune;
    const runeInputDom = document.getElementById('runeInput') as HTMLInputElement;
    if (runeInputDom) {
      const cursorPosition = runeInputDom.selectionStart || 0; // 获取光标位置
      if (runeVal[cursorPosition-1]&&runeVal[cursorPosition-1]==='•' || runeVal[cursorPosition]&&runeVal[cursorPosition]==='•') {
        runeInputDom.focus();
        return;
      }
      const textBeforeCursor = runeInputDom.value.substring(0, cursorPosition);
      const textAfterCursor = runeInputDom.value.substring(cursorPosition);
      const newVal = textBeforeCursor + '•' + textAfterCursor;
      setRune(newVal);
      runeInputDom.focus();
    }
  }
  const setRuneName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const runeVal: string = event.target.value;
    var regex = /^[A-Za-z•]$/;
    let errorChar = false;
    let upperStr = "";
    for (let i = 0; i < runeVal.length; i++) {
      if (!regex.test(runeVal[i])) {
        errorChar = true;
        break;
      } else {
        //圆点不能连续多个，只能单个单个的出现
        if (runeVal[i]==='•' && runeVal[i+1]==='•') {
          errorChar = true;
          break;
        }
        let upperChar = runeVal[i].toUpperCase();
        upperStr += upperChar;
      }
    }
    if (errorChar) {
      return;
    }

    setRune(upperStr);
  };
  const checkRuneName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const runeVal: string = event.target.value;
    const runeValLength = runeVal.length;
    if (runeVal[0] === "•" || runeVal[runeValLength - 1] === "•") {
      setRuneErrorTip("The first and last characters cannot be •");
      return;
    }
    let charArr = [];
    let isUpperLetter = false; // 验证是否是大写字母
    for (let i = 0; i < runeValLength; i++) {
      if (runeVal[i] !== "•") {
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
    if (charArr.length < 12 || charArr.length > 26) {
      setRuneErrorTip("Rune 12 to 26 letters");
      return;
    }
    if (isUpperLetter) {
      setRuneErrorTip("Characters must be all uppercase");
      return;
    }
    setRuneErrorTip("");
    // 获取所需的tx和block数据
    fetchRuneSearchApi(runeVal.replaceAll('•', '')).then((res) => {
      if (res && res['result'] && res['result']['exist']) {
        setRuneErrorTip("Rune already exists");
      } else {
        setRuneErrorTip("");
      }
    })
  };
  const setSymbolVal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSymbol(event.target.value);
  }
  const checkSymbolVal = (event: React.ChangeEvent<HTMLInputElement>) => {
    const symVal = event.target.value;
    if (!symVal) {
      setSymbolErrorTip('');
      return;
    }
    const regex = /^[\s\S]$/u;
    if (!regex.test(symVal)) {
      setSymbolErrorTip('Please enter a single Unicode character.');
      return;
    }
    setSymbolErrorTip('');
  }
  const setPremineAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const premineAmontValue: string = event.target.value;
    if (
      premineAmontValue &&
      (isNaN(Number(premineAmontValue)) ||
        Number(premineAmontValue) <= 0 ||
        Number(premineAmontValue) % 1 !== 0 ||
        premineAmontValue.indexOf(".") !== -1)
    ) {
      return;
    }
    setPremine(event.target.value);
  };
  const checkPremineAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const premineAmontValue: string = event.target.value;
    if (!premineAmontValue && premineAmontValue !== '0') {
      setPremineErrorTip("");
      setPremine("");
      return;
    }
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
    let pubAmontValue = event.target.value;
    if (
      pubAmontValue &&
      (isNaN(Number(pubAmontValue)) ||
        Number(pubAmontValue) <= 0 ||
        Number(pubAmontValue) % 1 !== 0 ||
        pubAmontValue.indexOf(".") !== -1)
    ) {
      return;
    }
    setCap(event.target.value);
  };
  const checkPublicAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    let pubAmontValue = event.target.value;
    if (
      isNaN(Number(pubAmontValue)) ||
      Number(pubAmontValue) <= 0 ||
      Number(pubAmontValue) % 1 !== 0
    ) {
      setCapErrorTip("Capacity must be a positive integer");
      setCap("");
      return;
    }
    if (Number(pubAmontValue) < Number(amount)) {
      setCapErrorTip("Mint Amount cannot be greater than Capacity");
      return;
    }
    setCapErrorTip("");
  };
  const setMintAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const mintAmountValue = event.target.value;
    if (
      mintAmountValue &&
      (isNaN(Number(mintAmountValue)) ||
        Number(mintAmountValue) <= 0 ||
        Number(mintAmountValue) % 1 !== 0 ||
        mintAmountValue.indexOf(".") !== -1)
    ) {
      return;
    }
    if (Number(mintAmountValue) > Number(cap)) {
      setAmountErrorTip("Mint Amount cannot be greater than Capacity");
      return;
    }
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
      setAmountErrorTip("Mint Amount cannot be greater than Capacity");
      setAmount("");
      return;
    }
    setAmountErrorTip("");
  };
  const setOffsetAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const offsetValue = event.target.value;
    if (
      offsetValue &&
      (isNaN(Number(offsetValue)) ||
        Number(offsetValue) <= 0 ||
        Number(offsetValue) % 1 !== 0 ||
        offsetValue.indexOf(".") !== -1)
    ) {
      return;
    }
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
    const startHeightValue = event.target.value;
    if (
      startHeightValue &&
      (isNaN(Number(startHeightValue)) ||
        Number(startHeightValue) <= 0 ||
        Number(startHeightValue) % 1 !== 0 ||
        startHeightValue.indexOf(".") !== -1)
    ) {
      return;
    }
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
    if (endHeight && Number(endHeight)<=Number(startHeightValue)) {
      setSstartHeightErrorTip("End Height must more than Start Height");
      setStartHeight("");
      return;
    }
    setSstartHeightErrorTip("");
  };
  const setEndtHeightNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const endHeightValue = event.target.value;
    if (
      endHeightValue &&
      (isNaN(Number(endHeightValue)) ||
        Number(endHeightValue) <= 0 ||
        Number(endHeightValue) % 1 !== 0 ||
        endHeightValue.indexOf(".") !== -1)
    ) {
      return;
    }
    setEndHeight(event.target.value);
  };
  const checkEndtHeightNumber = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!startHeight) {
      setEndHeightErrorTip("Please input Start Height");
      setEndHeight("");
      return;
    }
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
    if (Number(endHeightValue) <= Number(startHeight)) {
      setEndHeightErrorTip("End Height must more than Start Height");
      setEndHeight("");
      return;
    }
    setEndHeightErrorTip("");
  };

  const handleSetOffOrHei = (type: string) => {
    setOffOrHei(type);
    setStartHeight("");
    setEndHeight("");
    setSstartHeightErrorTip("");
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
    if (!cap) {
      setCapErrorTip("Please input Capacity");
      return false;
    }
    if (capErrorTip) {
      return false;
    }
    if (!amount) {
      setAmountErrorTip("Please input Mint Amount");
      return false;
    }
    if (amountErrorTip) {
      return false;
    }
    if (symbolErrorTip) {
      return false;
    }
    if (premineErrorTip) {
      return false;
    }

    if (checked) {
      if (!startHeight) {
        setSstartHeightErrorTip("Please input Start Height");
        return false;
      }
      if (startHeightErrorTip) {
        return false;
      }
      if (!endHeight) {
        setEndHeightErrorTip("Please input End Height");
        return false;
      }
      if (endHeightErrorTip) {
        return false;
      }
      // if (!premine) {
      //   setPremineErrorTip("Please input Premine Amount");
      //   return false;
      // }
      
      if (!premineReceiveAddress) {
        setPremineReceiveAddressErrorTip(
          "Please input Premine Receive Address"
        );
        return false;
      }
    }
    return true;
  };

  const assembleFormData = () => {
    const checkFormResult = checkFormData(); //
    if (!checkFormResult) {
      return;
    }
    let callbackData: any = {
      flowIndex: 2,
      rune,
      symbol,
      divisibility: 0,
      cap,
      amount,
      publicMintChecked: checked,
      turbo,
    };
    if (premine) {
      callbackData["premine"] = premine;
      callbackData["premineReceiveAddress"] = premineReceiveAddress;
    }
    if (checked) {
      callbackData["timeType"] = offOrHei;
      callbackData["start"] = startHeight;
      callbackData["end"] = endHeight;
    }
    handleBackData(callbackData);
  };

  useEffect(() => {
    if (from2To1Data.rune) {
      setRune(from2To1Data.rune);
      setSymbol(from2To1Data.symbol);
      setCap(from2To1Data.cap);
      setAmount(from2To1Data.amount);
      setChecked(from2To1Data.publicMintChecked);
      setPremine(from2To1Data.premine);
      setPremineReceiveAddress(from2To1Data.premineReceiveAddress);
      setTurbo(from2To1Data.turbo);
      if (from2To1Data.publicMintChecked) {
        setOffOrHei(from2To1Data.timeType);
        setStartHeight(from2To1Data.start);
        setEndHeight(from2To1Data.end);
      }
    }
  }, [from2To1Data]);

  useEffect(() => {
    if (address) {
      setPremineReceiveAddress(address);
    }
  }, [address]);

  useEffect(() => {
    let totalMaxSupplyNum = Number(premine) + Number(cap) * Number(amount);
    let maxSupplyShow = totalMaxSupplyNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setMaxSupply(maxSupplyShow);
  }, [premine, cap, amount])

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
              placeholder="12 letter identifier like ”ABCDE.FGHI”"
              value={rune}
              onChange={setRuneName}
              onBlur={checkRuneName}
              id="runeInput"
            />
            <span className="etch-runePointer" onClick={addRunePoint}>•</span>
          </div>
          <p className="etch-formErrorTip">{runeErrorTip}</p>
        </div>

        <div className="etch-formItemBox etch-formTtemBox2">
          <div className="etch-formItemInner">
            <div className="etch-formItemBox">
              <div className="etch-formTitleBox">
                <span className="etch-star">*</span>
                <span className="etch-itemTitle">Capacity</span>
                <TextTooltip arrow title={CapacityTipText}>
                  <span className="etch-askIcon"></span>
                </TextTooltip>
              </div>
              <div className="etch-inputBox1">
                <input
                  type="text"
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
                <TextTooltip arrow title={MintAmountTipText}>
                  <span className="etch-askIcon"></span>
                </TextTooltip>
              </div>
              <div className="etch-inputBox1">
                <input
                  type="text"
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
                <span className="etch-star"></span>
                <span className="etch-itemTitle">Symbol&nbsp;&nbsp;(optional)</span>
              </div>
              <div className="etch-inputBox1">
                <input
                  className="etch-symbolInput"
                  type="text"
                  placeholder="The symbol of the rune."
                  value={symbol}
                  onChange={setSymbolVal}
                  onBlur={checkSymbolVal}
                />
              </div>
              <p className="etch-formErrorTip">{ symbolErrorTip }</p>
            </div>
          </div>
          <div className="etch-formItemInner">
            <div className="etch-formItemBox">
                <div className="etch-formTitleBox">
                  <span className="etch-star"></span>
                  <span className="etch-itemTitle">Premine Amount&nbsp;&nbsp;(optional)</span>
                  <TextTooltip arrow title={premineAmountTipText}>
                    <span className="etch-askIcon"></span>
                  </TextTooltip>
                </div>
                <div className="etch-inputBox1">
                  <input
                    type="text"
                    placeholder="The premine amount."
                    value={premine}
                    onChange={setPremineAmount}
                    onBlur={checkPremineAmount}
                  />
                </div>
                <p className="etch-formErrorTip">{premineErrorTip}</p>
              </div>
          </div>
        </div>

        <div className="etch-etchingMaxSupply">
          <span className="tit">Max supply:</span>
          <span className="total">{ maxSupply }</span>
          {
            cap && amount && <span className="count">=</span>
          }
          {
            premine && cap && amount && <>
              <span className="count">{ premine }</span>
              <span className="count">+</span>
            </>
          }
          {
            cap && amount && <>
              <span className="count">{ cap }</span>
              <span className="count countStar">*</span>
              <span className="count">{ amount }</span>
            </>
          }
        </div>

        <div className="etch-mintSetBtnBox">
          <span className="etch-mintSetTit">Advanced Options</span>
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
                    <span className="etch-itemTitle">Height Selection</span>
                  </div>
                  <div
                    className={`etch-inputBox1 etch-timeType ${
                      offOrHei === "offset" ? "cur" : ""
                    }`}
                    onClick={() => handleSetOffOrHei("offset")}
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
                    onClick={() => handleSetOffOrHei("height")}
                  >
                    Height
                    <span className="etch-timeTypeCur"></span>
                  </div>
                  <p className="etch-formErrorTip"></p>
                </div>
              </div>
            </div>
            {/* {offOrHei === "offset" && (
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
            )} */}
            <div className="etch-formItemBox etch-formTtemBox2">
              <div className="etch-formItemInner">
                <div className="etch-formItemBox">
                  <div className="etch-formTitleBox">
                    <span className="etch-star">*</span>
                    <span className="etch-itemTitle">
                      {offOrHei === "height" ? "Height" : "Offset"}
                    </span>
                    <TextTooltip
                      arrow
                      title={
                        offOrHei === "height"
                          ? RuneHieghtTipText
                          : RuneOffsetTipText
                      }
                    >
                      <span className="etch-askIcon"></span>
                    </TextTooltip>
                  </div>
                  <div className="etch-inputBox1">
                    <input
                      type="text"
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
              <p className="etch-formErrorTip">
                {premineReceiveAddressErrorTip}
              </p>
            </div>
            
            <div className="etch-mintSetBtnBox etch-mintTurbo">
              <span className="etch-mintSetTit grayTit">Turbo</span>
              <TextTooltip
                arrow
                title={TurboTipText}
              >
                <span className="etch-askIcon"></span>
              </TextTooltip>
              <div className="etch-mintSetSwitchBox">
                <Switch
                  checked={turbo}
                  onChange={handleChangeTurbo}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
            </div>

          </div>
        )}
      </div>

      <div className="etch-bottomBalanceBox">
        <span className="etch-balanceTxt">Balance</span>
        <span className="etch-balanceNum">{balance.confirmed / 1e8} BTC</span>
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
