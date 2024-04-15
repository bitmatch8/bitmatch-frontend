import Page from "@/components/Page";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { fetchRuneSearchApi } from "@/api/api";
import useRuneSearch from "@/hook/useRuneSearch";
import useDebounce from "@/hook/useDebounce";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import { hidehash } from "@/utils";
import BackArrowIcon from "@/components/Svg/BackArrowIcon";
import { borderColor, height, style } from "styled-system";
import { Spaced } from "@/components/Spaced";
import SearchRuneIcon from "@/components/Svg/SearchRuneIcon";
import nodataImg from "@/assets/img/runes/nodata.png";
import searchingImg from "@/assets/img/runes/searching.png";
import Image from "next/image";

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

const SearchSvg: React.FC = () => {
  return (
    <SearchIconBox>
      <SearchRuneIcon width={32} />
    </SearchIconBox>
  );
};
interface RuneResultProps {
  runeInfo: any;
}
const RuneResultCom: React.FC<RuneResultProps> = ({ runeInfo }) => {
  return (
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
                  <a
                    href={`${process.env.NEXT_PUBLIC_MEMPOOLURL}${item.value}`}
                    target="_blank"
                  >
                    {item.value}
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </RuneResultBox>
  );
};

export default function SearchPage() {
  const [searchKey, setSearchKey] = useState(""); // 查询使用的条件
  const debouncedSearchTerm = useDebounce(searchKey, 500);

  // 获取搜索结果
  const { result } = useRuneSearch(debouncedSearchTerm, fetchRuneSearchApi, {});

  const handleBack = () => {
    window.history.go(-1);
  };

  const handleInput = (event: any) => {
    setSearchKey(event.target.value);
  };

  useEffect(() => {
    let searchParams = new URLSearchParams(location.search);
    let initKey = searchParams.get("q") || "";
    setSearchKey(initKey);
  }, []);

  return (
    <Page>
      <TitleBox>Runes</TitleBox>
      <InputBox>
        <div className="arrowBox" onClick={handleBack}>
          <BackArrowIcon width={36} />
        </div>
        <div className="inputBox">
          <CssTextField
            variant="outlined"
            value={searchKey}
            onInput={handleInput}
            autoComplete="off"
            placeholder="Search Rune"
            InputProps={{
              startAdornment: (
                <InputAdornment position="end">
                  <SearchSvg />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </InputBox>
      <Spaced size="60" />

      {result === null ? (
        <>
          {searchKey && (
            <SearchingBox>
              <SearchingImg src={searchingImg} alt="" />
              <div className="text">Search in progress …</div>
            </SearchingBox>
          )}
        </>
      ) : (
        <>
          {result?.exist && result?.runeInfo ? (
            <RuneResultCom runeInfo={result.runeInfo} />
          ) : (
            <NodataBox>
              <NodataImg src={nodataImg} alt="" />
              <div className="text">No data retrieved</div>
            </NodataBox>
          )}
        </>
      )}

      {/* <AddrResultBox>
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
      </AddrResultBox> */}
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
const SearchIconBox = styled.div`
  position: absolute;
  right: 22px;
  display: flex;
`;
const EmptyBase = styled.div`
  text-align: center;
  margin-top: 160px;
  margin-bottom: 175px;
  .text {
    font-weight: 500;
    font-size: 20px;
    color: #ffffff;
    line-height: 20px;
    text-align: center;
    margin-top: 32px;
  }
`;
const NodataBox = styled(EmptyBase)``;
const SearchingBox = styled(EmptyBase)``;
const NodataImg = styled(Image)`
  width: auto;
`;
const SearchingImg = styled(Image)`
  width: auto;
`;
