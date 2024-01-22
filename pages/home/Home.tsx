/* Components */

import Button from "@/components/Button";
import Page from "@/components/Page";
import styled from "@emotion/styled";
import BIcon from "@/assets/img/b.png";
import Image from "next/image";
import LImg from "@/assets/img/l_img.png";
import RImg from "@/assets/img/r_img.png";

import L2Img from "@/assets/img/l2_img.png";
import R2Img from "@/assets/img/r2_img.png";

import L0Img from "@/assets/img/l0_img.png";
import R0Img from "@/assets/img/r0_img.png";
import LinkIcons from "@/components/Page/Footer/LinkIcons";
import ChainIcons from "@/components/ChainIcons";
import DecentralizedindexImg from "@/assets/img/Decentralizedindex.png";
import LaunchpadImg from "@/assets/img/Launchpad.png";
import MarketplaceImg from "@/assets/img/Marketplace.png";
import MarketplaceBgImg from "@/assets/img/Marketplace_bg.png";

import ProjectLists from "./ProjectLists";
import { Spaced } from "@/components/Spaced";
import { Chains } from "@/utils/Chains";

import Link from "next/link";

const ChainIconItem: React.FC<{ chain: Chains; width: number }> = ({
  chain,
  width,
}) => {
  return (
    <ChainIconItemBox>
      <ChainIcons chain={chain} size={width} />
      <ChainIconItemTitBox>{chain}</ChainIconItemTitBox>
    </ChainIconItemBox>
  );
};
const ChainLinks: React.FC = () => {
  return (
    <ChainLinksBox>
      <ChainIconItem chain={Chains.UNISAT} width={106} />
      <ChainIconItem chain={Chains.OKX} width={106} />
      <ChainIconItem chain={Chains.MAGICEDEN} width={106} />
      <ChainIconItem chain={Chains.Atomicalmarket} width={106} />
      <ChainIconItem chain={Chains.TRAC} width={106} />
      {/* <ChainIconItem chain="ORDINALS" width={120} />
      <ChainIconItem chain="BINANCE" width={120} />
      <ChainIconItem chain="OKX" width={120} />
      <ChainIconItem chain="GATE.IO" width={120} /> */}
      {/* <ChainIconItem chain="GATE.IO" width={120} />
      <ChainIconItem chain="UNISAT" width={94} /> */}
    </ChainLinksBox>
  );
};
const LaunchpadSlice: React.FC = () => {
  return (
    <ShowItemSliceBox>
      <ShowItemSliceItemBox>
        <ImgBox alt="" width={660} src={LaunchpadImg} />
      </ShowItemSliceItemBox>
      <ShowItemSliceItemBox className="launchpad">
        <ShowItemSliceTitleBox>
          Launch<span>pad</span>
        </ShowItemSliceTitleBox>
        <ShowItemSliceContxtBox>
          Launch the highest-quality projects to match the most suitable
          investments
        </ShowItemSliceContxtBox>
        <Spaced size="260" />
      </ShowItemSliceItemBox>
    </ShowItemSliceBox>
  );
};
const MarketplaceSlice: React.FC = () => {
  return (
    <ShowItemSliceBox className="show_bg">
      <ShowItemSliceItemBox className="marketplace">
        <ShowItemSliceTitleBox>
          Market<span>place</span>
        </ShowItemSliceTitleBox>
        <ShowItemSliceContxtBox>
          Efficient and low-cost trading
          <br />
          market
          <br />
          <br />
          All BRC-20 and <br />
          ARC20 deals here
        </ShowItemSliceContxtBox>
      </ShowItemSliceItemBox>
      <ShowItemSliceItemBox style={{ paddingTop: 250 }}>
        <ImgBox alt="" width={560} src={MarketplaceImg} />
      </ShowItemSliceItemBox>
    </ShowItemSliceBox>
  );
};
const DecentralizedIndex: React.FC = () => {
  return (
    <DecentralizedindexBox>
      <ShowItemSliceLineBox>
        <ImgBox alt="" width={1035} src={DecentralizedindexImg} />
      </ShowItemSliceLineBox>
      <ShowItemSliceLineBox className="decentralizedindex">
        <DecentralizedindexTitBox>
          Decentralized<span>index</span>
        </DecentralizedindexTitBox>
        <DecentralizedindexTextBox>
          A fully decentralized Ordinals index network driven by consensus, any
          node can join and exit the network at will
        </DecentralizedindexTextBox>
      </ShowItemSliceLineBox>
    </DecentralizedindexBox>
  );
};
export default function IndexPage() {
  return (
    <Page>
      <HeadContainerBox>
        <HeadContainerText>
          <div>Unleash the Full</div>
          <div>
            Potential of <ImgBox width={88} alt="" src={BIcon} />
            <span>itcoin</span>
          </div>
        </HeadContainerText>

        <HeadContainerUseUsBox>
          <HeadContainerUseUsLeftBox>
            <HeadContainerUseUsDescBox>
              Launchpad, Marketplace, decentralized index, Bitcoin full
              ecological infrastructure
            </HeadContainerUseUsDescBox>
            <LinkIcons />
          </HeadContainerUseUsLeftBox>
          <HeadContainerUseUsButton href="/lists">
            Use Us
          </HeadContainerUseUsButton>
        </HeadContainerUseUsBox>
      </HeadContainerBox>

      <LaunchpadSlice />
      <Spaced size="80" />
      <MarketplaceSlice />
      <Spaced size="210" />
      <DecentralizedIndex />
      <Spaced size="250" />
      <ProjectLists />
      <Spaced size="250" />
      <PageTitleBox>Partners</PageTitleBox>
      <Spaced size="80" />
      <ChainLinks />
    </Page>
  );
}
const PageTitleBox = styled.div`
  font-size: 80px;
  font-weight: 600;
  color: #dbdbdb;
  line-height: 120px;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    width: 160px;
    height: 15px;
    background-color: #f7931a;
    bottom: -18px;
    left: 0;
    border-radius: 8px;
  }
`;
const DecentralizedindexTitBox = styled.div`
  font-size: 80px;
  font-weight: 600;
  color: #181b20;
  line-height: 120px;
  span {
    color: #fff;
    margin-left: 20px;
  }
`;
const DecentralizedindexTextBox = styled.div`
  font-size: 36px;
  font-weight: 300;
  color: #24272b;
  line-height: 48px;
  position: relative;
  margin: 30px;
  &::before {
    content: "";
    position: absolute;
    right: 0px;
    top: 0px;
    width: 12px;
    height: 22px;
    background-image: url(${L0Img.src});
    background-size: 12px 22px;
  }
  &::after {
    content: "";
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 12px;
    height: 22px;
    background-image: url(${R0Img.src});
    background-size: 12px 22px;
  }
`;
const ShowItemSliceLineBox = styled.div`
  text-align: center;
  &.decentralizedindex {
    margin-top: 88px;
  }
`;
const DecentralizedindexBox = styled.div`
  /* margin-top: 160px; */
  background-color: #f7931a;
  padding: 80px 65px 100px;
  border-radius: 36px;
`;
const ShowItemSliceContxtBox = styled.div`
  font-size: 36px;
  font-weight: 300;
  color: #c2c5c8;
  line-height: 48px;
  margin-top: 28px;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: -30px;
    bottom: -15px;
    width: 12px;
    height: 22px;
    background-image: url(${L2Img.src});
    background-size: 12px 22px;
  }
  &::after {
    content: "";
    position: absolute;
    right: -20px;
    top: -15px;
    width: 12px;
    height: 22px;
    background-image: url(${R2Img.src});
    background-size: 12px 22px;
  }
`;
const ShowItemSliceItemBox = styled.div`
  &.launchpad {
    margin-left: 71px;
  }
  &.marketplace {
    margin-right: 110px;
  }
  &.decentralizedindex {
    margin-left: 88px;
  }
`;
const ShowItemSliceTitleBox = styled.div`
  max-width: 590px;
  font-size: 80px;
  color: #fff;
  font-weight: 600;
  color: #ffffff;
  line-height: 120px;
  span {
    color: #f8931a;
  }
`;
const ShowItemSliceBox = styled.div`
  display: flex;
  /* min-height: 900px; */
  justify-content: space-between;
  align-items: center;
  &.show_bg {
    position: relative;
    &::after {
      z-index: -1;
      content: "";
      position: absolute;
      right: 155px;
      top: 0;
      width: 730px;
      height: 730px;
      background-image: url(${MarketplaceBgImg.src});
      background-size: 730px 730px;
    }
  }
`;
const ChainIconItemTitBox = styled.div`
  font-family: Arial, Arial;
`;
const ChainIconItemBox = styled.div`
  cursor: pointer;
  width: 216px;
  height: 216px;
  background: #181b20;
  border-radius: 36px;
  border: 5px solid transparent;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 17px;

  font-size: 24px;
  color: #4f4f57;
  line-height: 24px;
  &:hover {
    color: #fff;
    border-color: #f8931a;
  }
`;
const ChainLinksBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* gap: 20px; */
  justify-content: space-between;
`;
const HeadContainerUseUsDescBox = styled.div`
  font-size: 32px;
  font-weight: 500;
  color: #c2c5c8;
  line-height: 48px;
  width: 726px;
  margin-left: 30px;
  margin-top: 15px;
  margin-bottom: 51px;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: -30px;
    top: -15px;
    width: 12px;
    height: 22px;
    background-image: url(${LImg.src});
    background-size: 12px 22px;
  }
  &::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: -15px;
    width: 12px;
    height: 22px;
    background-image: url(${RImg.src});
    background-size: 12px 22px;
  }
`;
const HeadContainerUseUsLeftBox = styled.div``;
const ImgBox = styled(Image)`
  height: auto;
`;
const HeadContainerUseUsButton = styled(Link)`
  width: 240px;
  height: 80px;
  color: #c2c5c8;
  text-decoration: none;
  position: relative;
  color: #fff;
  background: #f7931a;
  border-radius: 16px;
  font-size: 24px;
  font-family: Montserrat, Montserrat-Black;
  color: #ffffff;
  text-align: center;
  line-height: 80px;
`;
const HeadContainerUseUsBox = styled.div`
  margin-top: 100px;
  margin-bottom: 166px;
  display: flex;
  justify-content: space-between;
  gap: 194px;
`;
const HeadContainerBox = styled.div`
  margin: 112px auto 0px;
`;
const HeadContainerText = styled.div`
  font-size: 100px;
  font-family: Arial Black;
  font-weight: 900;
  color: #ffffff;
  text-align: center;
  line-height: 120px;
  & > div {
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
  img {
    margin-left: 36px;
  }
  span {
    margin-left: 10px;
    color: #f8931a;
  }
`;
