import { fetchOrderCList } from "@/api/api"
import { OrderState } from "@/utils/types"
import { useMemo } from "react"
import useSWR from "swr"
export type HistoryItemProps = {
	orderid: string
	projectname: string
	type: string
	tokenname: string
	stage: string
	fromaddr: string
	fundaddr: string
	receivedAddr: string
	transmitAddr: string
	amount: string
	createtime: string
	updatetime: string
	buyAmount: string
	amountFloat: string
	status: OrderState
      }
type props = {
  fromAddr: any
  pageNum: any
  pageSize: any
  pid: any
}
const useHistory = (arg: props,opt:any={}):{list:HistoryItemProps[],total:any} => {
  const { data, isLoading, error } = useSWR(arg, fetchOrderCList,opt)
  const result = useMemo(() => {
    if (error || isLoading === true || !data) {
      return { list: null,total:0 }
    }
    const { data: reponse, code } = data
    if (code === 0) {
      return reponse
    }
    return { list: [], total: 0 }
  }, [data, isLoading, error])
  return result
}

export default useHistory
