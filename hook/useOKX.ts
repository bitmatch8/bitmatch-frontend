import { useEffect, useMemo, useState } from "react"
import useSWR from "swr"

export default () => {
  let {data:okxwallet} = useSWR({window},({window})=>(window as any).okxwallet) 
  const name='OKX'
  
  console.log({okxwallet})
  return {
    name,
    wallter:okxwallet?.bitcoin,
    installed:!!okxwallet,
  }
}
