import React, { useEffect } from "react"
import EtchFlowPath from "@/components/EtchFlowPath"

export default function Etching1() {
    const [rune, setRune] = React.useState("");
    const [runeErrorTip, setRuneErrorTip] = React.useState("");
    const [mintAmount, setMmintAmount] = React.useState(1);
    const [totalMintAmount, setTotalMintAmount] = React.useState(2100);
    

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
    const setMintAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMmintAmount(event.target.value);
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
                            placeholder="12 letter identifier like ”ABCDE·FGHI”"
                            value={rune}
                            onChange={setRuneName}
                            onBlur={checkRuneName}
                        />
                    </div>
                    <p className="etch-formErrorTip">{ runeErrorTip }</p>
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
                        <span className="etch-itemTitle">Receive Address</span>
                    </div>
                    <div className="etch-inputBox1">
                        <input type="text" placeholder="bc1p…" />
                    </div>
                    <p className="etch-formErrorTip"></p>
                </div>
            </div>

            <div className="etch-bottomBalanceBox">
                <span className="etch-balanceTxt">Balance</span>
                <span className="etch-balanceNum">1.23456789 BTC</span>
            </div>
            <div className="etch-bottomBtn">Connect wallet</div>
            <div className="etch-bottomBtn">
                Next
            </div>
            <div className="etch-bottomBtn">
                Next
                <span className="etch-bottomBtnLoading"></span>
            </div>
        </div>
    )
}