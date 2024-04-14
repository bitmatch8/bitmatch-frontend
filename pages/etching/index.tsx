import React from "react"
import { useRouter } from 'next/router';
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
    const [searchVal, setSearchVal] = React.useState('');

    const router = useRouter();

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

    const setSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchVal(event.target.value);
    };
    const go2SearchPage = ()=> {
        if (!searchVal) {
            return;
        }
        router.push('/search?q='+searchVal);
    }
    const setFlowNameTab = (name: string) => {
        setFlowName(name);
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
                    <input type="text" onChange={setSearchValue} value={searchVal} />
                    <span className="etch-topRightBtn" onClick={go2SearchPage}></span>
                </div>
            </div>
            <div className="etch-tabox">
                <div className={flowName==='etching'?'etch-tabCur':''} onClick={()=> setFlowNameTab('etching')}>Etching</div>
                <div className={flowName==='mint'?'etch-tabCur':''} onClick={()=> setFlowNameTab('mint')}>Mint</div>
                <div className={flowName==='transfer'?'etch-tabCur':''} onClick={()=> setFlowNameTab('transfer')}>Transfer</div>
            </div>
            <div className="etch-formFatherBox">
                {
                    flowName==='etching'&&flowIndex===1 && <Etching1 handleBackData={getFlow1Data}></Etching1>
                }
                {
                    flowName==='mint'&&flowIndex===1 && <Mint1 handleBackData={getFlow1Data}></Mint1>
                }
                {
                    flowName==='transfer'&&flowIndex===1 && <Transfer1 handleBackData={getFlow1Data}></Transfer1>
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