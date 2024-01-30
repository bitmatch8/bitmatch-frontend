import styled from "@emotion/styled"
import Image from "next/image"
import BitcoinIcon from '@/assets/symbol/bitcoin.png'
import LogoUnisatIcon from "@/assets/wallter/unsat.png"
import LogoOkxIcon from "@/assets/wallter/okx.png"

export const logosBySymbol: { [symbol: string]: any } = {
  "UNISAT": LogoUnisatIcon,
  "OKX": LogoOkxIcon,
}

export const getTokenSymbol = (symbol: string) => {
  if (!logosBySymbol[symbol]) {
    // throw new Error(`Invalid RabbitLogo symbol: ${symbol}`);
    return null 
  }
  return logosBySymbol[symbol]
}
const WallterSymbol: React.FC<{ symbol: string; size?: number }> = ({
  symbol,
  size = 50,
}) => {
  const icon = getTokenSymbol(symbol?.toLocaleUpperCase())
  if(icon){
    return <ImgBox src={icon} alt={`${symbol} icon`} width={size} />
  }
  return ''
}

export default WallterSymbol
const ImgBox = styled(Image)`
  height: auto;
  user-select:none;
`