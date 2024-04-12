import React, { useMemo } from "react"
import EtchFlowPath from "@/components/EtchFlowPath"

export default function Etching2() {

    return (
        <>
            <div className="etch-blockBox">
                <EtchFlowPath flowType={2} flowName="etching"></EtchFlowPath>
                <div className="etch-descBox">
                    <div className="etch-descTopBackBox">
                        <span className="etch-flowTopBackBtn"></span>
                        <span className="etch-flowTopBackTxt">Back</span>
                    </div>
                    <p className="etch-descTopPleaDou">Please double check your text below before continuing:</p>
                    <p className="etch-descTopYouAre">
                        You are about to Etching  
                        <span> 1 Rune</span>
                    </p>
                    <div className="etch-descTopDetailBox">
                        <p className="etch-descDetailTopTxt">
                            <span>Detail：</span>
                            <span>～ 88vB</span>
                        </p>
                        <div className="etch-descWord">{`{"p":"brc-20","op":"deploy","tick":"A·B·C·A·W·E·V·R·S·F·E·E","lim":"1000","max":"21000000","lim":"1000","max":"21000000","lim":"1000","max":"21000000","lim":"1000","max":"21000000","lim":"1000","max":"21000000","lim":"1000","max":"21000000","lim":"1000","max":"21000000"}`}</div>
                    </div>
                </div>
            </div>

            <div className="etch-blockBox etch-costBox">
                <div className="etch-cardBox">
                    <div>
                        <p className="etch-cardTopTit">Economy</p>
                        <p className="etch-cardCenterNum">8</p>
                        <p className="etch-cardSats">sats/vB</p>
                        <p className="etch-cardWithin">Within hours to days</p>
                    </div>
                    <div>
                        <p className="etch-cardTopTit">Normal</p>
                        <p className="etch-cardCenterNum">12</p>
                        <p className="etch-cardSats">sats/vB</p>
                        <p className="etch-cardWithin">Within an hour</p>
                    </div>
                    <div>
                        <p className="etch-cardTopTit">Custom</p>
                        <div className="etch-cardCustomInput">
                            <input type="text" value="25" />
                        </div>
                        <p className="etch-cardSats">sats/vB</p>
                        <p className="etch-cardWithin">Within 30 mins</p>
                    </div>
                </div>
                <p className="etch-theCurTip">
                    <span></span>
                    The current Bitcoin network is highly congested. please be patient and wait.
                </p>
                <p className="etch-timesShown">Times shown are not guaranteed. USD values are estimates only.</p>
            </div>
            
        </>
        
    )
}