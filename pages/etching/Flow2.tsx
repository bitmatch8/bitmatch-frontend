import React, { useMemo } from "react";
import EtchFlowPath from "@/components/EtchFlowPath";
import TextTooltip from "@/components/TextTooltip";
import { encodeRunestoneUnsafe, RunestoneSpec } from "@/utils/runestone-lib";
import * as psbt from "@/utils/psbt";
import { useSelector, selectWallter, WallterType } from "@/lib/redux";

export default function Etching2(props: any) {
  const { formData, handleBackFlow2, flowName } = props;

  let formDataBack = JSON.parse(JSON.stringify(formData));
  delete formDataBack.flowIndex;

  const [sats, setSats] = React.useState(8);
  const [stasCurIndex, setStasCurIndex] = React.useState(1);
  const [inputStas3, setInputStas3] = React.useState(25);
  const { address, balance } = useSelector(selectWallter);

  const SatsTipText = useMemo(
    () => (
      <div className="etch-tipInnerBox">
        <p>Specify the amount of satoshis stored in each Rune.</p>
      </div>
    ),
    []
  );
  const ServiceTipText = useMemo(
    () => (
      <div className="etch-tipInnerBox">
        <p>Base Service Fee (fixed).</p>
      </div>
    ),
    []
  );
  const FeeTipText = useMemo(
    () => (
      <div className="etch-tipInnerBox">
        <p>Fee by size: 4.99%.</p>
      </div>
    ),
    []
  );

  const handleStas3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputStas3(Number(event.target.value));
    setSats(Number(event.target.value));
    setStasCurIndex(3);
  };

  const handleSats = (curIndex: number, num: number) => {
    setStasCurIndex(curIndex);
    if (curIndex !== 3) {
      setSats(num);
      return;
    }
    setSats(inputStas3);
  };
  const goBackFlow1 = () => {
    handleBackFlow2(flowName, 1);
  };

  //Sign & Pay Button
  const go2Pay = () => {
    console.log("第一个页面的表单数据", formData);
    console.log("第二个页面的sats选择", sats);

    //0.构建数据
    const {
      amount,
      cap,
      divisibility,
      end,
      premine,
      premineReceiveAddress,
      rune,
      start,
      timeType,
      offset,
    } = formData;

    const initRunesStone = {
      rune,
      divisibility,
      premine: BigInt(premine),
      spacers: [], //TODO: 需要计算一下
      symbol: "⧉",
    };
    let terms: any = {
      cap: BigInt(cap),
      amount: BigInt(amount),
    };
    if (timeType == "offset") {
      terms = {
        ...terms,
        offset: {
          start: BigInt(offset + start),
          end: BigInt(offset + end),
        },
      };
    } else {
      terms = {
        ...terms,
        height: {
          start: BigInt(start),
          end: BigInt(end),
        },
      };
    }
    const runesStone: RunestoneSpec = {
      etching: {
        ...initRunesStone,
        terms,
      },
    };

    //1.生成Buffer
    const opReturnOutput = encodeRunestoneUnsafe(runesStone);
    //2.sign/push
    // try {
    //   const payment = {
    //     addressType: psbt.getUnisatAddressType(address as string), //TODO: 映射不同的addressType
    //     address: address,
    //     publicKey: pubkey,
    //     amount: 1000, //TODO: 550写死
    //   };
    // }

    handleBackFlow2(flowName, 3);
  };

  //signPsbt
  const signPsbt = async (
    payment,
    ordinals,
    recipientAddress,
    feeRate,
    opReturnOutput,
    opNum
  ) => {
    try {
      const unsignedPsbt = await psbt.generatePsbt(
        payment,
        ordinals,
        recipientAddress,
        feeRate,
        opReturnOutput,
        opNum
      );

      if (!unsignedPsbt) {
        throw new Error();
      }

      // const unisat = (window as any).unisat;

      // const signedPsbtBase64 = await unisat.signPsbt(unsignedPsbt.psbtBase64);
      // const txid = await unisat.pushPsbt(signedPsbtBase64);

      // return txid;
    } catch (error) {
      throw new Error();
    }
  };

  return (
    <>
      <div className="etch-blockBox">
        <EtchFlowPath flowType={2} flowName="etching"></EtchFlowPath>
        <div className="etch-descBox">
          <div className="etch-descTopBackBox" onClick={goBackFlow1}>
            <span className="etch-flowTopBackBtn"></span>
            <span className="etch-flowTopBackTxt">Back</span>
          </div>
          <p className="etch-descTopPleaDou">
            Please double check your text below before continuing:
          </p>
          <p className="etch-descTopYouAre">
            You are about to Etching
            <span> 1 Rune</span>
          </p>
          <div className="etch-descTopDetailBox">
            <p className="etch-descDetailTopTxt">
              <span>Detail：</span>
              <span>～ 88vB</span>
            </p>
            <div className="etch-descWord">{JSON.stringify(formDataBack)}</div>
          </div>
        </div>
      </div>

      <div className="etch-blockBox etch-costBox">
        <div className="etch-cardBox">
          <div
            onClick={() => handleSats(1, 8)}
            className={stasCurIndex === 1 ? "cur" : ""}
          >
            <p className="etch-cardTopTit">Economy</p>
            <p className="etch-cardCenterNum">8</p>
            <p className="etch-cardSats">sats/vB</p>
            <p className="etch-cardWithin">Within hours to days</p>
          </div>
          <div
            onClick={() => handleSats(2, 12)}
            className={stasCurIndex === 2 ? "cur" : ""}
          >
            <p className="etch-cardTopTit">Normal</p>
            <p className="etch-cardCenterNum">12</p>
            <p className="etch-cardSats">sats/vB</p>
            <p className="etch-cardWithin">Within an hour</p>
          </div>
          <div
            onClick={() => handleSats(3, 25)}
            className={stasCurIndex === 3 ? "cur" : ""}
          >
            <p className="etch-cardTopTit">Custom</p>
            <div className="etch-cardCustomInput">
              <input type="text" value={inputStas3} onChange={handleStas3} />
            </div>
            <p className="etch-cardSats">sats/vB</p>
            <p className="etch-cardWithin">Within 30 mins</p>
          </div>
        </div>
        <p className="etch-theCurTip">
          <span></span>
          The current Bitcoin network is highly congested. please be patient and
          wait.
        </p>
        <p className="etch-timesShown">
          Times shown are not guaranteed. USD values are estimates only.
        </p>
        <div className="etch-countBox">
          <div className="etch-countItem">
            <span className="etch-countKeyName">Sats In Rune：</span>
            <TextTooltip arrow title={SatsTipText}>
              <span className="etch-countAskTip"></span>
            </TextTooltip>
            <span className="etch-countNull"></span>
            <span className="etch-countValue">1 X 546 sats</span>
            <span className="etch-countDoller">~$0.39</span>
          </div>
          <div className="etch-countItem">
            <span className="etch-countKeyName">Network Fee：</span>
            <span className="etch-countNoAskTip"></span>
            <span className="etch-countNull"></span>
            <span className="etch-countValue">2210 sats</span>
            <span className="etch-countDoller">~$0.39</span>
          </div>
          <div className="etch-countLine"></div>
          <div className="etch-countItem">
            <span className="etch-countKeyName">Service Fee：</span>
            <TextTooltip arrow title={ServiceTipText}>
              <span className="etch-countAskTip"></span>
            </TextTooltip>
            <span className="etch-countNull"></span>
            <span className="etch-countValue">2000 sats</span>
            <span className="etch-countDoller">~$1.42</span>
          </div>
          <div className="etch-countItem">
            <span className="etch-countKeyName">Fee by Size：</span>
            <TextTooltip arrow title={FeeTipText}>
              <span className="etch-countAskTip"></span>
            </TextTooltip>
            <span className="etch-countNull"></span>
            <span className="etch-countValue">111 sats</span>
            <span className="etch-countDoller">~$0.04</span>
          </div>
          <div className="etch-countLine"></div>
          <div className="etch-countItem">
            <span className="etch-countKeyName">Total：</span>
            <span className="etch-countNoAskTip"></span>
            <span className="etch-countNull"></span>
            <span className="etch-countValue">4867 sats</span>
            <span className="etch-countDoller">~$2.75</span>
          </div>
        </div>

        <div className="etch-bottomBalanceBox">
          <span className="etch-balanceTxt">Balance</span>
          <span className="etch-balanceNum">1.23456789 BTC</span>
        </div>
        <div className="etch-bottomBtn" onClick={go2Pay}>
          Pay & Etching
        </div>
      </div>
    </>
  );
}
