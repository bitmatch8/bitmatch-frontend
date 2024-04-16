import React, { useMemo } from "react";
import EtchFlowPath from "@/components/EtchFlowPath";
import copy from "copy-to-clipboard";
import { useSelector, selectWallter } from "@/lib/redux";
import * as psbt from "@/utils/psbt";
export default function Etching3(props: any) {
  const { flowName, handleBackFlow3, flow3TxHash, formData } = props;

  let formDataBack = JSON.parse(JSON.stringify(formData));
  delete formDataBack.flowIndex;

  const [isCopiedHash, setIsCopiedHash] = React.useState(false);
  const { network } = useSelector(selectWallter);

  const go2Flow1 = () => {
    handleBackFlow3(flowName);
  };
  const go2mmp = () => {
    const url =
      network === "testnet"
        ? `${psbt.TESTNET_NETWORK_URL}/tx/${flow3TxHash}`
        : `${psbt.LIVENET_NETWORK_URL}/tx/${flow3TxHash}`;
    window.open(url, "_blank");
  };
  const go2CopyHash = () => {
    copy(flow3TxHash);
    setIsCopiedHash(true);
    setTimeout(() => {
      setIsCopiedHash(false);
    }, 3000);
  };

  return (
    <>
      <div className="etch-blockBox">
        <EtchFlowPath flowType={3} flowName={flowName}></EtchFlowPath>
        <div className="etch-descBox">
          <p className="etch-detailTit">Rune Detail</p>
          <div className="etch-detailContent">
            {JSON.stringify(formDataBack)}
          </div>
        </div>
      </div>
      <div className="etch-blockBox etch-costBox">
        <div className="etch-nullData"></div>
        <p className="etch-submited">Tx submited</p>
        <p className="etch-txHash">
          Tx Hash: {flow3TxHash}
          <div className="etch-copyBtnBox">
            <span className="etch-copyBtn" onClick={go2CopyHash}></span>
            <div
              className="etch-tipscard"
              style={{ display: isCopiedHash ? "block" : "none" }}
            >
              <span></span>
              <p>copy success!</p>
            </div>
          </div>
          <span className="etch-jumpBtn" onClick={go2mmp}></span>
        </p>
        <div className="etch-bottomBtn etch-mt200" onClick={go2Flow1}>
          Back
        </div>
      </div>
    </>
  );
}
