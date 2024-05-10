import { fetchRuneEtchingList, fetchRuneMintList } from "@/api/api";
import { OrderState } from "@/utils/types";
import { useMemo } from "react";
import useSWR from "swr";
export type HistoryItemProps = {
  runename?: string;
  type?: string;
  mintAmount?: string;
  sender?: string;
  receriverAddr?: string;
  status?: OrderState;
  amount?: string;
  receiveaddress?: string;
};
type props = {
  sender: any;
  pageNum: any;
  pageSize: any;
  etchingType?: string;
};
const useHistory = (arg: props, opt: any = {}): { list: any[]; total: any } => {
  const { data, isLoading, error } = useSWR(
    arg,
    arg.etchingType == "etching" ? fetchRuneEtchingList : fetchRuneMintList,
    opt
  );
  const result = useMemo(() => {
    if (error || isLoading === true || !data) {
      return { list: null, total: 0 };
    }
    const { result: reponse, code } = data;
    if (code === 0) {
      return reponse;
    }
    return { list: [], total: 0 };
  }, [data, isLoading, error]);
  return result;
};

export default useHistory;
