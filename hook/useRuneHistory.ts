import { fetchRuneOrderList } from "@/api/api";
import { OrderState } from "@/utils/types";
import { useMemo } from "react";
import useSWR from "swr";
export type HistoryItemProps = {
  runeName: string;
  type: string;
  mintAmount: string;
  fee: string;
  fromaddr: string;
  receriverAddr: string;
  state: OrderState;
};
type props = {
  fromAddr: any;
  pageNum: any;
  pageSize: any;
};
const useHistory = (arg: props, opt: any = {}): { list: any[]; total: any } => {
  const { data, isLoading, error } = useSWR(arg, fetchRuneOrderList, opt);
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
