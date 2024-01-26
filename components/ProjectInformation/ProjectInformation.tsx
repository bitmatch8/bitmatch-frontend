import styled from "@emotion/styled";
import { fetchProjectDetailsApi } from "@/api/api";
import ValueSkeleton from "@/components/ValueSkeleton";
import Image from "next/image";
import useSwr from "@/hook/useSwr";
// const TokenomicsEcharts = dynamic(
//   () => import('./TokenomicsEcharts'),
//   { ssr: false },
// )
const ProjectInformation: React.FC<{id:any,show:boolean,title:string}> = ({id,show,title}) => {
  const {result:detail} = useSwr(id,fetchProjectDetailsApi,{})
  return (
    <ProjectInformationBox>
      <PageTitleBox>{title}</PageTitleBox>
      <PageSubTitleBox>About</PageSubTitleBox>
      <InfoContainerBox>
        <InfoContainerTitleBox>Introduction</InfoContainerTitleBox>
        <InfoContainerLineBox>
          {detail === null ? (
            <ValueSkeleton width={300} height={38} />
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: String(detail?.projectrelated).replaceAll(
                  "\n",
                  "<br/>"
                ),
              }}
            />
          )}
        </InfoContainerLineBox>

        <InfoContainerTitleBox>Advantages</InfoContainerTitleBox>
        <InfoContainerLineBox>
          {detail === null ? (
            <ValueSkeleton width={300} height={38} />
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: String(detail?.projectfeatures).replaceAll(
                  "\n",
                  "<br/>"
                ),
              }}
            />
          )}
        </InfoContainerLineBox>
      </InfoContainerBox>
      {show && detail?.tokenomics ? (
        <>
          <PageSubTitleBox>Tokenomics</PageSubTitleBox>
          <TokenomicsEchartsBox>
            <TokenomicsImgBox
              alt=""
              width={1120}
              height={639}
              src={`data:image/jpeg;base64,${detail?.tokenomics}`}
            />
          </TokenomicsEchartsBox>
        </>
      ) : (
        ""
      )}
    </ProjectInformationBox>
  );
};
export default ProjectInformation;

const TokenomicsImgBox = styled(Image)`
  border-radius: 20px;
`;
const TokenomicsEchartsBox = styled.div`
  width: 1120px;
  /* height: 693px; */
  border-radius: 30px;
  margin: 78px auto 0;
  /* background-color: #fff; */
`;
const InfoContainerBox = styled.div`
  padding: 20px;
  margin-top: 40px;
`
const InfoContainerLineBox=styled.div`
font-size: 24px;
font-weight: 300;
color: #C2C5C8;
line-height: 36px;
margin: 36px 0;
padding-bottom: 30px;
min-height: 100px;
word-break: break-all;
`
const InfoContainerTitleBox=styled.div`
font-size: 24px;
font-weight: 600;
color: #FFFFFF;
line-height: 24px;
`
const ProjectInformationBox = styled.div`
  margin-top: 80px;
  background: #181b20;
  border-radius: 30px;
  padding: 60px 40px;
`;
const PageTitleBox = styled.div`
  font-size: 60px;
  font-weight: 600;
  color: #ffffff;
  line-height: 60px;
  margin-bottom: 60px;
`;
const PageSubTitleBox = styled.div`
  font-size: 32px;
  font-weight: 600;
  color: #c2c5c8;
  line-height: 32px;
  position: relative;
  margin-bottom: 20px;
  &::after {
    content: "";
    position: absolute;
    width: 70px;
    height: 6px;
    background-color: #f7931a;
    bottom: -18px;
    left: 0;
    border-radius: 3px;
    /* transform: translateX(-50%); */
  }
`;
