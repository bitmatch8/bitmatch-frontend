import React, { useMemo } from "react"
import EtchFlowPath from "@/components/EtchFlowPath"
import TextTooltip from "@/components/TextTooltip"

export default function Etching2() {
    const SatsTipText = useMemo(()=>(
        <div className="etch-tipInnerBox">
            <p>Specify the amount of satoshis stored in each Rune.</p>
        </div>
    ),[])
    const ServiceTipText = useMemo(()=>(
        <div className="etch-tipInnerBox">
            <p>Base Service Fee (fixed).</p>
        </div>
    ),[])
    const FeeTipText = useMemo(()=>(
        <div className="etch-tipInnerBox">
            <p>Fee by size: 4.99%.</p>
        </div>
    ),[])
    

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
                <div className="etch-bottomBtn">Pay & Etching</div>
            </div>
            
        </>
        
    )
}