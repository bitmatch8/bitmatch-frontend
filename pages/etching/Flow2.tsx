import React, { useMemo, useState, useEffect } from "react";
import EtchFlowPath from "@/components/EtchFlowPath";
import TextTooltip from "@/components/TextTooltip";
import { encodeRunestone, RunestoneSpec } from "@/utils/runestone-lib";
import * as psbt from "@/utils/psbt";
import { useSelector, selectWallter, useDispatch, addToast } from "@/lib/redux";

export default function Etching2(props: any) {
  const { formData, handleBackFlow2, flowName } = props;

  let formDataBack = JSON.parse(JSON.stringify(formData));
  delete formDataBack.flowIndex;

  const [sats, setSats] = React.useState(12);
  const [stasCurIndex, setStasCurIndex] = React.useState(2);
  const [inputStas3, setInputStas3] = React.useState(25);
  const [etchingLoading, setEtchingLoading] = useState(false);
  const { address, balance, wallterType } = useSelector(selectWallter);
  const [satsInRuneDoller, setSatsInRuneDoller] = React.useState("");
  const [serviceFeeeDolloer, setServiceFeeeDolloer] = React.useState("");
  const [unsignedPsbt, setUnsignedPsbt] = useState<any>(null);
  const [byteNum, setByteNum] = React.useState(88);
  const [networkFeeShow, setNetworkFeeShow] = React.useState(0);
  const [networkFeeDollerShow, setNetworkFeeDollerShow] = React.useState("");
  const [feeBySizeShow, setFeeBySizeShow] = React.useState("");
  const [feeBySizeDolloerShow, setFeeBySizeDolloerShow] = React.useState("");
  const [totalNumDomShow, setTotalNumDomShow] = React.useState("");
  const [totalDollerDomShow, setTotalDollerDomShow] = React.useState("");
  const dispatch = useDispatch();

  const getBTCPrice = () => {
    return new Promise((resolve, reject) => {
      fetch("https://api.pro.coinbase.com/products/BTC-USD/ticker")
        .then((response) => response.json())
        .then((data) => {
          const bitcoinPrice = data.price;
          resolve(bitcoinPrice);
        })
        .catch((error) => console.error("获取比特币价格时出错：", error));
    });
  };

  const wallet =
    wallterType === "okx" ? window.okxwallet?.bitcoin : window.unisat;

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

  const go2Pay = async () => {
    const addressType = psbt.getUnisatAddressType(address as string);
    if (
      addressType == psbt.ADDRESS_TYPE_P2PKH ||
      addressType === psbt.ADDRESS_TYPE_P2SH_P2WPKH
    ) {
      dispatch(
        addToast({
          contxt: "The current address type is not supported, please switch",
          icon: "warning",
        })
      );
      return;
    }
    setEtchingLoading(true);
    if (!unsignedPsbt) {
      setEtchingLoading(false);
      throw new Error("unsignedPsbt error");
    }

    try {
      const signedPsbtBase64 = await wallet.signPsbt(unsignedPsbt.psbtBase64);
      const txid = await wallet.pushPsbt(signedPsbtBase64);
      console.log("txid", txid);
      if (txid) {
        handleBackFlow2(flowName, 3, txid);
      } else {
        throw new Error("unisat sign & push failed");
      }
      setEtchingLoading(false);
    } catch (e: any) {
      setEtchingLoading(false);
      console.log(e);
    }
  };
  //Psbt
  const initPsbt = async () => {
    console.log("第一个页面的表单数据1", formData);
    try {
      //0.构建数据
      const {
        mintAmount, //页面上mint第一步的Amount
        premineReceiveAddress, //页面上etching/min/transfer第一步三个Receive Address相关字段都传这个
      } = formData;
      const runesStone = generateRunesStoneData();

      // const runesStone = {
      //   etching: {
      //     rune: "RUNE",
      //     symbol: "$",
      //     premine: BigInt(10000),
      //     terms: {
      //       cap: BigInt(10000),
      //       amount: BigInt(10),
      //     },
      //   },
      //   // mint: {
      //   //   block: 2585958,
      //   //   tx: 114,
      //   // },
      //   // pointer: 0,
      //   // edicts: [
      //   //   {
      //   //     id: {
      //   //       block: 2585958,
      //   //       tx: 114,
      //   //     },
      //   //     amount: 2, // tranfer的总量
      //   //     output: 0, //默认先写0，后面再调整具体
      //   //   },
      //   // ],
      // };

      //1.生成Buffer
      const opReturnOutput = encodeRunestone(runesStone);
      console.log("----opReturnOutput----", opReturnOutput.encodedRunestone);
      //2.sign/push
      const payment = {
        addressType: psbt.getUnisatAddressType(address as string),
        address: address,
        publicKey: await wallet.getPublicKey(),
        amount: psbt.LOWEST_FEE,
      };
      console.log("----payment----", payment);
      //3.得到交易结果
      const unsignedPsbt = await psbt.generatePsbt(
        payment,
        null,
        premineReceiveAddress,
        sats,
        opReturnOutput.encodedRunestone,
        flowName == "mint" ? mintAmount : 1
      );
      console.log("----unsignedPsbt----", unsignedPsbt);
      setUnsignedPsbt(unsignedPsbt);
      setByteNum((unsignedPsbt as any).vsize);
    } catch (e: any) {
      throw new Error(e);
    }
  };

  //生成 runesStone 数据
  const generateRunesStoneData = () => {
    const {
      amount,
      cap,
      divisibility,
      end,
      premine,
      rune,
      start,
      timeType,
      transferAmount, //页面上transfer第一步的Amount
      tx, //根据符文名称请求符文信息接口，接口返回的 tx hash/index
      block, //根据符文名称请求符文信息接口，接口返回的 block height
      publicMintChecked = false,
    } = formData;

    let runesStone: RunestoneSpec = {};

    if (flowName == "etching") {
      const initRunesStone = {
        runeName: rune,
        divisibility: divisibility,
        premine: BigInt(premine),
        spacers: psbt.getSpacers(rune),
        symbol: "⧉",
      };
      let terms: any = {};
      if (publicMintChecked) {
        terms = {
          cap: BigInt(cap),
          amount: BigInt(amount),
        };
        if (timeType == "offset") {
          terms = {
            ...terms,
            // offset: {
            //   start: BigInt(start),
            //   end: BigInt(end),
            // },
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
      }
      runesStone = publicMintChecked
        ? {
            etching: {
              ...initRunesStone,
              terms,
            },
          }
        : {
            etching: {
              ...initRunesStone,
            },
          };
    } else if (flowName === "mint") {
      runesStone = {
        mint: {
          block: BigInt(block),
          tx: tx,
        },
        pointer: 0,
      };
    } else if (flowName == "transfer") {
      runesStone = {
        edicts: [
          {
            id: {
              block: BigInt(block),
              tx: tx,
            },
            amount: BigInt(transferAmount),
            output: 0,
          },
        ],
      };
    }
    console.log("----runesStone----", runesStone);
    return runesStone;
  };
  const satsToUSD = (sats: number, bitcoinPriceUSD: any) => {
    const bitcoinAmount = sats / 100000000; // 将 sats 转换为比特币
    const amountInUSD = bitcoinAmount * Number(bitcoinPriceUSD); // 将比特币转换为美元
    return amountInUSD;
  };

  const getDollers = async () => {
    const btcPrice = await getBTCPrice();
    const satsDollerValue = satsToUSD(546, btcPrice);
    const satsDollerValueShow = Number(satsDollerValue).toFixed(2);
    setSatsInRuneDoller(satsDollerValueShow);
    const serviceFeeValue = satsToUSD(2000, btcPrice);
    const serviceFeeValueShow = Number(serviceFeeValue).toFixed(2);
    setServiceFeeeDolloer(serviceFeeValueShow);
  };

  const getNetworkFeeDoller = async (sats: any, byteNum: any) => {
    // 获取比特币当前价格
    const btcPrice = await getBTCPrice();
    // 获取Network Fee是多少聪
    const networkFeeSats = sats * byteNum;
    setNetworkFeeShow(networkFeeSats);
    // 根据聪费率转换美元
    const networkFeeDoller = satsToUSD(networkFeeSats, btcPrice);
    const netFeeDollerShow = Number(networkFeeDoller).toFixed(2);
    setNetworkFeeDollerShow(netFeeDollerShow);
    // Fee by Size 的展示
    const feeSize = Number(networkFeeSats) * 0.05;
    const feeSizeShow = (Number(networkFeeSats) * 0.05).toFixed(2);
    setFeeBySizeShow(String(feeSizeShow));
    const feeSizeDoller = satsToUSD(feeSize, btcPrice);
    const feeSizeDollerShow = feeSizeDoller.toFixed(2);
    setFeeBySizeDolloerShow(String(feeSizeDollerShow));
    // 总价的计算展示
    const totalNum = 546 + 2000 + networkFeeSats + feeSize;
    const totalNumShow = totalNum.toFixed(2);
    setTotalNumDomShow(totalNumShow);
    const totalDollerNum = satsToUSD(totalNum, btcPrice);
    const totalDollerNumShow = totalDollerNum.toFixed(2);
    setTotalDollerDomShow(totalDollerNumShow);
  };

  useEffect(() => {
    getDollers();
  }, []);

  useEffect(() => {
    initPsbt();
  }, []);

  // 计算Network Fee
  useEffect(() => {
    getNetworkFeeDoller(sats, byteNum);
  }, [sats, byteNum]);

  const btnText = useMemo(() => {
    if (flowName === "etching") {
      return {
        submitText: "Pay & Etching",
        loadingText: "Etching",
      };
    } else if (flowName === "mint") {
      return {
        submitText: "Mint",
        loadingText: "Minting",
      };
    } else if (flowName === "transfer") {
      return {
        submitText: "Transfer",
        loadingText: "Transfer",
      };
    }
  }, [flowName]);

  return (
    <>
      <div className="etch-blockBox">
        <EtchFlowPath flowType={2} flowName={flowName}></EtchFlowPath>
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
            <span className="etch-countDoller">~${satsInRuneDoller}</span>
          </div>
          <div className="etch-countItem">
            <span className="etch-countKeyName">Network Fee：</span>
            <span className="etch-countNoAskTip"></span>
            <span className="etch-countNull"></span>
            <span className="etch-countValue">{networkFeeShow} sats</span>
            <span className="etch-countDoller">~${networkFeeDollerShow}</span>
          </div>
          <div className="etch-countLine"></div>
          <div className="etch-countItem">
            <span className="etch-countKeyName">Service Fee：</span>
            <TextTooltip arrow title={ServiceTipText}>
              <span className="etch-countAskTip"></span>
            </TextTooltip>
            <span className="etch-countNull"></span>
            <span className="etch-countValue">2000 sats</span>
            <span className="etch-countDoller">~${serviceFeeeDolloer}</span>
          </div>
          <div className="etch-countItem">
            <span className="etch-countKeyName">Fee by Size：</span>
            <TextTooltip arrow title={FeeTipText}>
              <span className="etch-countAskTip"></span>
            </TextTooltip>
            <span className="etch-countNull"></span>
            <span className="etch-countValue">{feeBySizeShow} sats</span>
            <span className="etch-countDoller">~${feeBySizeDolloerShow}</span>
          </div>
          <div className="etch-countLine"></div>
          <div className="etch-countItem">
            <span className="etch-countKeyName">Total：</span>
            <span className="etch-countNoAskTip"></span>
            <span className="etch-countNull"></span>
            <span className="etch-countValue">{totalNumDomShow} sats</span>
            <span className="etch-countDoller">~${totalDollerDomShow}</span>
          </div>
        </div>

        <div className="etch-bottomBalanceBox">
          <span className="etch-balanceTxt">Balance</span>
          <span className="etch-balanceNum">{balance.total / 1e8} BTC</span>
        </div>
        {balance.total < psbt.LOWEST_FEE ? (
          <div className="etch-bottomBtn etch-bottomBtnLoading">
            Insufficient Balance
          </div>
        ) : (
          <>
            {etchingLoading ? (
              <div className="etch-bottomBtn etch-bottomBtnLoading">
                {btnText?.loadingText}
                <span className="etch-bottomBtnLoading"></span>
              </div>
            ) : (
              <div className="etch-bottomBtn" onClick={go2Pay}>
                {btnText?.submitText}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
