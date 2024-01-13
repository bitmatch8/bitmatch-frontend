import styled from "@emotion/styled"
import Image from "next/image"
import WarningIcon from '@/assets/icon/tip_warning.png'
import SuccessIcon from '@/assets/icon/tip_success.png'

export type TipIconType = 'warning' | 'success'

export const logosBySymbol: { [icon: string]: any } = {
  "warning": WarningIcon,
  "success": SuccessIcon,
}

export const getTokenSymbol = (icon: string) => {
  return logosBySymbol[icon]
}
const TipIcon: React.FC<{ icon: TipIconType; size?: number }> = ({
  icon,
  size = 50,
}) => {
  const img = getTokenSymbol(icon)
  return <ImgBox src={img} alt={`${icon} icon`} width={size} />
}

export default TipIcon
const ImgBox = styled(Image)`
  height: auto;
  user-select:none;
`