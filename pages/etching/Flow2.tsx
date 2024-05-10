import React, { useMemo, useState, useEffect } from "react";
import EtchFlowPath from "@/components/EtchFlowPath";
import TextTooltip from "@/components/TextTooltip";
import { encodeRunestone } from '@magiceden-oss/runestone-lib';
import * as psbt from "@/utils/psbt";
import { useSelector, selectWallter, useDispatch, addToast } from "@/lib/redux";
import { fetchEtching, fetchMintSubmit } from '@/api/api'
export default function Etching2(props: any) {
  const { formData, handleBackFlow2, flowName } = props;

  let formDataBack = JSON.parse(JSON.stringify(formData));
  delete formDataBack.flowIndex;

  const [sats, setSats] = React.useState(0);
  const [stasCurIndex, setStasCurIndex] = React.useState(2);
  const [sat1, setSat1] = React.useState(0);
  const [sat2, setSat2] = React.useState(0);
  const [inputStas3, setInputStas3] = React.useState("0");
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
  const [etchingReceiverAddress, setEtchingReceiverAddress] = useState<string>('')
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
    const stas3Val = event.target.value;
    if (stas3Val && (isNaN(Number(stas3Val)) || Number(stas3Val) <= 0)) {
      return;
    }
    setInputStas3(event.target.value);
    setSats(Number(event.target.value));
    setStasCurIndex(3);
  };
  const handleCheckStas3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const stas3Val = event.target.value;
    if (Number(stas3Val) <= Number(sat1) || !stas3Val) {
      const nowSat1 = Number(sat1) + 1;
      setInputStas3(String(nowSat1));
      setSats(nowSat1);
    }
  };

  const handleSats = (curIndex: number, num: number) => {
    setStasCurIndex(curIndex);
    if (curIndex !== 3) {
      setSats(num);
      return;
    }
    setSats(Number(inputStas3));
  };
  const goBackFlow1 = () => {
    handleBackFlow2(flowName, 1, formData);
  };

  const go2Pay = async () => {
    //若非p2tr地址不允许sign&pay
    const addressType = psbt.getUnisatAddressType(address as string);
    if (
      addressType !== psbt.ADDRESS_TYPE_P2TR
    ) {
      dispatch(
        addToast({
          contxt: "The current address type is not supported, please switch",
          icon: "warning",
        })
      );
      return;
    }
    //可以sign&pay
    setEtchingLoading(true);
    //etching
    if (flowName === 'etching') {
      console.log('totalNumDomShow', totalNumDomShow)
      if (!etchingReceiverAddress) {
        setEtchingLoading(false);
        return
      }
      try {
        const txhash = await wallet.sendBitcoin(etchingReceiverAddress, Number(totalNumDomShow))
        if (txhash) {
          handleBackFlow2(flowName, 3, txhash);
        } else {
          throw new Error("unisat sign & push failed");
        }
        setEtchingLoading(false);
      } catch (e) {
        setEtchingLoading(false);
      }
      return
    }
    //mint|transter
    if (!unsignedPsbt) {
      setEtchingLoading(false);
      throw new Error("unsignedPsbt error");
    }

    try {
      const signedPsbtBase64 = await wallet.signPsbt(unsignedPsbt.psbtBase64);
      const txid = await wallet.pushPsbt(signedPsbtBase64);
      console.log("txid", txid);
      if (txid) {
        const { rune, mintAmount, premineReceiveAddress } = formData
        fetchMintSubmit({ hash: txid, runename: rune, amount: mintAmount, receiveaddress: premineReceiveAddress }).then(res => {
          if (res.code === 0) {
            handleBackFlow2(flowName, 3, txid);
          }
        }).finally(() => {
          setEtchingLoading(false);
        })
      } else {
        throw new Error("unisat sign & push failed");
      }
      setEtchingLoading(false);
    } catch (e: any) {
      setEtchingLoading(false);
      console.log(e);
    }
  };
  // init Psbt
  const initPsbt = async () => {
    console.log("第一个页面的表单数据1", formData);
    try {
      //0.构建数据
      const {
        mintAmount, //页面上mint第一步的Amount
        premineReceiveAddress, //页面上etching/min/transfer第一步三个Receive Address相关字段都传这个
      } = formData;
      const runesStone = generateRunesStoneData();
      console.log("----runesStone----", runesStone);
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
        premineReceiveAddress || address,
        sats,
        opReturnOutput.encodedRunestone,
        flowName == "mint" ? mintAmount : 1
      );
      console.log("----unsignedPsbt----", unsignedPsbt);
      setUnsignedPsbt(unsignedPsbt);
      setByteNum((unsignedPsbt as any).vsize || 0);

    } catch (e: any) {
      throw new Error(e);
    }
  };

  //init etching
  const initEtching = async () => {
    const {
      amount = '0',
      cap = '0',
      end,
      premine = '0',
      rune,
      start,
      timeType,
      publicMintChecked = false,
      symbol,
      turbo = false,
      premineReceiveAddress
    } = formData;

    // etching的情况下，虚拟字节需要自己算
    const utf8Bytes = new TextEncoder().encode(rune);
    setByteNum(utf8Bytes.length);

    let submitData: any = {
      sender: address,
      rune_name: rune,
      divisibility: 0,
      premine,
      symbol: symbol == '' ? '¤' : symbol,
      capacity: cap,
      mint_amount: amount,
      offset_start: 0,
      offset_end: 0,
      start_height: 0,
      end_height: 0,
      turbo,
      receiver_addr: premineReceiveAddress || address,
      fee_rate: sats,
    }
    if (publicMintChecked) {
      if (timeType == 'offset') {
        submitData = {
          ...submitData,
          offset_start: start,
          offset_end: end,
          start_height: 0,
          end_height: 0
        }
      } else {
        submitData = {
          ...submitData,
          offset_start: 0,
          offset_end: 0,
          start_height: start,
          end_height: end
        }
      }
    }
    console.log('submitData', submitData)
    const res = await fetchEtching(submitData)
    console.log('res', res)
    const { code, result } = res
    if (code == 0) {
      const { receiver, network_fee } = result?.result;
      setNetworkFeeShow(Number(network_fee));
      setEtchingReceiverAddress(receiver)
    }
  }
  //生成 runesStone 数据
  const generateRunesStoneData = () => {
    const {
      transferAmount, //页面上transfer第一步的Amount
      tx, //根据符文名称请求符文信息接口，接口返回的 tx hash/index
      block, //根据符文名称请求符文信息接口，接口返回的 block height
    } = formData;

    let runesStone = {};

    if (flowName === "mint") {
      runesStone = {
        mint: {
          block: BigInt(block),
          tx: Number(tx),
        },
        pointer: 0,
      };
    } else if (flowName == "transfer") {
      runesStone = {
        edicts: [
          {
            id: {
              block: BigInt(block),
              tx: Number(tx),
            },
            amount: BigInt(transferAmount),
            output: 0,
          },
        ],
      };
    }
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

  const getNetworkFeeDoller = async (networkFeeShow: number) => {
    // 获取比特币当前价格
    const btcPrice = await getBTCPrice();
    // 获取Network Fee是多少聪
    // const networkFeeSats = sats * byteNum;
    // setNetworkFeeShow(String(Math.ceil(networkFeeSats)));
    // 根据聪费率转换美元
    const networkFeeDoller = satsToUSD(networkFeeShow, btcPrice);
    const netFeeDollerShow = Number(networkFeeDoller).toFixed(2);
    setNetworkFeeDollerShow(netFeeDollerShow);
    // Fee by Size 的展示
    const feeSize = Number(networkFeeShow) * 0.05;
    setFeeBySizeShow(String(Math.ceil(networkFeeShow * 0.05)));
    const feeSizeDoller = satsToUSD(feeSize, btcPrice);
    const feeSizeDollerShow = feeSizeDoller.toFixed(2);
    setFeeBySizeDolloerShow(String(feeSizeDollerShow));
    // 总价的计算展示
    const totalNum = 546 + 2000 + networkFeeShow + feeSize;
    setTotalNumDomShow(String(Math.ceil(totalNum)));
    const totalDollerNum = satsToUSD(totalNum, btcPrice);
    const totalDollerNumShow = totalDollerNum.toFixed(2);
    setTotalDollerDomShow(totalDollerNumShow);
  };

  const getDefaultSat = () => {
    let satUrl = 'https://mempool.space/api/v1/fees/recommended';
    if (process.env.NEXT_PUBLIC_NETWORK === "testnet") {
      satUrl = 'https://mempool.space/testnet/api/v1/fees/recommended';
    }
    fetch(satUrl)
      .then((response) => response.json())
      .then((data) => {
        const sat1 = data.hourFee;
        const sat2 = data.halfHourFee;
        const sat3 = data.fastestFee;
        setSat1(sat1);
        setSat2(sat2);
        setInputStas3(sat3);
        setSats(sat2);
      })
      .catch(() => {
        const sat1 = 8;
        const sat2 = 12;
        const sat3 = '25';
        setSat1(sat1);
        setSat2(sat2);
        setInputStas3(sat3);
        setSats(sat2);
      });
  }

  useEffect(() => {
    getDollers();
  }, []);

  // 计算Network Fee
  useEffect(() => {
    getNetworkFeeDoller(networkFeeShow);
  }, [networkFeeShow]);

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

  useEffect(() => {
    getDefaultSat();
  }, [])

  useEffect(() => {
    if (Number(sats) === 0) {
      return;
    }
    if (flowName == 'etching') {
      initEtching()
    } else {
      initPsbt();
    }
  }, [sats]);

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
              <span>～ {byteNum}vB</span>
            </p>
            <div className="etch-descWord">Etching {formDataBack.rune}</div>
          </div>
        </div>
      </div>

      <div className="etch-blockBox etch-costBox">
        <div className="etch-cardBox">
          <div
            onClick={() => handleSats(1, sat1)}
            className={stasCurIndex === 1 ? "cur" : ""}
          >
            <p className="etch-cardTopTit">Economy</p>
            <p className="etch-cardCenterNum">{sat1}</p>
            <p className="etch-cardSats">sats/vB</p>
            <p className="etch-cardWithin">Within hours to days</p>
          </div>
          <div
            onClick={() => handleSats(2, sat2)}
            className={stasCurIndex === 2 ? "cur" : ""}
          >
            <p className="etch-cardTopTit">Normal</p>
            <p className="etch-cardCenterNum">{sat2}</p>
            <p className="etch-cardSats">sats/vB</p>
            <p className="etch-cardWithin">Within an hour</p>
          </div>
          <div
            onClick={() => handleSats(3, Number(inputStas3))}
            className={stasCurIndex === 3 ? "cur" : ""}
          >
            <p className="etch-cardTopTit">Custom</p>
            <div className="etch-cardCustomInput">
              <input
                type="text"
                value={inputStas3}
                onChange={handleStas3}
                onBlur={handleCheckStas3}
              />
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
          <span className="etch-balanceNum">{balance.confirmed / 1e8} BTC</span>
        </div>
        {balance.confirmed < Number(totalNumDomShow) ? (
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
