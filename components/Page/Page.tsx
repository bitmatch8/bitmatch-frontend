import styled from '@emotion/styled'
import React from 'react'
import TopBar from './TopBar'
import Footer from './Footer'
import PageContent from './PageContent'

const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PageBox>
      <TopBar/>
      <PageContent>{children}</PageContent>
      <Footer/>
    </PageBox>
  )
}

export default Page

const PageBox = styled.div`
  font-family: Montserrat, Montserrat;
`
