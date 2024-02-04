/* Components */

import Button from "@/components/Button";
import styled from "@emotion/styled";
import Image from "next/image";
import ValueSkeleton from "./ValueSkeleton";
import Link from "next/link";
import { ProjectType } from "@/utils/types";
import { useMemo } from "react";
import OrderStageIcon from "./OrderStageIcon";
const ListWaperItem: React.FC<{ item: any | null }> = ({
  item,
}) => {
  const statusIcon = useMemo(()=>{
    if(!item){
      return null
    }
    const {publicStage,whitelistStage} = item
    if([publicStage,whitelistStage].includes('Active')){
      return 'Active'
    }else if([publicStage,whitelistStage].includes('Upcoming')){
      return 'Upcoming'
    }
    return 'Ended'
  },[item])
  // console.log({whitelistStage:item?.whitelistStage})
  return (
    <ListWaperItemBox>
      <ListWaperItemPicBox>
        {item === null ? (
          <ValueSkeleton width={719} height={389} />
        ) : (
          <ListWaperItemImage
            alt=""
            src={`data:image/jpeg;base64,${item?.projecthead}`}
            height={389}
            width={719}
          />
        )}
      </ListWaperItemPicBox>
      <ListWaperItemLineBox>
        <div>
          <ListWaperItemUserLineBox>
            {item === null ? (
              <ValueSkeleton width={88} height={88} />
            ) : (
              <ListWaperItemUserImage
                alt=""
                src={`data:image/jpeg;base64,${item?.projectlogo}`}
                height={88}
                width={88}
              />
            )}
            <ListWaperItemUserNameBox>
              <div className="title">
                {item === null ? (
                  <ValueSkeleton width={260} />
                ) : (
                  item?.projectname
                )}
              </div>
              <div className="token">
                <span>{item === null ? (
                  <ValueSkeleton width={150} />
                ) : (
                  item?.projecttokenname
                )}</span>
               {item === null ? <ValueSkeleton width={80}/>:<OrderStageIcon symbol={statusIcon}/>} 
              </div>
            </ListWaperItemUserNameBox>
          </ListWaperItemUserLineBox>
          <ListWaperItemUserDescBox dangerouslySetInnerHTML={{
                __html: item?.projectdescription ? String(item?.projectdescription).replaceAll(
                  "\n",
                  "<br/>"
                ) : '',
              }}/>
        </div>
        {item === null ? (
          <ValueSkeleton width={200} height={40} />
        ) : (
          <ListWaperButtonBox href={`/${item.projecttype === ProjectType.FT ? 'ft':'nft'}/${item?.id}`}>View</ListWaperButtonBox>
        )}
      </ListWaperItemLineBox>
    </ListWaperItemBox>
  );
};

export default ListWaperItem;

const ListWaperButtonBox = styled(Link)`
  display: inline-block;
  width: 416px;
  height: 48px;
  font-size: 18px;
  border-radius: 12px;
  border: 2px solid #c2c5c8;
  font-family: Montserrat, Montserrat-Medium;
  color: #ffffff;
  text-align: center;
  line-height: 48px;
  text-decoration: none;
  position: relative;

  &:hover {
    background: #f7931a;
    border: 2px solid #f7931a;
  }
`;
const ListWaperItemUserDescBox = styled.div`
  font-size: 24px;
  font-weight: 300;
  color: #c2c5c8;
  margin-top: 27px;
  /* height: 180px; */
  width: 416px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;
const ListWaperItemUserNameBox = styled.div`
  font-size: 32px;
  font-weight: 600;
  color: #ffffff;
  width: 304px;
  .title {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .token {
    color: #c2c5c8;
    display: flex;
    align-items: center;
    gap: 16px;
  }
`;
const ListWaperItemUserLineBox = styled.div`
  display: flex;
  gap: 24px;
`;
const ListWaperItemUserImage = styled(Image)`
  border-radius: 20px;
`;
const ListWaperItemLineBox = styled.div`
  flex: 1;
  margin-right: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* margin: 16px; */
  /* width: 416px; */
`;
const ListWaperItemImage = styled(Image)`
  height: auto;
  border-radius: 24px;
`;
const ListWaperItemPicBox = styled.div`
  width: 720px;
  height: 390px;
  border-radius: 30px;
`;
const ListWaperItemBox = styled.div`
  height: 438px;
  display: flex;
  justify-content: space-between;
  background-color: #181b20;
  padding: 24px;
  border-radius: 36px;
  gap: 40px;
`;
