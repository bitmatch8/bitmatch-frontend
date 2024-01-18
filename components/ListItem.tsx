/* Components */

import Button from "@/components/Button";
import styled from "@emotion/styled";
import Image from "next/image";
import { ProjectItemType } from "@/lib/redux";
import ValueSkeleton from "./ValueSkeleton";

const ListWaperItem: React.FC<{ item: ProjectItemType | null }> = ({
  item,
}) => {
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
                {item === null ? (
                  <ValueSkeleton width={150} />
                ) : (
                  item?.projecttokenname
                )}
              </div>
            </ListWaperItemUserNameBox>
          </ListWaperItemUserLineBox>
          <ListWaperItemUserDescBox>
            {item?.projectdescription}
          </ListWaperItemUserDescBox>
        </div>
        {item === null ? (
          <ValueSkeleton width={200} height={40} />
        ) : (
          <ListWaperButtonBox to={`/ft/${item?.id}`} variant="secondary">
            View
          </ListWaperButtonBox>
        )}
      </ListWaperItemLineBox>
    </ListWaperItemBox>
  );
};

export default ListWaperItem;

const ListWaperButtonBox = styled(Button)`
  width: 416px;
  height: 48px;
  font-size: 18px;
  font-family: Montserrat, Montserrat-Medium;
  border-radius: 12px;
  border: 2px solid #c2c5c8;
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
