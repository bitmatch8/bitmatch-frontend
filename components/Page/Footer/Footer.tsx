import styled from "@emotion/styled"
import React from "react"
import Logo from "@/components/Logo"
import Image from "next/image"
import PageContent from "../PageContent"
import LinkIcons from "./LinkIcons"


const Footer: React.FC = () => {
  return (
    <FooterBox>
      <FooterContainerBox>
        <FooterLogoItem>
          <Logo />
          <div className="copyright">
            Copyright © 2024 BitMatch. All Rights Reserved
          </div>
        </FooterLogoItem>
        <LinkIcons/>
      </FooterContainerBox>
    </FooterBox>
  )
}

export default Footer

const FooterBox = styled.div`
  background-color: #0f1012;
  margin-top: 200px;
`
const FooterLogoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
  .copyright {
    font-size: 16px;
    font-weight: 500;
    color: #4f4f57;
    line-height: 16px;
  }
`
const FooterContainerBox = styled(PageContent)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 250px;
`
