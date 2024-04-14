import Page from "@/components/Page";
import styled from "@emotion/styled";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { hidehash } from "@/utils";
import BackArrowIcon from "@/components/Svg/BackArrowIcon";
import { borderColor, height, style } from "styled-system";
import { Spaced } from "@/components/Spaced";

const CssTextField = styled(TextField)({
  "& .MuiInputBase-input": {
    boxSizing: "border-box",
    width: "1120px",
    height: "80px",
    minHeight: 0,
    background: "#181B20",
    borderRadius: "24px",
    fontSize: "20px",
    fontWeight: 500,
    color: "#DBDBDB",
    caretColor: "#F7931A",
    paddingLeft: "40px",
  },
  "& .MuiSelect-select": { minHeight: 0 },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
    "&svg": { position: "absolute", right: 0 },
  },
  "&.MuiInputBase-root": {
    background: "#f00",
    "& svg": { position: "absolute", right: 0 },
  },
});

export default function SearchPage() {
  const handleBack = () => {
    window.history.go(-1);
  };

  const [runeInfo, setRuneInfo] = useState([
    { name: "rune", label: "Rune", value: "werwer" },
    { name: "etcher", label: "Etcher", value: "" },
    { name: "amount", label: "Total Amount", value: "" },
    { name: "height", label: "Height", value: "" },
    { name: "time", label: "Timestamp", value: "" },
    { name: "transaction", label: "Genesis Transaction", value: "" },
  ]);

  const [addrInfo, setAddrInfo] = useState([
    {
      addr: "AAAAAAAAAAAAA",
      amount: "21000",
      owner: "bc1pm撒旦法撒旦法的是SHjhch",
    },
  ]);

  return (
    <Page>
      <TitleBox>Runes</TitleBox>
      <InputBox>
        <div className="arrowBox" onClick={handleBack}>
          <BackArrowIcon width={36} />
        </div>
        <div className="inputBox">
          <CssTextField variant="outlined" />
        </div>
      </InputBox>
      <Spaced size="60" />
      {1 === 2 && (
        <RuneResultBox>
          <ul>
            {runeInfo.map((item: any, index: number) => {
              return (
                <li key={`runeItem${index}`}>
                  <div className="label">{item.label}：</div>
                  <div className="value">
                    {item.name !== "transaction" ? (
                      item.value
                    ) : (
                      <a href="" target="_blank">
                        item.value
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </RuneResultBox>
      )}
      <AddrResultBox>
        <Grid
          container
          spacing={{ xs: 2, md: 5 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {addrInfo.map((item, index) => {
            return (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <div className="gridBox">
                  <div className="addrBox">{item.addr}</div>
                  <div className="contBox">
                    <div className="amountBox">{item.amount}</div>
                    <div className="ownerBox">Ower: {hidehash(item.owner)}</div>
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </AddrResultBox>
    </Page>
  );
}

const TitleBox = styled.h4`
  font-weight: 600;
  font-size: 60px;
  color: #dbdbdb;
  line-height: 100px;
  text-align: center;
`;
const InputBox = styled.div`
  color: #dbdbdb;
  display: flex;
  justify-content: space-between;
  .arrowBox {
    display: flex;
    align-item: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    background: #181b20;
    border-radius: 24px;
    cursor: pointer;
  }
`;
const RuneResultBox = styled.div`
  padding: 40px;
  color: #dbdbdb;
  background: #181b20;
  border-radius: 36px;
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    min-height: 52px;
    margin-bottom: 22px;
    line-height: 26px;
    font-size: 20px;
  }
  li:last-child {
    margin-bottom: 0;
  }
  .label {
    width: 240px;
    color: #c2c5c8;
    font-weight: 500;
  }
  .value {
    width: 700px;
    color: #ffffff;
    word-break: break-word;
    text-align: right;
    font-weight: 600;
    a {
      color: #ffffff;
      text-decoration: underline;
    }
    a:hover {
      color: #f7931a;
    }
  }
`;
const AddrResultBox = styled.div`
  .gridBox {
    margin-bottom: 40px;
    padding: 40px 24px 24px;
    font-weight: 600;
    font-size: 24px;
    line-height: 24px;
    background: #181b20;
    border-radius: 36px;
  }
  .addrBox {
    color: #ffffff;
    text-align: center;
    margin-bottom: 40px;
  }
  .contBox {
    background: #000000;
    border-radius: 24px;
    padding: 40px 12px;
  }
  .amountBox {
    font-size: 40px;
    color: #f7931a;
    line-height: 40px;
    text-align: center;
    margin-bottom: 24px;
  }
  .ownerBox {
    font-weight: 600;
    color: #c2c5c8;
    text-align: center;
  }
`;
