// import BINANCE from "@/assets/icon/BINANCE.png"
// import ORDINALS from "@/assets/icon/ORDINALS.png"
// import UNISAT from "@/assets/icon/UNISAT.png"
// import GATEIO from "@/assets/icon/GATE.IO.png"
// import OKX from "@/assets/icon/OKX.png"


import UNISAT from "@/assets/icon/1@2x.png"
import OKX from "@/assets/icon/2@2x.png"
import Atomicalmarket from "@/assets/icon/3@2x.png"
import MAGICEDEN from "@/assets/icon/4@2x.png"
import TRAC from "@/assets/icon/5@2x.png"
import { Chains } from "@/utils/Chains"

import styled from "@emotion/styled"
import Image from "next/image"

export const logosBySymbol: { [chain in Chains]: any } = {
  [Chains.Atomicalmarket]: Atomicalmarket,
  [Chains.MAGICEDEN]: MAGICEDEN,
  [Chains.UNISAT]: UNISAT,
  [Chains.TRAC]: TRAC,
  [Chains.OKX]: OKX,
}

export const getTokenSymbol = (symbol: Chains) => {
  if (!logosBySymbol[symbol]) {
    // throw new Error(`Invalid RabbitLogo symbol: ${symbol}`);
    return symbol
  }
  return logosBySymbol[symbol]
}
const ChainIcons: React.FC<{ chain: Chains; size?: number }> = ({
  chain,
  size = 50,
}) => {
  const icon = getTokenSymbol(chain)
  return <ImgBox src={icon} alt={`${chain} Logo`} width={size} />
}

export default ChainIcons
const ImgBox = styled(Image)`
  height: auto;
  user-select:none;
`