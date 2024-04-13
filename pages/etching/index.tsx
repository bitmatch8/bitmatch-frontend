import Page from "@/components/Page"
import History from "./History"
import Etching1 from "./Etching1"
import Flow2 from "./Flow2"
import Flow3 from "./Flow3"
import Mint1 from "./Mint1"
import Transfer1 from "./Transfer1"

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
                    <span className="etch-topRightBtn"></span>
                </div>
            </div>
            <div className="etch-tabox">
                <div className="etch-tabCur">Etching</div>
                <div>Mint</div>
                <div>Transfer</div>
            </div>
            <div className="etch-formFatherBox">
                {/* <Etching1></Etching1> */}
                {/* <Flow2></Flow2> */}
                {/* <Flow3></Flow3> */}
                {/* <Mint1></Mint1> */}
                <Transfer1></Transfer1>
            </div>
            <History></History>
        </Page>
    )
}