export default function EtchFlowPath(props: any) {
    const { flowType, flowName } = props;
    return (
        <div className="etch-flowPathBox">
            <div className="etch-flowItem">
                <p className="etch-flowNum">1</p>
                <p className="etch-flowTxt" style={{color:flowType===1?'#F7931A':'#6F6F76;'}}>Populate</p>
            </div>
            <div className="etch-flowLine">
                <div className="etch-flowLineShadow" style={{width:flowType===1?'100px':'200px'}}></div>
            </div>
            <div className="etch-flowItem">
                <p className="etch-flowNum">2</p>
                {
                    flowName==='etching' && <p className="etch-flowTxt" style={{color:flowType===2?'#F7931A':'#6F6F76;'}}>Pay & Etching</p>
                }
                {
                    flowName==='mint' && <p className="etch-flowTxt" style={{color:flowType===2?'#F7931A':'#6F6F76;'}}>Pay & Mint</p>
                }
                {
                    flowName==='transfer' && <p className="etch-flowTxt" style={{color:flowType===2?'#F7931A':'#6F6F76;'}}>Pay & Transfer</p>
                }
            </div>
            <div className="etch-flowLine"></div>
            <div className="etch-flowItem">
                <p className="etch-flowNum">3</p>
                <p className="etch-flowTxt">Etching Result</p>
            </div>
        </div>
    )
}