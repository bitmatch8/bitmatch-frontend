import useUnisat from "./useUnisat"
import useOKX from "./useOKX"
import { WallterType } from "@/lib/redux"
import useSWR from "swr"
import { useMemo } from "react"

export default (type: WallterType) => {
  // let {data:unisatSwr} = useSWR({window},({window})=>(window as any).unisat)
  // let {data:okxwallet} = useSWR({window},({window})=>(window as any).okxwallet)

  const unisatSwr = (window as any).unisat
  const okxwallet = (window as any).okxwallet
  // const okx = useMemo(() => {
  //   return {
  //     name: "OKX",
  //     wallter: okxwallet,
  //     installed: !!okxwallet,
  //   }
  // }, [okxwallet])
  // const unisat = useMemo(() => {
  //   return {
  //     name: "UniSat",
  //     wallter: unisatSwr,
  //     installed: !!unisatSwr,
  //   }
  // }, [unisatSwr])
  // let unisat = useUnisat()
  // let okx = useOKX()
  console.log({okxwallet},!!okxwallet)
  return type === "okx" ? {
    name: "OKX",
    wallter: okxwallet,
    installed: !!okxwallet,
  } : {
    name: "UniSat",
    wallter: unisatSwr,
    installed: !!unisatSwr,
  }
}
