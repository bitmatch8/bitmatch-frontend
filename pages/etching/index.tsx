import React from "react"
import Page from "@/components/Page"
import History from "./History"
import Etching1 from "./Etching1"
import Flow2 from "./Flow2"
import Flow3 from "./Flow3"
import Mint1 from "./Mint1"
import Transfer1 from "./Transfer1"

export default function IndexPage() {
    const [flowName, setFlowName] = React.useState('etching');
    const [flowIndex, setFlowIndex] = React.useState(1);
    const [formData, setFormData] = React.useState({});
    const [flow3Hash, setFlow3Hash] = React.useState('');

    const getFlow1Data = (data: any) => {
        const { flowIndex } = data;
        setFlowIndex(flowIndex);
        setFormData(data);
    }
    const getFlow2BackData = (fName: string, findex: number, txHash: string) => {
        setFlowName(fName);
        setFlowIndex(findex);
        if (txHash) {
            setFlow3Hash(txHash);
        }
    }

    const getFlow3BackData = (fName: string) => {
        setFlowName(fName);
        setFlowIndex(1);
    }

    return (
        <Page>
            <div className="etching-topHeader">
                <div className="etch-topLeftTitle">
                    Runes
                    <div className="etch-bottomLine"></div>
                </div>
                <div className="etch-topRightSearchBox">
                    <input type="text" />
                    <span className="etch-topRightBtn"></span>
                </div>
            </div>
            <div className="etch-tabox">
                <div className="etch-tabCur">Etching</div>
                <div>Mint</div>
                <div>Transfer</div>
            </div>
            <div className="etch-formFatherBox">
                {
                    flowName==='etching'&&flowIndex===1 && <Etching1 handleBackData={getFlow1Data}></Etching1>
                }
                {
                    flowName==='mint'&&flowIndex===1 && <Mint1></Mint1>
                }
                {
                    flowName==='transfer'&&flowIndex===1 && <Transfer1></Transfer1>
                }
                {
                    flowIndex===2 && <Flow2 flowName={flowName} formData={formData} handleBackFlow2={getFlow2BackData}></Flow2>
                }
                {
                    flowIndex===3 && <Flow3 flowName={flowName} handleBackFlow3={getFlow3BackData} flow3TxHash={flow3Hash} formData={formData}></Flow3>
                }
            </div>
            <History></History>
        </Page>
    )
}