import Page from "@/components/Page"
import History from "./History"

export default function IndexPage() {
    return (
        <Page>
            <div className="etching-topHeader">
                <div className="etch-topLeftTitle">
                    Runes
                    <div className="etch-bottomLine"></div>
                </div>
                <div className="etch-topRightSearchBox">
                    <input type="text" />
                    <span className="eatch-topRightBtn"></span>
                </div>
            </div>
            <div style={{ color: '#FFF', textAlign: 'center' }}>
                <span>Etching</span>
                <span style={{marginLeft: '20px'}}>Mint</span>
                <span style={{marginLeft: '20px'}}>Transfer</span>
            </div>
            <div style={{ height: '300px', border: '1px solid red' }}>

            </div>
            <History></History>
        </Page>
    )
}