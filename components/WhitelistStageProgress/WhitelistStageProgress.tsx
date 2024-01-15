import styled from "@emotion/styled"
import { CSSProperties, ReactNode, useMemo } from "react"

const WhitelistStageProgress: React.FC<{ total: number; num: number }> = ({
  total,
  num,
}) => {
  const ProgressVal = useMemo(

    () => {
      if(num >= total){
        return 100.00
      }
      return ((num / total) * 100).toFixed(2)
    },
    [total, num]
  )
  return (
    <WhitelistStageCardBox style={{ gap: 24 }}>
      <ProgressLineBox>
        <ProgressLineInerBox style={{ width: `${ProgressVal}%` }} />
      </ProgressLineBox>
      <WhitelistStageLine title="Progress" mark="">
        <span style={{ color: "#C2C5C8" }}>
          {ProgressVal}%{`(${num}/${total})`}
        </span>
      </WhitelistStageLine>
    </WhitelistStageCardBox>
  )
}
const WhitelistStageLine: React.FC<{
  title: string
  children?: ReactNode
  style?: CSSProperties
  mark?: string
}> = ({ title, children, style, mark = ":" }) => {
  return (
    <WhitelistStageLineItemBox>
      <WhitelistStageLineItemTitBox>
        {title}
        {mark}
      </WhitelistStageLineItemTitBox>
      <WhitelistStageLineItemValBox style={style}>
        {children}
      </WhitelistStageLineItemValBox>
    </WhitelistStageLineItemBox>
  )
}

export default WhitelistStageProgress

const ProgressLineInerBox = styled.div`
  height: 24px;
  background: linear-gradient(90deg, #d87600 0%, #f38f17 78%, #ffbf49 100%);
  border-radius: 12px;
`
const ProgressLineBox = styled.div`
  height: 20px;
  background: #181b20;
  box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
`
const WhitelistStageLineItemTitBox = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #c2c5c8;
  line-height: 24px;
`
const WhitelistStageLineItemValBox = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  line-height: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
`
const WhitelistStageLineItemBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
`
const WhitelistStageCardBox = styled.div`
  padding: 40px;
  background: #24272b;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`


