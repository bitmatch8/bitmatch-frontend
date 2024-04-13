import React, { useMemo } from "react"
import EtchFlowPath from "@/components/EtchFlowPath"
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function Etching1() {
    const [rune, setRune] = React.useState('');

    const handleRuneChange = (event: SelectChangeEvent) => {
        setRune(event.target.value);
    };

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
                        <Select
                            value={rune}
                            onChange={handleRuneChange}
                            displayEmpty
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                        </Select>
                    </div>
                    <p className="etch-formErrorTip">Please input max supply!</p>
                </div>
                <div className="etch-formItemBox">
                    <div className="etch-formTitleBox">
                        <span className="etch-star">*</span>
                        <span className="etch-itemTitle">Amount</span>
                    </div>
                    <div className="etch-inputBox1">
                        <input type="text" placeholder="1" />
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