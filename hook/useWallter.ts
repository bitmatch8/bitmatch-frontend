import useUnisat from "./useUnisat"
import useOKX from "./useOKX"
import { WallterType } from "@/lib/redux"

export default (type:WallterType) => {
  let unisat = useUnisat()
  let okx = useOKX()
  return type === 'okx'? okx : unisat
}
