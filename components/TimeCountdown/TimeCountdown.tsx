import React from "react"
import Countdown, { CountdownRenderProps } from "react-countdown"
import { useMemo } from "react"
import styled from "@emotion/styled"

interface ProgressCountdownProps {
  deadline: Date,
  onComplete:any,
}

const TimeCountdown: React.FC<ProgressCountdownProps> = ({
  deadline,
  onComplete
}) => {
  const deadlineVal = useMemo(() => {
    return deadline.getTime()
  }, [deadline])
  const countdownRenderer = (countdownProps: CountdownRenderProps) => {
    const { days, hours, minutes, seconds } = countdownProps
    const d = String(days)
    const h = String(hours)
    const m = String(minutes)
    const s = String(seconds)
    if (Number(d) > 0) {
      return (
        <StyledCountdown>
          {d.padStart(2, "0")}D {h.padStart(2, "0")}H {m.padStart(2, "0")}{" "}
          分
        </StyledCountdown>
      )
    }
    return (
      <StyledCountdown>
        {h.padStart(2, "0")}H {m.padStart(2, "0")}M {s.padStart(2, "0")}S
      </StyledCountdown>
    )
  }
  return (
    <StyledCardContentInner>
      <Countdown onComplete={onComplete} date={deadlineVal} renderer={countdownRenderer} />
    </StyledCardContentInner>
  )
}
const StyledCountdown = styled.p`
  /* line-height: 1.8;
  margin-top: 10px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7); */
`

const StyledCardContentInner = styled.div`
  // height: 100%;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  flex-direction: column;
`

export default TimeCountdown
