import React, { useMemo } from "react"
import EtchFlowPath from "@/components/EtchFlowPath"
import copy from "copy-to-clipboard"

export default function Etching3(props: any) {
    const { flowName, handleBackFlow3 } = props;

    const [isCopiedHash, setIsCopiedHash] = React.useState(false);

    const go2Flow1 = () => {
        handleBackFlow3(flowName);
    }
    const go2mmp = () => {
        window.location.href = 'https://mempool.space/zh/';
    }
    const go2CopyHash = () => {
        copy('hash link');
        setIsCopiedHash(true);
        setTimeout(() => {
            setIsCopiedHash(false);
        }, 3000);
    }

    return (
        <>
            <div className="etch-blockBox">
                <EtchFlowPath flowType={3} flowName="etching"></EtchFlowPath>
                <div className="etch-descBox">
                    <p className="etch-detailTit">Rune Detail</p>
                    <div className="etch-detailContent">
                        {`{"p":"brc-20","op":"deploy","tick":"A·B·C·A·W·E·V·R·S·F·E·E","lim":"1000","max":"21000000","lim":"1000","max":"21000000","lim":"1000","max":"21000000","lim":"1000","max":"21000000","lim":"1000","max":"21000000","lim":"1000","max":"21000000","lim":"1000","max":"21000000"}`}
                    </div>
                </div>
            </div>
            <div className="etch-blockBox etch-costBox">
                <div className="etch-nullData"></div>
                <p className="etch-submited">Tx submited</p>
                <p className="etch-txHash">
                    Tx Hash:  d3b10b02def8086cdd1a…df5bc9c20325acf8c0a80b8
                    <div className="etch-copyBtnBox">
                        <span className="etch-copyBtn" onClick={go2CopyHash}></span>
                        <div className="etch-tipscard" style={{ display: isCopiedHash ? 'block' : 'none' }}>
                            <span></span>
                            <p>copy success!</p>
                        </div>
                    </div>
                    <span className="etch-jumpBtn" onClick={go2mmp}></span>
                </p>
                <div className="etch-bottomBtn etch-mt200" onClick={go2Flow1}>Back</div>
            </div>
        </>
        
    )
}