import Page from "@/components/Page"
import History from "./History"

export default function IndexPage() {
    return (
        <Page>
            <p style={{ color: '#FFF', textAlign: 'center' }}>Runes</p>
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