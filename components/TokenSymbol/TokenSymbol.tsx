import styled from "@emotion/styled"
import Image from "next/image"
import BitcoinIcon from '@/assets/symbol/bitcoin.png'

export const logosBySymbol: { [symbol: string]: any } = {
  "BIT": BitcoinIcon,
  "BITCOIN": BitcoinIcon,
  "BTC": BitcoinIcon,
}

export const getTokenSymbol = (symbol: string) => {
  if (!logosBySymbol[symbol]) {
    // throw new Error(`Invalid RabbitLogo symbol: ${symbol}`);
    return symbol
  }
  return logosBySymbol[symbol]
}
const ChainIcons: React.FC<{ symbol: string; size?: number }> = ({
  symbol,
  size = 50,
}) => {
  const icon = getTokenSymbol(symbol.toLocaleUpperCase())
  return <ImgBox src={icon} alt={`${symbol} icon`} width={size} />
}

export default ChainIcons
const ImgBox = styled(Image)`
  height: auto;
  user-select:none;
`