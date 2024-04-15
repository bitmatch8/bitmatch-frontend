import React, { useMemo } from "react"
import EtchFlowPath from "@/components/EtchFlowPath"
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {
    useSelector,
    selectWallter,
    WallterType,
    useDispatch,
    connectUnisat,
  } from "@/lib/redux";
import { ConnectModal } from "@/components/Page/TopBar/ConnectButton";
import useModal from "@/hook/useModal";

export default function Etching1(props: any) {
    const { handleBackData } = props;
    const [rune, setRune] = React.useState('');
    const [runeErrorTip, setRuneErrorTip] = React.useState('');
    const [amount, setAamount] = React.useState('');
    const [amountErrorTip, setAmountErrorTip] = React.useState('');
    const [premineReceiveAddress, setPremineReceiveAddress] = React.useState("");
    const [premineReceiveAddressErrorTip, setPremineReceiveAddressErrorTip] =
    React.useState("");

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

    const handleRuneChange = (event: SelectChangeEvent) => {
        setRune(event.target.value);
    };
    const setAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAamount(event.target.value);
    };
    const checkAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        let amontValue = event.target.value;
        if (
            isNaN(Number(amontValue)) ||
            Number(amontValue) <= 0 ||
            Number(amontValue) % 1 !== 0
        ) {
            setAmountErrorTip("Amount must be a positive integer");
            setAamount("");
            return;
        }
        setAmountErrorTip("");
    };
    const setPremineRecAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPremineReceiveAddress(event.target.value);
    };
    const checkPremineRecAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
        const premineAddressValue = event.target.value;
        if (!premineAddressValue) {
            setPremineReceiveAddressErrorTip("Please input Receive Address");
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
        if (!amount) {
            setAmountErrorTip("Please input Amount");
            return false;
        }
        if (amountErrorTip) {
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
            transferAmount: amount,
            premineReceiveAddress,
        };
        
        handleBackData(callbackData);
    };

    return (
        <div className="etch-blockBox">
            <EtchFlowPath flowType={1} flowName="transfer"></EtchFlowPath>
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
                    <p className="etch-formErrorTip">{ runeErrorTip }</p>
                </div>
                <div className="etch-formItemBox">
                    <div className="etch-formTitleBox">
                        <span className="etch-star">*</span>
                        <span className="etch-itemTitle">Amount</span>
                    </div>
                    <div className="etch-inputBox1">
                        <input type="text" placeholder="1" value={amount} onChange={setAmount} onBlur={checkAmount} />
                    </div>
                    <p className="etch-formErrorTip">{ amountErrorTip }</p>
                </div>
                <div className="etch-formItemBox">
                    <div className="etch-formTitleBox">
                        <span className="etch-star">*</span>
                        <span className="etch-itemTitle">Receive Address</span>
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