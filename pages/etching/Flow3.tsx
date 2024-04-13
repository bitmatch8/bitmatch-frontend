import React, { useMemo } from "react"
import EtchFlowPath from "@/components/EtchFlowPath"
import TextTooltip from "@/components/TextTooltip"

export default function Etching3(props: any) {


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
                    <span className="etch-copyBtn"></span>
                    <span className="etch-jumpBtn"></span>
                </p>
                <div className="etch-bottomBtn etch-mt200">Back</div>
            </div>
        </>
        
    )
}