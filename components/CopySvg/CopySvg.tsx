import CopyIcon from "@/components/Svg/CopyIcon"
import React, { useState } from "react"
import SuccessIcon from "../Svg/SuccessIcon"

const CopySvg: React.FC<{ size?: number; children?: any }> = ({
  size = 16,
  children,
}) => {
  const [isCopy, setIsCopy] = useState(false)
  // const StateComponents = [StateSucceeded, StateWaiting, StateCancelled][item.status]
  let timeId: NodeJS.Timeout | null = null
  const onCopy = (e: any) => {
    e.stopPropagation()
    setIsCopy(true)
    timeId && clearTimeout(timeId)
    timeId = setTimeout(() => {
      setIsCopy(false)
    }, 2000)
  }
  return (
    <div onClick={onCopy}>
      {children}
      {isCopy ? (
        <SuccessIcon width={16} />
      ) : (
        <CopyIcon width={size} fill="#C2C5C8" />
      )}
    </div>
  )
}
export default CopySvg
