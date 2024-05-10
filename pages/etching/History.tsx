// import Button from "@/components/Button";
import { Spaced } from "@/components/Spaced";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import InputBase from "@mui/material/InputBase";
import styled from "@emotion/styled";
import React, { useState } from "react";
import Pagination from "@/components/Pagination";
import ValueSkeleton from "@/components/ValueSkeleton";
import { dateFormat, hidehash } from "@/utils";
import CopySvg from "@/components/CopySvg";
import EmptyList from "@/components/OrderHistory/EmptyList";
import useHistory, { HistoryItemProps } from "@/hook/useRuneHistory";
import { selectBuy, useSelector, selectWallter } from "@/lib/redux";
// import SelectIcon from "@/components/Svg/SelectIcon";
import { useEffect } from 'react';
import { RefreshConfig } from "@/utils/config"


// const SelectSvg: React.FC = () => {
//   return (
//     <SelectIconBox>
//       <SelectIcon width={20} fill="#6F6F76" />
//     </SelectIconBox>
//   );
// };

// const SelectInput = styled(InputBase)(() => ({
//   "& .MuiInputBase-input": {
//     borderRadius: "12px",
//     position: "relative",
//     backgroundColor: "transparent",
//     border: "2px solid #6F6F76",
//     color: "#DBDBDB",
//     fontSize: "24px",
//     fontWeight: 600,
//     minHeight: 0,
//     lineHeight: "24px",
//     padding: "16px 6px 16px 24px",
//     "&:focus": {
//       borderColor: "#F7931A",
//       borderRadius: "12px",
//     },
//   },
//   "& .MuiInputBase-input.MuiSelect-select": { minHeight: 0 },
// }));

// const dropdownStyle = {
//   "&& .MuiMenu-paper": {
//     background: "transparent",
//     paddingTop: "8px",
//   },
//   "&& .MuiList-root": {
//     background: "#181B20",
//     borderRadius: "12px",
//     border: "2px solid #6F6F76",
//     padding: 0,
//     overflow: "hidden",
//   },
//   "&& .MuiMenuItem-root": {
//     padding: "12px 20px",
//     fontSize: "24px",
//     color: "#DBDBDB",
//     "&:hover": {
//       backgroundColor: "#24272B",
//       color: "#F7931A",
//     },
//   },
//   "&& .MuiMenuItem-root.Mui-selected": {
//     backgroundColor: "#24272B",
//     color: "#F7931A",
//   },
// };

const RuneHistoryHead: React.FC<{
  flowType?: string
}> = ({ flowType }) => {
  return (
    <RuneHistoryHeadBox>
      <RuneHistoryHeadItemBox className="rune">
        <span>Rune</span>
      </RuneHistoryHeadItemBox>
      <RuneHistoryHeadItemBox className="types">
        <span>Type</span>
      </RuneHistoryHeadItemBox>
      <RuneHistoryHeadItemBox className="amount">
        <span>Amount</span>
      </RuneHistoryHeadItemBox>
      <RuneHistoryHeadItemBox className="from_address">
        <span>From address</span>
      </RuneHistoryHeadItemBox>
      <RuneHistoryHeadItemBox className="receive_address">
        <span>Receive address</span>
      </RuneHistoryHeadItemBox>
      {/* <RuneHistoryHeadItemBox className="fee">
        <span>Fee</span>
      </RuneHistoryHeadItemBox> */}
      <RuneHistoryHeadItemBox className="state">
        <span>Status</span>
      </RuneHistoryHeadItemBox>
    </RuneHistoryHeadBox>
  );
};

const EmptyLine: React.FC = () => {
  return (
    <RuneHistoryLineDetailBox
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <ValueSkeleton width={1000} />
    </RuneHistoryLineDetailBox>
  );
};

const CopyItem: React.FC<{ text: string; len?: number }> = ({
  text,
  len = 6,
}) => {
  return <CopySvg text={text}>{hidehash(text, len)}</CopySvg>;
};

const RuneHistoryItem: React.FC<{
  item: HistoryItemProps;
  onClick: any;
  show: boolean;
  flowType?: string
}> = ({ item, show, onClick, flowType }) => {
  return (
    <RuneHistoryLineDetailBox className={`${show ? "pull-up" : ""}`}>
      <RuneHistoryLineBox>
        <RuneHistoryItemBox className="rune">{flowType === 'etching' ? item.runeName : item.runename}</RuneHistoryItemBox>
        <RuneHistoryItemBox className="types">{flowType == 'etching' ? 'Etching' : 'Mint'}</RuneHistoryItemBox>
        <RuneHistoryItemBox className="amount">
          {flowType === 'etching' ? item.mintAmount : item.amount}
        </RuneHistoryItemBox>
        <RuneHistoryItemBox className="from_address">
          <CopyItem text={item.sender as string} />
        </RuneHistoryItemBox>
        <RuneHistoryItemBox className="receive_address">
          <CopyItem text={flowType === 'etching' ? item.receriverAddr as string : item.receiveaddress as string} />
        </RuneHistoryItemBox>
        {/* <RuneHistoryItemBox className="fee">{item.fee}</RuneHistoryItemBox> */}
        <RuneHistoryItemBox className="state">{item.status}</RuneHistoryItemBox>
      </RuneHistoryLineBox>
    </RuneHistoryLineDetailBox>
  );
};

const RuneHistory: React.FC<{ title?: any, flowName: string }> = ({
  title,
  flowName
}) => {
  const [page, setPage] = useState(1);
  // const [historyType, setHistoryType] = useState("all");
  const pageSize = 10;
  const [index, setIndex] = useState<number | null>(null);
  const { address } = useSelector(selectWallter);

  const { list: lists, total } = useHistory(
    {
      pageNum: page,
      sender: address,
      pageSize,
      etchingType: flowName
    },
    { refreshInterval: RefreshConfig.publicInfo_refreshInterval },
  );
  const reload = (page: any) => {
    setPage(page);
  };

  // const handleChange = (event: SelectChangeEvent) => {
  //   setHistoryType(event.target.value);
  // };

  // const typeList = [
  //   { value: "all", label: "All" },
  //   { value: "etching", label: "Etching" },
  //   { value: "mint", label: "Mint" },
  //   { value: "transfer", label: "Transfer" },
  // ];


  return (
    <>
      {title ? (
        title
      ) : (
        <>
          <PageTitleBox>
            <span>History</span>
            {/* <FormControl sx={{ m: 1, minWidth: 200 }}>
              <Select
                value={historyType}
                displayEmpty
                input={<SelectInput />}
                IconComponent={SelectSvg}
                MenuProps={{
                  sx: dropdownStyle,
                }}
                onChange={handleChange}
              >
                {typeList.map((item: any) => {
                  return (
                    <MenuItem value={item.value} key={item.value}>
                      {item.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl> */}
          </PageTitleBox>
          <Spaced size="80" />
        </>
      )}
      <RuneHistoryBox>
        <RuneHistoryHead flowType={flowName} />
        <RuneContainerBox>
          {lists === null ? (
            [null, null, null].map((_, key) => <EmptyLine key={key} />)
          ) : lists.length === 0 ? (
            <EmptyList />
          ) : (
            lists.map((item: any, key: number) => (
              <RuneHistoryItem
                key={key}
                item={item}
                show={index === key}
                onClick={() => (index === key ? setIndex(null) : setIndex(key))}
                flowType={flowName}
              />
            ))
          )}
        </RuneContainerBox>
        <Spaced size="36" />
        {total > pageSize ? (
          <Pagination
            total={total}
            pageSize={pageSize}
            onChange={reload}
            page={page}
          />
        ) : (
          ""
        )}
      </RuneHistoryBox></>
  );
};
export default RuneHistory;

const RuneHistoryLineDetailBox = styled.div`
  height: 80px;
  transition: all 0.2s ease-in-out;
  background-color: #24272b;
  border-radius: 20px;
  border: 2px solid transparent;
  overflow: hidden;
  font-family: Montserrat-Medium;
  color: #c2c5c8;
  svg.arrow {
    transition: all 0.2s ease-in-out;
    transform: rotate(0deg);
  }
  &.pull-up {
    border-color: #6f6f76;
    height: 170px;
    transition: height 0.2s;
    svg.arrow {
      transition: all 0.2s ease-in-out;
      transform: rotate(180deg);
    }
  }
  &:hover {
    border-color: #6f6f76;
    color: #fff;
    font-family: Montserrat;
    .title {
      font-family: Montserrat-Medium;
    }
  }
`;
const RuneContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const PageTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 60px;
  font-weight: 600;
  color: #dbdbdb;
  line-height: 100px;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    width: 120px;
    height: 6px;
    background-color: #f7931a;
    bottom: -6px;
    left: 0;
    border-radius: 3px;
  }
`;
const RuneHistoryBox = styled.div`
  background: #181b20;
  border-radius: 30px;
  padding: 0 24px 48px 24px;
`;
const RuneHistoryHeadBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0 24px;
  height: 104px;
  /* flex-wrap: wrap; */
  /* gap: 1px; */
`;
const RuneHistoryLineBox = styled(RuneHistoryHeadBox)`
  height: 80px;
  cursor: pointer;
  &:hover {
    svg {
      fill: #f7931a;
    }
  }
`;
const RuneHistoryItemBase = styled.div`
  &.rune {
    width: 200px;
  }
  &.types {
    width: 200px;
  }
  &.amount {
    width: 200px;
  }
  &.from_address {
    width: 200px;
  }
  &.receive_address {
    width: 200px;
  }
  &.fee {
    width: 160px;
  }
  &.state {
    width: 136px;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 20px;
  }
`;
const StateItemBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  .succeeded {
    color: #00ab63;
  }
  .waiting {
    color: #f7931a;
  }
  .cancelled {
    color: #c70000;
  }
`;
const StateItemIconBox = styled.div`
  display: flex;
  align-items: center;
`;
const RuneHistoryHeadItemBox = styled(RuneHistoryItemBase)`
  font-size: 18px;
  font-weight: 600;
  color: #6f6f76;
  line-height: 22px;
  user-select: none;
  span {
    max-width: 160px;
    display: block;
  }
`;
const RuneHistoryItemBox = styled(RuneHistoryItemBase)`
  font-size: 16px;

  line-height: 20px;

  .title {
    font-size: 18px;
    font-weight: 500;
    color: #6f6f76;
    line-height: 22px;
    margin-bottom: 8px;
  }
  & > div {
    display: flex;
    gap: 2px;
  }
`;
const SelectIconBox = styled.div`
  position: absolute;
  right: 16px;
  display: flex;
  align-items: center;
`;
