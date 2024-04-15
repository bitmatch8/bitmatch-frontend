"use client";

import Logo from "@/components/Logo";
import styled from "@emotion/styled";
/* Core */
import Link from "next/link";
import { usePathname, useRouter, useParams } from "next/navigation";
import ToastModals from "@/context/ToastModals";
import { useDispatch, addToast } from "@/lib/redux";
import dynamic from "next/dynamic";
const ConnectButton = dynamic(import("./ConnectButton"), { ssr: false });
export const TopBar = () => {
  const pathname = usePathname();

  const menusArr = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Launchpad",
      path: "/lists",
    },
    {
      title: "Marketplace",
      path: "/etching",
      // tip: "Coming Soon",
    },
    {
      title: "Genesis NFT",
      path: "/genesis-nft",
    },
  ];
  const dispatch = useDispatch();
  return (
    <TopBarBox>
      <LogoLink href={"/"}>
        <Logo />
      </LogoLink>
      <MenusBox>
        {menusArr.map((link, key) => (
          <LinkItem
            key={key}
            className={pathname === link.path ? "active" : ""}
            // onClick={() =>
            //   link.tip
            //     ? dispatch(
            //         addToast({
            //           icon: "warning",
            //           contxt: link.tip,
            //         })
            //       )
            //     : ""
            // }
            href={link.path}
          >
            {link.title}
          </LinkItem>
        ))}
      </MenusBox>
      <ConnectButton />
      <ToastModals />
    </TopBarBox>
  );
};

export default TopBar;

const LogoLink = styled(Link)``;
const LinkItem = styled(Link)`
  color: #c2c5c8;
  text-decoration: none;
  position: relative;
  &:hover {
    color: #f7931a;
  }
  &.active {
    color: #f7931a;
    &::after {
      content: "";
      position: absolute;
      width: 36px;
      height: 5px;
      background-color: #f7931a;
      bottom: -18px;
      left: 50%;
      border-radius: 3px;
      transform: translateX(-50%);
    }
  }
`;

const MenusBox = styled.div`
  width: 638px;
  height: 66px;
  background-color: #181b20;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  border-radius: 20px;
  font-weight: 900;
  /* margin-left:100px ; */
`;

const TopBarBox = styled.div`
  width: 1227px;
  margin: 25px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;
