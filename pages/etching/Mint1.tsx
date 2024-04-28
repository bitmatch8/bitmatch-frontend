import React, { useEffect } from "react";
import EtchFlowPath from "@/components/EtchFlowPath";
import {
  useSelector,
  selectWallter,
  WallterType,
  useDispatch,
  connectUnisat,
} from "@/lib/redux";
import { ConnectModal } from "@/components/Page/TopBar/ConnectButton";
import useModal from "@/hook/useModal";
import { fetchRuneSearchApi, fetchHasMintAmount } from "@/api/api";
import TextField from "@mui/material/TextField";

export default function Mint1(props: any) {
  const { handleBackData, from2To1Data } = props;

  const [rune, setRune] = React.useState("");
  const [runeNum, setRuneNum] = React.useState(0);
  const [runeErrorTip, setRuneErrorTip] = React.useState("");
  const [mintAmount, setMmintAmount] = React.useState(1);
  const [amountUnit, setAmountUnit] = React.useState(0);
  const [mintAmountErrorTip, setMmintAmountErrorTip] = React.useState("");
  const [totalMintAmount, setTotalMintAmount] = React.useState(2100);
  const [premineReceiveAddress, setPremineReceiveAddress] = React.useState("");
  const [premineReceiveAddressErrorTip, setPremineReceiveAddressErrorTip] =
    React.useState("");
  const [block, setBlock] = React.useState("");
  const [tx, setTx] = React.useState("");

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

  const addRunePoint = () => {
    const runeVal = rune;
    const runeLength = runeVal.length;
    if (runeVal[runeLength-1] === '•') {
      return;
    }
    const newRune = runeVal + '•';
    setRune(newRune);
    const runeDom = document.getElementById('runeInput');
    if (runeDom) {
      runeDom.focus();
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
    if (runeVal[runeValLength - 1] === "•") {
      setRuneErrorTip("The last characters cannot be •");
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
    if (charArr.length < 12 || charArr.length > 28) {
      setRuneErrorTip("Rune 12 to 28 letters");
      return;
    }
    if (isUpperLetter) {
      setRuneErrorTip("Characters must be all uppercase");
      return;
    }
    setRuneErrorTip("");

    // 获取所需的tx和block数据
    fetchRuneSearchApi(runeVal).then((res) => {
      if (!res || !res['result'] || !res['result']['exist']) {
        setRuneErrorTip("Rune does not exist");
        return;
      }
      let runeid =
        (res["result"]["rune"] && res["result"]["rune"]["runeid"]) || "0:0";
      setTx(runeid.split(":")[1]);
      setBlock(runeid.split(":")[0]);
      setAmountUnit(
        (res["result"]["rune"] && res["result"]["rune"]["mintAmount"]) || 0
      );

      // 获取剩余可Mint数量
      const premineNum =
        (res["result"]["rune"] && res["result"]["rune"]["premine"]) || 0;
      const capacityNum =
        (res["result"]["rune"] && res["result"]["rune"]["capacity"]) || 0;
      let totalNum = Number(premineNum) + Number(capacityNum);
      fetchHasMintAmount(runeVal).then((mres) => {
        const hasMintNum = mres["result"]["mintAmount"] || 0;
        let renuNumShow = totalNum - Number(hasMintNum);
        setRuneNum(renuNumShow);
      });
    });
  };
  const setMintAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    let amountValue = Number(event.target.value);
    if (amountValue * amountUnit > runeNum) {
      return;
    } else {
      setMmintAmount(Number(event.target.value));
    }
  };
  const addMinAmount = () => {
    if (runeNum === 0) {
      return;
    }
    let mintAmountAdd1 = mintAmount + 1;
    if (mintAmountAdd1 * amountUnit > runeNum) {
      return;
    }
    setMmintAmount(mintAmountAdd1);
  };
  const subMinAmount = () => {
    let mintAmountSub1 = mintAmount - 1;
    if (mintAmountSub1 * amountUnit > runeNum || mintAmountSub1 <= 0) {
      return;
    }
    setMmintAmount(mintAmountSub1);
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

  const checkFormData = () => {
    if (!rune) {
      setRuneErrorTip("Please input Rune");
      return false;
    }
    if (runeErrorTip) {
      return false;
    }
    if (mintAmount * amountUnit > runeNum || runeNum === 0) {
      setRuneErrorTip("Rune Insufficient quantity");
      return;
    }
    if (!mintAmount) {
      setMmintAmountErrorTip("Please Input Amount");
      return false;
    }
    if (!premineReceiveAddress) {
      setPremineReceiveAddressErrorTip("Please input Premine Receive Address");
      return false;
    }
    return true;
  };

  const assembleFormData = () => {
    const checkFormResult = checkFormData();
    if (!checkFormResult) {
      return;
    }
    let callbackData: any = {
      flowIndex: 2,
      rune,
      divisibility: 0,
      mintAmount: totalMintAmount,
      premineReceiveAddress,
      block,
      tx: Number(tx),
    };

    handleBackData(callbackData);
  };

  useEffect(() => {
    setTotalMintAmount(2100 * mintAmount);
  }, [mintAmount]);

  useEffect(() => {
    if (from2To1Data.rune) {
      setRune(from2To1Data.rune);
      setTotalMintAmount(from2To1Data.mintAmount);
      setMmintAmount(from2To1Data.mintAmount / 2100);
      setPremineReceiveAddress(from2To1Data.premineReceiveAddress);
      // 根据rune name获取amount的unit值
      const runeVal = from2To1Data.rune;
      fetchRuneSearchApi(runeVal).then((res) => {
        let runeid =
          (res["result"]["rune"] && res["result"]["rune"]["runeid"]) || "0:0";
        setTx(runeid.split(":")[1]);
        setBlock(runeid.split(":")[0]);
        setAmountUnit(
          (res["result"]["rune"] && res["result"]["rune"]["mintAmount"]) || 0
        );

        // 获取剩余可Mint数量
        const premineNum =
          (res["result"]["rune"] && res["result"]["rune"]["premine"]) || 0;
        const capacityNum =
          (res["result"]["rune"] && res["result"]["rune"]["capacity"]) || 0;
        let totalNum = Number(premineNum) + Number(capacityNum);
        fetchHasMintAmount(runeVal).then((mres) => {
          const hasMintNum = mres["result"]["mintAmount"] || 0;
          let renuNumShow = totalNum - Number(hasMintNum);
          setRuneNum(renuNumShow);
        });
      });
    }
  }, [from2To1Data]);

  useEffect(() => {
    if (address) {
      setPremineReceiveAddress(address);
    }
  }, [address]);

  return (
    <div className="etch-blockBox">
      <EtchFlowPath flowType={1} flowName="mint"></EtchFlowPath>
      <div className="etch-formBox">
        <div className="etch-formItemBox">
          <div className="etch-formTitleBox">
            <span className="etch-star">*</span>
            <span className="etch-itemTitle">Rune</span>
          </div>
          <div className="etch-inputBox1">
            <input
              type="text"
              placeholder="12 letter identifier like ”ABCDE.FGHI”"
              value={rune}
              onChange={setRuneName}
              onBlur={checkRuneName}
            />
            <span className="etch-runePointer" onClick={addRunePoint}>•</span>
          </div>
          <p className="etch-formErrorTip etch-formErrorTipMintRune">
            <span>{runeErrorTip}</span>
            {rune && (
              <span>
                {rune} only has {runeNum} left to mint
              </span>
            )}
          </p>
        </div>
        <div className="etch-formItemBox">
          <div className="etch-formTitleBox">
            <span className="etch-star">*</span>
            <span className="etch-itemTitle">Repeat Mint</span>
          </div>
          <div className="etch-inputBox1 etch-mintAmontBox">
            <div className="etch-mitAmontInputBox">
              <input
                type="number"
                min={1}
                placeholder="1"
                value={mintAmount}
                onChange={setMintAmount}
              />
              <span className="etch-upArrow" onClick={addMinAmount}></span>
              <span className="etch-downArrow" onClick={subMinAmount}></span>
            </div>
            <div className="etch-amontRightBox">
              <p className="etch-amontRightTop">
                X {amountUnit} {rune}
              </p>
              <p className="etch-amontRightBottom">
                Total <span>{amountUnit * mintAmount}</span> {rune}
              </p>
            </div>
          </div>
          <p className="etch-formErrorTip">{mintAmountErrorTip}</p>
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
      </div>

      <div className="etch-bottomBalanceBox">
        <span className="etch-balanceTxt">Balance</span>
        <span className="etch-balanceNum">{balance.confirmed  / 1e8} BTC</span>
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
