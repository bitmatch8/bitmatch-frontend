import { useCallback, useMemo } from "react"
import useUnisat from "./useUnisat"
import useOKX from "./useOKX"
import { WallterType, selectWallter, useSelector } from "@/lib/redux"
import useSWR from "swr"

export default (type:WallterType) => {
  let unisat = useUnisat()
  let okx = useOKX()
  return unisat
  // return type === 'okx'? okx : unisat
}
