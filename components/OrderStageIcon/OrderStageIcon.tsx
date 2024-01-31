import styled from "@emotion/styled"
import Image from "next/image"
import UpcomingImg from "@/assets/img/upcomming1.png";
import endedImg from "@/assets/img/ended.png";
import Upcomming2Img from "@/assets/img/upcomming2.png";
import { BuyState } from "@/utils/types";
import ValueSkeleton from "../ValueSkeleton";

const statueSymbol: { [typeId in BuyState | string]: any } = {
  [BuyState.Public_Ended]: endedImg,
  [BuyState.Public_InProgress]: Upcomming2Img,
  [BuyState.Public_NotStarted]: UpcomingImg,
  [BuyState.White_Ended]: endedImg,
  [BuyState.White_NotStarted]: UpcomingImg,
  [BuyState.White_InProgress]: Upcomming2Img,

  ['Ended']: endedImg,
  ['']: UpcomingImg,
  ['Active']: Upcomming2Img,
};

export const getTokenSymbol = (symbol: string) => {
  if (!statueSymbol[symbol]) {
    return  <ValueSkeleton width={50} height={30} /> 
  }
  return statueSymbol[symbol]
}
const OrderStageIcon: React.FC<{ symbol: string | null; size?: number }> = ({
  symbol,
  size = 50,
}) => {
  if (symbol === null || !statueSymbol[symbol]) {
    return  <ValueSkeleton width={50} height={30} /> 
  }
  return <ImgBox src={statueSymbol[symbol]} alt={`${symbol} icon`} width={size} />
}

export default OrderStageIcon
const ImgBox = styled(Image)`
  height: auto;
  user-select:none;
`