import React, { useRef } from "react"

import { CircularProgressbar, buildStyles } from "react-circular-progressbar"

interface ProgressCountdownProps {
  deadline: number
}

const ProgressCountdown: React.FC<ProgressCountdownProps> = ({ deadline }) => {
  const refObj=useRef(null)
  const percentage =10
  const step = 100/deadline
  return (
    <CircularProgressbar
    ref={refObj}
      value={percentage}
      circleRatio={3}
      // text={`${total/1000}`}
      styles={buildStyles({
        textSize: "12px",
        textColor: "#fff",
        strokeLinecap: "round",
        pathColor: "#cfad91",
        pathTransitionDuration: step/5,
      })}
    />
  )
}

export default ProgressCountdown
