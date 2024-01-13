import Button from "@/components/Button"
import { Spaced } from "@/components/Spaced"
import CopyIcon from "@/components/Svg/CopyIcon"
import DownIcon from "@/components/Svg/DownIcon"
import TokenSymbol from "@/components/TokenSymbol"
import styled from "@emotion/styled"
import React, { CSSProperties, ReactNode, useMemo, useState } from "react"
import Pagination from "@/components/Pagination"
type ItemProps = {
  order_id: string
  project_name: string
  stage: string
  receive_address: string
  amount: string
  unit: string
  symbol: string
  payment_amount: string
  from_address: string
  to_address: string
  time: string
  state: any
}
const StateWaiting: React.FC = () => {
  return (
    <>
      <span className="waiting">Waiting for paymen</span>
    </>
  )
}
const StateCancelled: React.FC = () => {
  return (
    <>
      <span className="cancelled">Cancelled</span>
    </>
  )
}
const StateSucceeded: React.FC = () => {
  return (
    <>
      <div>
        <span className="succeeded">Succeeded</span>
      </div>
      <div>
        <ViewButton>View</ViewButton>
      </div>
    </>
  )
}
const OrderHistoryHead: React.FC = () => {
  return (
    <OrderHistoryHeadBox>
      <OrderHistoryHeadItemBox className="order_id">
        <span>Order ID</span>
      </OrderHistoryHeadItemBox>
      <OrderHistoryHeadItemBox className="project_name">
        <span>Project Name</span>
      </OrderHistoryHeadItemBox>
      <OrderHistoryHeadItemBox className="stage">
        <span>Stage</span>
      </OrderHistoryHeadItemBox>
      <OrderHistoryHeadItemBox className="receive_address">
        <span>Receive Address</span>
      </OrderHistoryHeadItemBox>
      <OrderHistoryHeadItemBox className="amount">
        <span>Amount</span>
      </OrderHistoryHeadItemBox>
      <OrderHistoryHeadItemBox className="payment_amount">
        <span>Payment Amount</span>
      </OrderHistoryHeadItemBox>
      <OrderHistoryHeadItemBox className="state">
        <span>State</span>
      </OrderHistoryHeadItemBox>
    </OrderHistoryHeadBox>
  )
}

const OrderHistory: React.FC = () => {
  const [page, setPage] = useState(1)
  const [index, setIndex] = useState<number | null>(null)
  const lists: ItemProps[] = [
    {
      order_id: "240101000001",
      project_name: "Bitcoin FrogsBitcoin Frogs",
      stage: "Whitelist",
      receive_address: "bc1pa…bcd789",
      amount: "1",
      unit: "Frog NFT",
      symbol: "BITCOIN",
      payment_amount: "0.23456789",
      from_address: "bc1pa…bcd123",
      to_address: "bc1pa…bcd456",
      time: "Dec-30 09:00:00 AM UTC+8",
      state: 0,
    },
    {
      order_id: "240101000001",
      project_name: "Bitcoin FrogsBitcoin Frogs",
      stage: "Whitelist",
      receive_address: "bc1pa…bcd789",
      amount: "10,000,000",
      unit: "$Frog",
      symbol: "BITCOIN",
      payment_amount: "0.23456789",
      from_address: "bc1pa…bcd123",
      to_address: "bc1pa…bcd456",
      time: "Dec-30 09:00:00 AM UTC+8",
      state: 1,
    },
    {
      order_id: "240101000001",
      project_name: "Bitcoin FrogsBitcoin Frogs",
      stage: "Whitelist",
      receive_address: "bc1pa…bcd789",
      amount: "10,000,000",
      unit: "$Frog",
      symbol: "BITCOIN",
      payment_amount: "0.23456789",
      from_address: "bc1pa…bcd123",
      to_address: "bc1pa…bcd456",
      time: "Dec-30 09:00:00 AM UTC+8",
      state: 2,
    },
    {
      order_id: "240101000001",
      project_name: "Bitcoin FrogsBitcoin Frogs",
      stage: "Whitelist",
      receive_address: "bc1pa…bcd789",
      amount: "10,000,000",
      unit: "$Frog",
      symbol: "BITCOIN",
      payment_amount: "0.23456789",
      from_address: "bc1pa…bcd123",
      to_address: "bc1pa…bcd456",
      time: "Dec-30 09:00:00 AM UTC+8",
      state: 1,
    },
  ]
  return (
    <>
      <PageTitleBox>Order History</PageTitleBox>
      <Spaced size="86" />
      <OrderHistoryBox>
        <OrderHistoryHead />
        <Spaced size="35" />
        <OrderContainerBox>
          {lists.map((item, key) => (
            <OrderHistoryItem
              key={key}
              item={item}
              show={index === key}
              onClick={() => (index === key ? setIndex(null) : setIndex(key))}
            />
          ))}
        </OrderContainerBox>
        <Spaced size="36" />
        <Pagination total={100} onChange={setPage} page={page} />
      </OrderHistoryBox>
    </>
  )
}
export default OrderHistory

const OrderHistoryItem: React.FC<{
  item: ItemProps
  onClick: any
  show: boolean
}> = ({ item, show, onClick }) => {
  const StateComponents = [StateSucceeded, StateWaiting, StateCancelled][
    item.state
  ]
  const onCopy = (e: MouseEvent) => {
    e.stopPropagation()
  }
  return (
    <OrderHistoryLineDetailBox className={`${show ? "pull-up" : ""}`}>
      <OrderHistoryLineBox onClick={onClick}>
        <OrderHistoryItemBox className="order_id">
          {item.order_id}
        </OrderHistoryItemBox>
        <OrderHistoryItemBox className="project_name">
          {item.project_name}
        </OrderHistoryItemBox>
        <OrderHistoryItemBox className="stage">
          {item.stage}
        </OrderHistoryItemBox>
        <OrderHistoryItemBox className="receive_address">
          <div onClick={onCopy}>
            {item.receive_address}
            <CopyIcon  width={16} fill="#C2C5C8" />
          </div>
        </OrderHistoryItemBox>
        <OrderHistoryItemBox className="amount">
          {item.amount}
        </OrderHistoryItemBox>
        <OrderHistoryItemBox className="payment_amount">
          <div style={{ alignItems: "center" }}>
            <TokenSymbol symbol={item.symbol} size={16} />
            {item.payment_amount}
          </div>
          <div style={{ marginTop: 4 }}>{item.unit}</div>
        </OrderHistoryItemBox>
        <OrderHistoryItemBox className="state">
          <StateItemBox>
            <StateComponents />
          </StateItemBox>
          <StateItemIconBox>
            <DownIcon className="arrow" width={20} fill="#C2C5C8" />
          </StateItemIconBox>
        </OrderHistoryItemBox>
      </OrderHistoryLineBox>
      <OrderHistoryLineBox>
        <OrderHistoryItemBox className="order_id">
          <div className="title">From Address</div>
          <div> {item.from_address}</div>
        </OrderHistoryItemBox>
        <OrderHistoryItemBox className="project_name">
          <div className="title">To Address</div>
          <div> {item.to_address}</div>
        </OrderHistoryItemBox>
        <OrderHistoryItemBox className="time">
          <div className="title">Time</div>
          <div> {item.time}</div>
        </OrderHistoryItemBox>
      </OrderHistoryLineBox>
    </OrderHistoryLineDetailBox>
  )
}
const OrderHistoryLineDetailBox = styled.div`
  height: 80px;
  transition: all 0.2s ease-in-out;
  background-color: #24272b;
  border-radius: 20px;
  border: 2px solid transparent;
  overflow: hidden;
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
  }
`
const ViewButton = styled(Button)`
  width: 66px;
  height: 24px;
  border-radius: 6px;
  font-size: 14px;
`
const OrderContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
const PageTitleBox = styled.div`
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
    bottom: -0px;
    left: 0;
    border-radius: 3px;
  }
`
const OrderHistoryBox = styled.div`
  background: #181b20;
  border-radius: 30px;
  padding: 60px 40px;
`
const OrderHistoryHeadBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0 24px;
  /* flex-wrap: wrap; */
  /* gap: 1px; */
`
const OrderHistoryLineBox = styled(OrderHistoryHeadBox)`
  height: 80px;
  cursor: pointer;
  &:hover {
    svg {
      fill: #f7931a;
    }
  }
`
const OrderHistoryItemBase = styled.div`
  &.order_id {
    width: 165px;
  }
  &.project_name {
    width: 200px;
  }
  &.stage {
    width: 120px;
  }
  &.receive_address {
    width: 180px;
  }
  &.amount {
    width: 151px;
  }
  &.payment_amount {
    width: 160px;
  }
  &.state {
    width: 136px;
    height: 80px;
    display: flex;
    justify-content: space-between;
    line-height: 20px;
  }
`
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
`
const StateItemIconBox = styled.div`
  display: flex;
  align-items: center;
`
const OrderHistoryHeadItemBox = styled(OrderHistoryItemBase)`
  font-size: 18px;
  font-weight: 600;
  color: #6f6f76;
  line-height: 22px;
  span {
    max-width: 120px;
    display: block;
  }
`
const OrderHistoryItemBox = styled(OrderHistoryItemBase)`
  font-size: 16px;
  font-weight: 500;
  color: #c2c5c8;
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
    gap: 5px;
  }
`
