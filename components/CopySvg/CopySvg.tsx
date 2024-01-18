import CopyIcon from "@/components/Svg/CopyIcon"
import React, { useState } from "react"
import SuccessIcon from "../Svg/SuccessIcon"
import copy from 'copy-to-clipboard'
const CopySvg: React.FC<{ size?: number; children?: any,text:any }> = ({
  size = 16,
  children,
  text
}) => {
  const [isCopy, setIsCopy] = useState(false)
  let timeId: NodeJS.Timeout | null = null
  const onCopy = (e: any) => {
    e.stopPropagation()
    const didCopy = copy(text)
    setIsCopy(didCopy)
    timeId && clearTimeout(timeId)
    timeId = setTimeout(() => {
      setIsCopy(false)
    }, 2000)
  }
  return (
    <div onClick={onCopy}>
      {children}
      {isCopy ? (
        <SuccessIcon width={size} />
      ) : (
        <CopyIcon width={size} fill="#C2C5C8" />
      )}
    </div>
  )
}
export default CopySvg
