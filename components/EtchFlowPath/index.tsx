export default function EtchFlowPath(props: any) {
    const { flowType, flowName } = props;
    return (
        <div className="etch-flowPathBox">
            <div className="etch-flowItem">
                <p className="etch-flowNum">1</p>
                <p className="etch-flowTxt">Populate</p>
            </div>
            <div className="etch-flowLine">
                <div className="etch-flowLineShadow"></div>
            </div>
            <div className="etch-flowItem">
                <p className="etch-flowNum">2</p>
                <p className="etch-flowTxt">Pay & Etching</p>
            </div>
            <div className="etch-flowLine"></div>
            <div className="etch-flowItem">
                <p className="etch-flowNum">3</p>
                <p className="etch-flowTxt">Etching Result</p>
            </div>
        </div>
    )
}