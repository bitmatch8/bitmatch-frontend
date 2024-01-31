import { useEffect, useMemo, useState } from "react"
import useSWR from "swr"

export default () => {
  let {data:unisat} = useSWR({window},({window})=>(window as any).unisat) 

  const name = 'UniSat'
  console.log({unisat})
 
  return {
    name,
    wallter:unisat,
    installed:!!unisat,
  }
}
