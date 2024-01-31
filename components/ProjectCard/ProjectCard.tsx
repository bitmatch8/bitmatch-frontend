import styled from "@emotion/styled";

import Image from "next/image";
import LinkIcon from "@/components/Svg/LinkIcon";
import Link from "next/link";
import XIcon from "@/components/Svg/XIcon";
import GithubIcon from "@/components/Svg/GithubIcon";
import TelegramIcon from "@/components/Svg/TelegramIcon";
import React, { useMemo } from "react";
import ValueSkeleton from "@/components/ValueSkeleton";
import GitbookIcon from "@/components/Svg/GitbookIcon";
import DiscordIcon from "@/components/Svg/DiscordIcon";
import { BuyState } from "@/utils/types";
import OrderStageIcon from "../OrderStageIcon";

const ProjectLinks: React.FC<{ detail: any }> = ({ detail }) => {
  return (
    <ProjectCardHeadLinksBox>
      {detail === null ? (
        <ValueSkeleton width={300} height={30} />
      ) : (
        <>
          {detail?.website ? (
            <LinkItem SvgIcon={LinkIcon} to={detail.website} />
          ) : (
            ""
          )}
          {detail?.twitter ? (
            <LinkItem SvgIcon={XIcon} to={detail.twitter} />
          ) : (
            ""
          )}
          {detail?.github ? (
            <LinkItem SvgIcon={GithubIcon} to={detail.github} />
          ) : (
            ""
          )}
          {detail?.telegram ? (
            <LinkItem SvgIcon={TelegramIcon} to={detail.telegram} />
          ) : (
            ""
          )}
          {detail?.gitbook ? (
            <LinkItem SvgIcon={GitbookIcon} to={detail.gitbook} />
          ) : (
            ""
          )}
          {detail?.discord ? (
            <LinkItem SvgIcon={DiscordIcon} to={detail.discord} />
          ) : (
            ""
          )}
        </>
      )}
    </ProjectCardHeadLinksBox>
  );
};
const LinkItem: React.FC<{ SvgIcon: any; to?: string }> = ({
  SvgIcon,
  to = "#",
}) => {
  return (
    <LinkItemBox
      target={to === "#" || to === "" ? "_self" : "_blank"}
      href={to || "#"}
    >
      <SvgIcon width={36} fill="#c2c5c8" />
    </LinkItemBox>
  );
};



const ProjectCard: React.FC<{ detail: any; buyType: BuyState | null }> = ({
  detail,
  buyType,
}) => {
  return (
    <ProjectCardBox>
      <ProjectCardHeadBox>
        <ProjectCardHeadLeftBox>
          <ProjectCardHeadImgBox>
            {detail === null ? (
              <ValueSkeleton width={100} height={100} />
            ) : (
              <ImgBox
                style={{ borderRadius: 20 }}
                alt=""
                src={`data:image/jpeg;base64,${detail?.projectlogo}`}
                height={100}
                width={100}
              />
            )}
          </ProjectCardHeadImgBox>
          <ProjectCardHeadTitleBox>
            <div>
              {detail === null ? (
                <ValueSkeleton width={300} />
              ) : (
                detail?.projectname
              )}
            </div>
            <div>
              {detail?.projecttokenname?.trim() ? (
                <span>{detail?.projecttokenname}</span>
              ) : (
                ""
              )}
             <OrderStageIcon symbol={buyType}/> 
            </div>
          </ProjectCardHeadTitleBox>
        </ProjectCardHeadLeftBox>
        <ProjectLinks detail={detail} />
      </ProjectCardHeadBox>
      <ProjectContainerBox>
        <ProjectContainerItemBox>
          {detail === null ? (
            <ValueSkeleton width={498} height={270} />
          ) : (
            <ImgBox
              alt=""
              width={498}
              style={{ borderRadius: 20 }}
              height={270}
              src={`data:image/jpeg;base64,${detail?.projecthead}`}
            />
          )}
        </ProjectContainerItemBox>
        {detail === null ? <ProjectContainerItemBox>
          <ValueSkeleton height={100} width={622} />
        </ProjectContainerItemBox>:<ProjectContainerItemBox style={{height:268}} dangerouslySetInnerHTML={{__html:String(detail?.projectdescription).replaceAll("\n","<br/>")}}/>}
      </ProjectContainerBox>
    </ProjectCardBox>
  );
};

export default ProjectCard;

const ProjectContainerItemBox = styled.div`
  font-size: 24px;
  font-weight: 300;
  color: #ffffff;
  line-height: 36px;
  width: 560px;
  height: 282px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 20px;
  /* display: -webkit-box; */
  /* -webkit-line-clamp: 8; */
  /* -webkit-box-orient: vertical; */
  overflow-y: auto;

  /* 自定义滚动条 */
::-webkit-scrollbar {
  width: 8px; /* 宽度 */
  background-color: rgba(255,255,255,.6);
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background-color: rgba(255,255,255,.3);
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  background-color: rgba(100,100,100,.8);
}

/* 滚动条滑块悬停 */
::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

  p {
  }
`;
const ProjectContainerBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  gap: 40px;
`;
const LinkItemBox = styled(Link)`
  &:hover {
    svg {
      fill: #fff;
    }
  }
`;
const ProjectCardHeadLeftBox = styled.div`
  display: flex;
  gap: 24px;
`;
const ImgBox = styled(Image)``;
const ProjectCardHeadLinksBox = styled.div`
  display: flex;
  gap: 30px;
`;
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
`;
const ProjectCardHeadBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ProjectCardHeadImgBox = styled.div``;
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
`;
