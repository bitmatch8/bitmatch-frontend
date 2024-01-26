/* Components */

import Page from "@/components/Page"
import React, {  } from "react"
import { useRouter } from "next/router"
import Detail from "@/components/Detail"
export default function IndexPage() {
  const {
    query: { id },
  }: any = useRouter()
  return (
    <Page>
    <Detail id={id}/> 
    </Page>
  )
}


