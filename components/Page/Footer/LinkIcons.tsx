import GithubIcon from "@/components/Svg/GithubIcon";
import XIcon from "@/components/Svg/XIcon";
import TelegramIcon from "@/components/Svg/TelegramIcon";
import styled from "@emotion/styled";
import Link from "next/link";
import GitbookIcon from "@/components/Svg/GitbookIcon";

const LinkIcon: React.FC<{
  to: string;
  icon: "Github" | "X" | "Telegram" | "GitbookIcon";
}> = ({ icon, to = "#" }) => {
  const SvgIcons = {
    Github: GithubIcon,
    X: XIcon,
    Telegram: TelegramIcon,
    GitbookIcon: GitbookIcon,
  };
  const Svg = SvgIcons[icon];
  return (
    <FooterLinkItemBox target="_blank" href={to}>
      <Svg fill="#c2c5c8" width={48} />
    </FooterLinkItemBox>
  );
};

export default () => {
  return (
    <FooterLinksBox>
      <LinkIcon icon="X" to="https://twitter.com/DeindexBTC" />
      {/* <LinkIcon icon="Github" to="#" /> */}
      <LinkIcon icon="Telegram" to="https://t.me/DeindexBTC" />
      <LinkIcon icon="GitbookIcon" to="https://docs.deindex.space" />
    </FooterLinksBox>
  );
};

const FooterLinksBox = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;
const FooterLinkItemBox = styled(Link)`
  display: block;
  width: 48px;
  height: 50px;
  border-radius: 50%;
  &:hover {
    svg {
      fill: #ffffff;
    }
  }
`;
