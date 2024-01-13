import styled from "@emotion/styled"
import { BaseButtonProps } from "./types"
import { Button as ButtonBase } from "@mui/material"
interface TransientButtonProps extends BaseButtonProps {
  $isLoading?: boolean
  isError?: boolean
}

export const getButtonBgColor = ({ variant }: TransientButtonProps) => {
  return variant === "secondary" ? "transparent" : "#F7931A"
}

export const getButtonBorderColor = ({ variant }: TransientButtonProps) => {
  return variant === "secondary" ? "3px solid #C2C5C8;" : "none"
}
const StyledButton = styled.button<TransientButtonProps>`
  user-select: none;
  position: relative;
  align-items: center;
  border: 0;
  box-shadow: none;
  cursor: pointer;
  display: inline-flex;
  font-size: 24px;
  font-weight: 900;
  justify-content: center;
  letter-spacing: 0.03em;
  line-height: 1;
  gap: 10px;
  outline: 0;
  height: 56px;
  color: #fff;
  background: ${getButtonBgColor};
  border: ${getButtonBorderColor};
  width: 200px;
  border-radius: 16px;
  text-decoration: none;
  &.button--disabled {
    color: #fff;
    background: #a7a7a7;
  }
  &:hover {
    &.button--disabled {
      color: #fff;
      background: #a7a7a7;
    }
    border: none;
    background: linear-gradient(135deg, #f7931a 0%, #d87600 100%);
  }
`

export default StyledButton
