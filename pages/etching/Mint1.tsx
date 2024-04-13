import React, { useMemo } from "react"
import EtchFlowPath from "@/components/EtchFlowPath"
import TextTooltip from "@/components/TextTooltip"
import { Switch } from "@mui/material"

export default function Etching1() {
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
                        <input type="text" placeholder="12 letter identifier like ”ABCDE·FGHI”" />
                    </div>
                    <p className="etch-formErrorTip">Please input max supply!</p>
                </div>
                <div className="etch-formItemBox">
                    <div className="etch-formTitleBox">
                        <span className="etch-star">*</span>
                        <span className="etch-itemTitle">Amount</span>
                    </div>
                    <div className="etch-inputBox1 etch-mintAmontBox">
                        <div className="etch-mitAmontInputBox">
                            <input type="number" min={1} placeholder="1" />
                        </div>
                        <div className="etch-amontRightBox">
                            <p className="etch-amontRightTop">X 2100 ABCDE·FGHI</p>
                            <p className="etch-amontRightBottom">Total <span>2100</span> ABCDE·FGHI</p>
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