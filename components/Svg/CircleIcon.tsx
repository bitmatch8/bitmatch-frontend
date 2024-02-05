import { SvgIconProps } from "@mui/material"
import { Svg } from "./Svg"
interface TypeProps extends SvgIconProps{
  seconds?:any
  filter_text?:any
} 
const ArrowLeftIcon = (props: TypeProps) => (
  <Svg viewBox="0 0 63 63"  {...props}>
    <circle cx="50" cy="50" r="50" stroke-width="19" stroke="#eaeaea" fill="none"></circle>
        <text
          x="50"
          y="50"
          font-size="32"
          text-anchor="middle"
          dominant-baseline="middle"
          fill="seconds | filter_text_class"
        >
          {props.seconds}
        </text>
        <circle
          cx="50"
          cy="50"
          r="50"
          stroke-width="19"
          stroke="seconds | filter_level"
          fill="none"
          transform="rotate(-90,50,50)"
        ></circle>
      </Svg>
)

export default ArrowLeftIcon
