/* Components */

import Button from "@/components/Button"
import Page from "@/components/Page"
import styled from "@emotion/styled"
import { useState } from "react"
import DemoImg_01 from "@/assets/img/demo_1.png"
import DemoUser_01 from "@/assets/img/demo_user.png"
import Image from "next/image"
import UpcommingImg1 from "@/assets/img/upcomming1.png"
import UpCommingImg2 from "@/assets/img/upcomming2.png"
import EndedImg from "@/assets/img/ended.png"
import { ProjectItemType } from "@/lib/redux"

const ListWaperItem: React.FC<{ item: ProjectItemType }> = ({ item }) => {
  const StatusImgs: { [key: string]: any } = {
    "Upcoming1": UpcommingImg1,
    "Ended": EndedImg,
    "Upcoming2": UpCommingImg2,
  }
  return (
    <ListWaperItemBox>
      <ListWaperItemPicBox>
        <ListWaperItemImage alt="" src={DemoImg_01} width={719} />
      </ListWaperItemPicBox>
      <ListWaperItemLineBox>
        <div>
          <ListWaperItemUserLineBox>
            <ListWaperItemUserImage alt="" src={DemoUser_01} width={88} />
            <ListWaperItemUserNameBox>
              <div className="title">{item.projectname}</div>
              <div className="token">
                {item.projecttokenname}
                {/* <ListWaperItemStatusImage alt="" src={StatusImgs[item.status]}/> */}
              </div>
            </ListWaperItemUserNameBox>
          </ListWaperItemUserLineBox>
          <ListWaperItemUserDescBox>
            {item.projectdescription}
          </ListWaperItemUserDescBox>
        </div>
        <ListWaperButtonBox to={`/ft/${item.id}`} variant="secondary">
          View
        </ListWaperButtonBox>
      </ListWaperItemLineBox>
    </ListWaperItemBox>
  )
}

export default ListWaperItem

const ListWaperButtonBox = styled(Button)`
  width: 416px;
  height: 48px;
`
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
`
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
`
const ListWaperItemUserLineBox = styled.div`
  display: flex;
  gap: 24px;
`
const ListWaperItemStatusImage = styled(Image)`
  width: auto;
  height: 30px;
`
const ListWaperItemUserImage = styled(Image)`
  height: auto;
`
const ListWaperItemLineBox = styled.div`
  flex: 1;
  margin-right: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* margin: 16px; */
  /* width: 416px; */
`
const ListWaperItemImage = styled(Image)`
  height: auto;
`
const ListWaperItemPicBox = styled.div`
  width: 720px;
  height: 390px;
  border-radius: 30px;
`
const ListWaperItemBox = styled.div`
  height: 438px;
  display: flex;
  justify-content: space-between;
  background-color: #181b20;
  padding: 24px;
  border-radius: 24px;
  gap: 40px;
`
