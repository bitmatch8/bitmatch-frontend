import styled from "@emotion/styled"
import { keyframes } from "@mui/material"
import { Svg } from "../Svg/Svg"

const rotate = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`

const StyledSVG = styled.svg<{ size: string; start?: boolean }>`
  &.rotate {
    animation: 1.4s ${rotate} linear infinite;
  }
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  cursor: ${({ start }) => (start ? "unset" : "pointer")};
  path {
    fill: ${({ start }) => (start ? " #6F6F76" : "#ffffff")};
  }
`

export default function RefreshLoader({
  size = "24px",
  stroke,
  start,
  ...rest
}: {
  size?: string
  stroke?: string
  [k: string]: any
}) {
  // return (
  //   <ProgressSvg viewBox="0 0 250 250" {...rest}>
  //     <circle
  //       className="progress"
  //       cx="200"
  //       cy="150"
  //       r="40"
  //       stroke="#888"
  //       stroke-width="1"
  //       fill="none"
  //     />
  //   </ProgressSvg>
  // )
  return (
    <StyledSVG
      viewBox="0 0 24 24"
      fill="none"
      className={start ? "rotate" : ""}
      start={start}
      xmlns="http://www.w3.org/2000/svg"
      size={size}
      {...rest}>
      <path d="M10.319,4.936a7.239,7.239,0,0,1,7.1,2.252,1.25,1.25,0,1,0,1.872-1.657A9.737,9.737,0,0,0,9.743,2.5,10.269,10.269,0,0,0,2.378,9.61a.249.249,0,0,1-.271.178l-1.033-.13A.491.491,0,0,0,.6,9.877a.5.5,0,0,0-.019.526l2.476,4.342a.5.5,0,0,0,.373.248.43.43,0,0,0,.062,0,.5.5,0,0,0,.359-.152l3.477-3.593a.5.5,0,0,0-.3-.844L5.15,10.172a.25.25,0,0,1-.2-.333A7.7,7.7,0,0,1,10.319,4.936Z"/>
      <path d="M23.406,14.1a.5.5,0,0,0,.015-.526l-2.5-4.329A.5.5,0,0,0,20.546,9a.489.489,0,0,0-.421.151l-3.456,3.614a.5.5,0,0,0,.3.842l1.848.221a.249.249,0,0,1,.183.117.253.253,0,0,1,.023.216,7.688,7.688,0,0,1-5.369,4.9,7.243,7.243,0,0,1-7.1-2.253,1.25,1.25,0,1,0-1.872,1.656,9.74,9.74,0,0,0,9.549,3.03,10.261,10.261,0,0,0,7.369-7.12.251.251,0,0,1,.27-.179l1.058.127a.422.422,0,0,0,.06,0A.5.5,0,0,0,23.406,14.1Z"/>
    </StyledSVG>
  )
}
const ProgressSvg = styled(Svg)`
  .progress {
    stroke-dasharray: 0, 250;
    animation: progress 10s linear infinite;
  }
  @keyframes progress {
    to {
      stroke-dasharray: 250, 0;
    }
  }
`
