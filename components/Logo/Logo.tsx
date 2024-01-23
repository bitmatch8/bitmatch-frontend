import styled from '@emotion/styled'
import React from 'react'
import DeindexImg from '@/assets/logo/deindex.png'
import Image from 'next/image'

const Logo: React.FC = () => {
  return <div>
    <LogoBox alt='deindex' src={DeindexImg} height={36}/>
  </div>
  // return (
  //  <LogoText>
  //   De<span>index</span>
  //  </LogoText> 
  // )
}

export default Logo



const LogoBox=styled(Image)`
  width: auto;
`
const LogoText=styled.span`
  user-select: none;
  font-size: 36px;
  font-family:'Arial Black';
  font-weight: 900;
  color: #fff;
  span{
    color:#F18F19;
  }
`