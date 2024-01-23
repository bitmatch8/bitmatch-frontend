/* Components */

import Page from "@/components/Page";
import { useEffect } from "react";

import {
  luanchSlice,
  useSelector,
  useDispatch,
  selectLuanch,
  fetchDashboardAsync,
  fetchProjectInfoSelectInfoAsync,
  FilterTypeProps,
  wallterSlice,
  selectWallter,
} from "@/lib/redux";
import OrderHistory from "@/components/OrderHistory";
import { Spaced } from "@/components/Spaced";


export default function IndexPage() {
  const dispatch = useDispatch();
  const {address} =useSelector(selectWallter)
  const {
    pageSize,
  } = useSelector(selectLuanch);
  const onClickTab = (tabType: FilterTypeProps) => {
    dispatch(luanchSlice.actions.setTabs(tabType));
    dispatch(
      fetchProjectInfoSelectInfoAsync({ pageNum: 1, pageSize, tabType })
    );
  };

  const initDash = () => {
    dispatch(fetchDashboardAsync());
  };
  useEffect(() => {
    initDash();
    onClickTab("ALL");
  }, []);
  return (
    <Page>
      <OrderHistory address={address} title={<Spaced size="100" />}/>
    </Page>
  );
}


