import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Page from "@/components/Page";
// import History from "./History";
import Etching1 from "./Etching1";
import Flow2 from "./Flow2";
import Flow3 from "./Flow3";
import Mint1 from "./Mint1";
import Transfer1 from "./Transfer1";

export default function IndexPage() {
  const [flowName, setFlowName] = React.useState("etching");
  const [flowIndex, setFlowIndex] = React.useState(1);
  const [formData, setFormData] = React.useState({});
  const [flow3Hash, setFlow3Hash] = React.useState("");
  const [searchVal, setSearchVal] = React.useState("");
  const [twoTo1Data, set2to1Data] = React.useState({});

  const [knowCheck, setKknowCheck] = React.useState(false);

  const router = useRouter();

  const getFlow1Data = (data: any) => {
    const { flowIndex } = data;
    setFlowIndex(flowIndex);
    setFormData(data);
  };
  const getFlow2BackData = (fName: string, findex: number, backData: any) => {
    setFlowName(fName);
    setFlowIndex(findex);
    if (findex === 3) {
      setFlow3Hash(backData);
    }
    if (findex === 1) {
      set2to1Data(backData);
    }
  };

  const getFlow3BackData = (fName: string) => {
    setFlowName(fName);
    setFlowIndex(1);
  };

  const setSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(event.target.value);
  };
  const go2SearchPage = () => {
    if (!searchVal) {
      return;
    }
    router.push("/search?q=" + searchVal);
  };
  const setFlowNameTab = (name: string) => {
    if (flowName !== name) {
      set2to1Data({
        rune: null,
      });
    }
    setFlowName(name);
    setFlowIndex(1);
  };
  const handleChangeCoverCheck = () => {
    const oldKnowCheck = knowCheck;
    const newKnowCheck = !oldKnowCheck;
    setKknowCheck(newKnowCheck);
  }

  useEffect(() => {
    const searchInputDom = document.getElementById('etchSearchInput');
    if (searchInputDom) {
      searchInputDom.addEventListener('keyup', function(event: any) {
        if (event.keyCode === 13 && searchVal) {
          router.push("/search?q=" + searchVal);
        }
      });
    }
  }, [searchVal])

  return (
    <Page>
      <div className="etching-topHeader">
        <div className="etch-topLeftTitle">
          Runes
          <div className="etch-bottomLine"></div>
        </div>
        <div className="etch-topRightSearchBox">
          <input type="text" onChange={setSearchValue} id="etchSearchInput" value={searchVal} placeholder="Search Rune or Address" />
          <span className="etch-topRightBtn" onClick={go2SearchPage}></span>
        </div>
      </div>
      <div className="etch-tabox">
        <div
          className={flowName === "etching" ? "etch-tabCur" : ""}
          onClick={() => setFlowNameTab("etching")}
        >
          Etching
        </div>
        <div
          className={flowName === "mint" ? "etch-tabCur" : ""}
          onClick={() => setFlowNameTab("mint")}
        >
          Mint
        </div>
        <div
          className={flowName === "transfer" ? "etch-tabCur" : ""}
          onClick={() => setFlowNameTab("transfer")}
        >
          Transfer
        </div>
      </div>
      <div className="etch-formFatherBox">
        {flowName === "etching" && flowIndex === 1 && (
          <Etching1
            handleBackData={getFlow1Data}
            from2To1Data={twoTo1Data}
          ></Etching1>
        )}
        {flowName === "mint" && flowIndex === 1 && (
          <Mint1
            handleBackData={getFlow1Data}
            from2To1Data={twoTo1Data}
          ></Mint1>
        )}
        {flowName === "transfer" && flowIndex === 1 && (
          <Transfer1
            handleBackData={getFlow1Data}
            from2To1Data={twoTo1Data}
          ></Transfer1>
        )}
        {flowIndex === 2 && (
          <Flow2
            flowName={flowName}
            formData={formData}
            handleBackFlow2={getFlow2BackData}
          ></Flow2>
        )}
        {flowIndex === 3 && (
          <Flow3
            flowName={flowName}
            handleBackFlow3={getFlow3BackData}
            flow3TxHash={flow3Hash}
            formData={formData}
          ></Flow3>
        )}
      </div>
      {/* <History></History> */}
    </Page>
  );
}
