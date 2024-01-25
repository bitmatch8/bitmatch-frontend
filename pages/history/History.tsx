/* Components */

import Page from "@/components/Page";

import {
  useSelector,
  selectWallter,
} from "@/lib/redux";
import OrderHistory from "@/components/OrderHistory";
import { Spaced } from "@/components/Spaced";


export default function IndexPage() {
  const {address} =useSelector(selectWallter)

  return (
    <Page>
      <OrderHistory address={address} title={<Spaced size="100" />}/>
    </Page>
  );
}


