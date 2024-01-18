import Button from "@/components/Button"
import { Spaced } from "@/components/Spaced"
import DownIcon from "@/components/Svg/DownIcon"
import TokenSymbol from "@/components/TokenSymbol"
import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"
import Pagination from "@/components/Pagination"
import { fetchOrderCList } from "@/api/api"
import ValueSkeleton from "../ValueSkeleton"
import { hidehash } from "@/utils"
import CopySvg from "../CopySvg"
import { OrderState } from "@/utils/types"
import EmptyList from "./EmptyList"
type ItemProps = {
  orderid: string
  projectname: string
  type: string
  tokenname: string
  stage: string
  fromaddr: string
  fundaddr: string
  receivedAddr: string
  transmitAddr: string
  amount: string
  createtime: string
  updatetime: string
  amountFloat: string
  status: OrderState
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

const EmptyLine: React.FC = () => {
  return (
    <OrderHistoryLineDetailBox
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}>
      <ValueSkeleton width={1000} />
    </OrderHistoryLineDetailBox>
  )
}

const CopyItem: React.FC<{ text: string; len?: number }> = ({
  text,
  len = 6,
}) => {
  return <CopySvg text={text}>{hidehash(text, len)}</CopySvg>
}

const OrderStatus: { [state in OrderState]: any } = {
  [OrderState.PENDING]: StateWaiting,
  [OrderState.DISTRIBUTE]: StateWaiting,
  [OrderState.COMPLETED]: StateSucceeded,
  [OrderState.UNISATVERFY]: StateSucceeded,
}
const OrderHistoryItem: React.FC<{
  item: ItemProps
  onClick: any
  show: boolean
}> = ({ item, show, onClick }) => {
  const StateComponents = OrderStatus[item.status]
  return (
    <OrderHistoryLineDetailBox className={`${show ? "pull-up" : ""}`}>
      <OrderHistoryLineBox onClick={onClick}>
        <OrderHistoryItemBox className="order_id">
          <CopyItem text={item.orderid} len={5} />
        </OrderHistoryItemBox>
        <OrderHistoryItemBox className="project_name">
          {item.projectname}
        </OrderHistoryItemBox>
        <OrderHistoryItemBox className="stage">
          {item.stage}
        </OrderHistoryItemBox>
        <OrderHistoryItemBox className="receive_address">
          <CopyItem text={item.receivedAddr} />
        </OrderHistoryItemBox>
        <OrderHistoryItemBox className="amount">
          {item.amount.toLocaleString()}
        </OrderHistoryItemBox>
        <OrderHistoryItemBox className="payment_amount">
          <div style={{ alignItems: "center" }}>
            <TokenSymbol symbol={"BTC"} size={16} />
            {item.amountFloat}
          </div>
          <div style={{ marginTop: 4 }}>{item.tokenname}</div>
        </OrderHistoryItemBox>
        <OrderHistoryItemBox className="state">
          <StateItemBox>
            {StateComponents ? <StateComponents /> : ""}
            {/* <StateComponents /> */}
          </StateItemBox>
          <StateItemIconBox>
            <DownIcon className="arrow" width={20} fill="#C2C5C8" />
          </StateItemIconBox>
        </OrderHistoryItemBox>
      </OrderHistoryLineBox>
      <OrderHistoryLineBox>
        <OrderHistoryItemBox className="order_id">
          <div className="title">From Address</div>
          <div> {hidehash(item.fromaddr, 6)}</div>
        </OrderHistoryItemBox>
        <OrderHistoryItemBox className="project_name">
          <div className="title">To Address</div>
          <div> {hidehash(item.receivedAddr, 6)}</div>
        </OrderHistoryItemBox>
        <OrderHistoryItemBox className="time">
          <div className="title">Time</div>
          <div> {item.createtime}</div>
        </OrderHistoryItemBox>
      </OrderHistoryLineBox>
    </OrderHistoryLineDetailBox>
  )
}

const OrderHistory: React.FC<{ address?: any; pid: any }> = ({
  address,
  pid,
}) => {
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [index, setIndex] = useState<number | null>(null)
  const [lists, setLists] = useState<ItemProps[] | null>(null)
  const reload = async (pageNum: any) => {
    const { code, data: reponse } = await fetchOrderCList({
      pageNum,
      pageSize,
      address,
      pid,
    })
    if (code === 0) {
      const { total, list } = reponse
      setTotal(total)
      setPage(pageNum)
      setLists(list)
    }
  }
  let timeId: any = null
  useEffect(() => {
    if (timeId) {
      clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
      reload(page)
    }, 10000)
    return () => {
      timeId && clearTimeout(timeId)
    }
  }, [page])
  useEffect(() => {
    reload(1)
  }, [address, pid])
  return (
    <>
      <PageTitleBox>Order History</PageTitleBox>
      <Spaced size="86" />
      <OrderHistoryBox>
        <OrderHistoryHead />
        <Spaced size="35" />
        <OrderContainerBox>
          {lists === null
            ? [null, null, null].map((_, key) => <EmptyLine key={key} />)
            : lists.length === 0 ? <EmptyList/>:lists.map((item, key) => (
                <OrderHistoryItem
                  key={key}
                  item={item}
                  show={index === key}
                  onClick={() =>
                    index === key ? setIndex(null) : setIndex(key)
                  }
                />
              ))}
        </OrderContainerBox>
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
      </OrderHistoryBox>
    </>
  )
}
export default OrderHistory
const ViewButton = styled(Button)`
  width: 66px;
  height: 24px;
  border-radius: 6px;
  font-size: 14px;
`
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
    align-items: center;
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
    gap: 2px;
  }
`
