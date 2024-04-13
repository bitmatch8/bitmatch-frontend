import React, { useMemo } from "react"
import EtchFlowPath from "@/components/EtchFlowPath"
import TextTooltip from "@/components/TextTooltip"
import { Switch } from "@mui/material"

export default function Etching1() {
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const RuneTipText = useMemo(()=>(
        <div className="etch-tipInnerBox">
            <p>12 characters</p>
            <p>Can contain a "·" between characters.</p>
        </div>
    ),[])
    const RuneOffsetTipText = useMemo(()=>(
        <div className="etch-tipInnerBox">
            <p>After Etching to the height to start Mint</p>
        </div>
    ),[])
    const RuneHieghtTipText = useMemo(()=>(
        <div className="etch-tipInnerBox">
            <p>Open Minting start height and end height</p>
        </div>
    ),[])

    

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
                        <input type="text" placeholder="12 letter identifier like ”ABCDE·FGHI”" />
                    </div>
                    <p className="etch-formErrorTip">Please input max supply!</p>
                </div>
                <div className="etch-formItemBox">
                    <div className="etch-formTitleBox">
                        <span className="etch-star">*</span>
                        <span className="etch-itemTitle">Premine Amount</span>
                    </div>
                    <div className="etch-inputBox1">
                        <input type="text" placeholder="21000000" />
                    </div>
                    <p className="etch-formErrorTip"></p>
                </div>
                <div className="etch-formItemBox">
                    <div className="etch-formTitleBox">
                        <span className="etch-star">*</span>
                        <span className="etch-itemTitle">Premine Receive Address</span>
                    </div>
                    <div className="etch-inputBox1">
                        <input type="text" placeholder="bc1p…" />
                    </div>
                    <p className="etch-formErrorTip"></p>
                </div>

                <div className="etch-mintSetBtnBox">
                    <span className="etch-mintSetTit">Public Mint</span>
                    <div className="etch-mintSetSwitchBox">
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
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
                                    <input type="text" placeholder="21000000" />
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
                                    <input type="text" placeholder="2100" />
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
                                <div className="etch-inputBox1 etch-timeType cur">
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
                                <div className="etch-inputBox1 etch-timeType">
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
                            <input type="text" />
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
                                    <input type="text" placeholder="8400000" className="etch-mintHeightInput" />
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
                                    <input type="text" placeholder="2100" className="etch-mintHeightInput" />
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