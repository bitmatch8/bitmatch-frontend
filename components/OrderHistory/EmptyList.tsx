import styled from "@emotion/styled"
import EmptyImg from '@/assets/img/none.png'
import Image from "next/image"
const EmptyList: React.FC = () => {
  return <EmptyListBox>
	<EmptyImgBox alt="" src={EmptyImg} width={168} height={136}/>
  </EmptyListBox>
}

export default EmptyList
const EmptyImgBox=styled(Image)`

`
const EmptyListBox = styled.div`
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`
