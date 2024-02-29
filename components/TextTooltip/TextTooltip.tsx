import React from "react";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip"
import styled from "@emotion/styled";

interface TipProps extends TooltipProps{
}
const TextTooltip = styled(({ className,...props }: TipProps) => (
  <Tooltip
  // open={true}
    {...props}
    placement="right"
    componentsProps={{
      transition:'none'
    }}
    components={{
      Arrow: ArrowRight,
    }}
    classes={{ popper: className }}
  />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth:500,
    padding: 30,
    borderRadius: 24,
    backgroundColor: "#181B20",
    border: "2px solid #6F6F76",
  },
})

export default TextTooltip;

const ArrowRight = styled.div`
  :before {
    content: "";
    display: block;
    position: absolute;
    right: 1px;
    top: -27px;
    width: 18px !important;
    height: 18px !important;
    background-color: #181B20; /* 模块背景为透明 */
    border-color: #6F6F76;
    border-style: solid;
    border-width: 2px 2px 0 0;
    transform: rotate(225deg); /*箭头方向可以自由切换角度*/
    border-radius: 3px;
  }
`