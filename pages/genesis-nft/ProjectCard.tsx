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
import ValueSkeleton from "@/components/ValueSkeleton"
import GitbookIcon from "@/components/Svg/GitbookIcon"

const ProjectLinks: React.FC<{detail:any}> = ({detail}) => {
  return (
    <ProjectCardHeadLinksBox>
      {detail === null ?<ValueSkeleton width={300} height={30}/>:<>
      
      {detail?.website ? <LinkItem SvgIcon={LinkIcon} to={detail.website} />:''}
      {detail?.twitter ? <LinkItem SvgIcon={XIcon} to={detail.twitter} />:''}
      {detail?.github ? <LinkItem SvgIcon={GithubIcon} to={detail.github} />:''}
      {detail?.telegram ? <LinkItem SvgIcon={TelegramIcon} to={detail.telegram} />:''}
      {detail?.gitbook ? <LinkItem SvgIcon={GitbookIcon} to={detail.gitbook} />:''}
      
      </>}
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

const ProjectCard: React.FC<{detail:any}> = ({detail}) => {
  const title = ''
  console.log({detail})
  return (
    <ProjectCardBox>
      <ProjectCardHeadBox>
        <ProjectCardHeadLeftBox>
          <ProjectCardHeadImgBox>
            {detail === null ? <ValueSkeleton width={100} height={100}/>:<ImgBox alt="" src={`data:image/jpeg;base64,${detail?.projectlogo}`} height={100} width={100} />}
          </ProjectCardHeadImgBox>
          <ProjectCardHeadTitleBox>
            <div>{detail === null ? <ValueSkeleton width={300}/>:detail?.projectname}</div>
            <div>
              {detail?.projecttokenname.trim() ? <span>{detail?.projecttokenname}</span> : ''}
              <ImgBox alt="" src={UpcomingImg} height={30} />
            </div>
          </ProjectCardHeadTitleBox>
        </ProjectCardHeadLeftBox>
        <ProjectLinks detail={detail}/>
      </ProjectCardHeadBox>
      <ProjectContainerBox>
        <ProjectContainerItemBox>
          {detail === null ? <ValueSkeleton width={498} height={270}/>:<ImgBox alt="" width={498} height={270} src={`data:image/jpeg;base64,${detail?.projecthead}`}/>}
        </ProjectContainerItemBox>
        <ProjectContainerItemBox>
          {detail === null ? <ValueSkeleton height={100} width={622}/>: detail?.projectdescription}
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
