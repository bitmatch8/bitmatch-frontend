import styled from "@emotion/styled"
import DemoUserImg from "@/assets/img/demo_user.png"
import UpcomingImg from "@/assets/img/upcomming1.png"
import Image from "next/image"
import LinkIcon from "@/components/Svg/LinkIcon"
import Link from "next/link"
import XIcon from "@/components/Svg/XIcon"
import GithubIcon from "@/components/Svg/GithubIcon"
import TelegramIcon from "@/components/Svg/TelegramIcon"
import DemoImg from "@/assets/img/demo_1.png"
import React from "react"

const ProjectLinks: React.FC = () => {
  return (
    <ProjectCardHeadLinksBox>
      <LinkItem SvgIcon={LinkIcon} to="" />
      <LinkItem SvgIcon={XIcon} to="" />
      <LinkItem SvgIcon={GithubIcon} to="" />
      <LinkItem SvgIcon={TelegramIcon} to="" />
    </ProjectCardHeadLinksBox>
  )
}
const LinkItem: React.FC<{ SvgIcon: any; to?: string }> = ({
  SvgIcon,
  to = "#",
}) => {
  return (
    <LinkItemBox
      target={to === "#" || to === "" ? "_self" : "_blank"}
      href={to || "#"}>
      <SvgIcon width={36} fill="#c2c5c8" />
    </LinkItemBox>
  )
}

const ProjectCard: React.FC<{title:string,symbol?:string,cardImg:any}> = ({title,symbol='',cardImg}) => {
  return (
    <ProjectCardBox>
      <ProjectCardHeadBox>
        <ProjectCardHeadLeftBox>
          <ProjectCardHeadImgBox>
            <ImgBox alt="" src={DemoUserImg} width={100} />
          </ProjectCardHeadImgBox>
          <ProjectCardHeadTitleBox>
            <div>{title}</div>
            <div>
              {symbol ? <span>{symbol}</span> : ''}
              <ImgBox alt="" src={UpcomingImg} height={30} />
            </div>
          </ProjectCardHeadTitleBox>
        </ProjectCardHeadLeftBox>
        <ProjectLinks />
      </ProjectCardHeadBox>
      <ProjectContainerBox>
        <ProjectContainerItemBox>
          <ImgBox alt="" width={498} src={cardImg} />
        </ProjectContainerItemBox>
        <ProjectContainerItemBox>
          10,000 timeless frog collectibles stored on the Bitcoin Blockchain.
          <br />
          <br />
          <br />
          These are 10,000 pure digital collectibles that will remain on Bitcoin
          forever. No more will ever be created.
        </ProjectContainerItemBox>
      </ProjectContainerBox>
    </ProjectCardBox>
  )
}

export default ProjectCard

const ProjectContainerItemBox = styled.div`
  font-size: 24px;
  font-weight: 300;
  color: #ffffff;
  line-height: 36px;
  p {
  }
`
const ProjectContainerBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  gap: 40px;
`
const LinkItemBox = styled(Link)`
  &:hover {
    svg {
      fill: #fff;
    }
  }
`
const ProjectCardHeadLeftBox = styled.div`
  display: flex;
  gap: 24px;
`
const ImgBox = styled(Image)``
const ProjectCardHeadLinksBox = styled.div`
  display: flex;
  gap: 30px;
`
const ProjectCardHeadTitleBox = styled.div`
  font-size: 40px;
  font-weight: 900;
  color: #ffffff;
  line-height: 40px;
  span {
    font-size: 32px;
    font-weight: 600;
    color: #c2c5c8;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & > div {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`
const ProjectCardHeadBox = styled.div`
  display: flex;
  justify-content: space-between;
`
const ProjectCardHeadImgBox = styled.div``
const ProjectCardBox = styled.div`
  width: 1240px;
  height: 490px;
  border-radius: 30px;
  /* border: 5px solid;
border-image: linear-gradient(135deg, rgba(63, 67, 70, 1), rgba(194, 197, 200, 1), rgba(63, 67, 70, 1)) 5 5; */
  position: relative;
  z-index: 0;
  background: linear-gradient(
    135deg,
    rgba(63, 67, 70, 1),
    rgba(194, 197, 200, 1),
    rgba(63, 67, 70, 1)
  );
  /* background:red ; */
  padding: 40px;
  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    left: 5px;
    top: 5px;
    bottom: 5px;
    right: 5px;
    background-color: #000;
    border-radius: 30px;
  }
`
