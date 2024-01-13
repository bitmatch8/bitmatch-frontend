import styled from "@emotion/styled"
import TipIcon from "@/components/TipIcon"
import { TipIconType } from "../TipIcon/TipIcon"
export const Notice: React.FC<{icon?:TipIconType,text:string}> = ({icon,text}) => {
  return (
    <>
      {icon ? <TipIcon icon={icon} size={30} /> : ''} 
      <NoticeTipTextBox>
        {text}
      </NoticeTipTextBox>
    </>
  )
}
export default Notice
const NoticeTipBox = styled.div`
  min-height: 130px;
  display: flex;
  align-items: center;
`

const NoticeTipTextBox = styled.div`
  /* flex:1; */
  /* background-color: red; */
`
