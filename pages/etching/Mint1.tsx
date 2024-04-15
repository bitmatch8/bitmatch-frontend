import React, { useEffect } from "react"
import EtchFlowPath from "@/components/EtchFlowPath"
import {
    useSelector,
    selectWallter,
    WallterType,
    useDispatch,
    connectUnisat,
  } from "@/lib/redux";
import { ConnectModal } from "@/components/Page/TopBar/ConnectButton";
import useModal from "@/hook/useModal";
import { fetchRuneInfoByRuneName, fetchHasMintAmount } from "@/api/api";
import useSwr from "@/hook/useSwr";

export default function Mint1(props: any) {
    const { handleBackData } = props;

    const [rune, setRune] = React.useState("");
    const [runeNum, setRuneNum] = React.useState(0);
    const [runeErrorTip, setRuneErrorTip] = React.useState("");
    const [mintAmount, setMmintAmount] = React.useState(1);
    const [totalMintAmount, setTotalMintAmount] = React.useState(2100);
    const [premineReceiveAddress, setPremineReceiveAddress] = React.useState("");
    const [premineReceiveAddressErrorTip, setPremineReceiveAddressErrorTip] =
    React.useState("");
    const [block, setBlock] = React.useState(0);
    const [tx, setTx] = React.useState('');

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
        if (charArr.length !== 13) {
            setRuneErrorTip("Rune must 13 letters");
            setRune("");
            return;
        }
        if (isUpperLetter) {
            setRuneErrorTip("Characters must be all uppercase");
            setRune("");
            return;
        }
        setRuneErrorTip("");

        // 获取所需的tx和block数据
        fetchRuneInfoByRuneName(runeVal).then((res) => {
            setTx(res['result']['rune']['txid']);
            setBlock(res['result']['rune']['height']);
            // 获取剩余可Mint数量
            const premineNum = res['result']['rune']['premine'] || 0;
            const capacityNum = res['result']['rune']['capacity'] || 0;
            let totalNum = premineNum + capacityNum;
            fetchHasMintAmount(runeVal).then((mres) => {
                const hasMintNum = mres['result']['mintAmount'];
                let renuNumShow = totalNum - hasMintNum;
                setRuneNum(renuNumShow);
            })
        })
        
    };
    const setMintAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMmintAmount(Number(event.target.value));
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
        if (!premineReceiveAddress) {
            setPremineReceiveAddressErrorTip("Please input Premine Receive Address");
            return false;
        }
        return true;
    }

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
            tx,
        };
        
        handleBackData(callbackData);
    };

    useEffect(() => {
        setTotalMintAmount(2100*mintAmount);
    }, [mintAmount])

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
                            placeholder="13 letter identifier like ”ABCDE·FGHI”"
                            value={rune}
                            onChange={setRuneName}
                            onBlur={checkRuneName}
                        />
                    </div>
                    <p className="etch-formErrorTip etch-formErrorTipMintRune">
                        <span>{ runeErrorTip }</span>
                        {
                            rune && <span>{ rune } only has { runeNum } left to mint</span>
                        }
                    </p>
                </div>
                <div className="etch-formItemBox">
                    <div className="etch-formTitleBox">
                        <span className="etch-star">*</span>
                        <span className="etch-itemTitle">Amount</span>
                    </div>
                    <div className="etch-inputBox1 etch-mintAmontBox">
                        <div className="etch-mitAmontInputBox">
                            <input type="number" min={1} placeholder="1" value={mintAmount} onChange={setMintAmount} />
                        </div>
                        <div className="etch-amontRightBox">
                            <p className="etch-amontRightTop">X 2100 {rune}</p>
                            <p className="etch-amontRightBottom">Total <span>{totalMintAmount}</span> {rune}</p>
                        </div>
                    </div>
                    <p className="etch-formErrorTip"></p>
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
    )
}