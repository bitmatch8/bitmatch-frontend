import Page from "@/components/Page"
import History from "./History"
import Etching1 from "./Etching1"
import Etching2 from "./Etching2"
import Etching3 from "./Etching3"

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
                {/* <Etching2></Etching2> */}
                <Etching3></Etching3>
            </div>
            <History></History>
        </Page>
    )
}