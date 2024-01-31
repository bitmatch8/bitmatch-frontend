import { WallterType } from "@/lib/redux"
import { useCallback, useMemo } from "react"

export default (type:any) => {
  const unisatwallet = (window as any).unisat
  const okxwallet = (window as any).okxwallet
  const OKX = {
    name: "OKX",
    wallter: okxwallet,
    installed: !!okxwallet,
  }
  const UNISAT = {
    name: "UniSat",
    wallter: unisatwallet,
    installed: !!unisatwallet,
  }
  const wallters = [
    OKX,
    UNISAT
  ].sort((a,b)=>a.installed === true ? -1: 0)
  // const handleWallter=useCallback((type: WallterType)=>{
  //   return wallters.find(wallter=>{
  //     wallter.name.toLocaleLowerCase() === type
  //   }) || UNISAT
  // },[window,wallters])
  return {
    wallter:wallters.find(wallter=>{
      wallter.name.toLocaleLowerCase() === type
    }) || UNISAT,
    wallters
  }
}
