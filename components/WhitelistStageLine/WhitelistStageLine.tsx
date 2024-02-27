import styled from "@emotion/styled"
import { CSSProperties, ReactNode } from "react"

const WhitelistStageLine: React.FC<{
  title:any 
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

export default WhitelistStageLine

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


