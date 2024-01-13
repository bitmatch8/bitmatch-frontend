/* Instruments */
import type { FilterTypeProps, ReduxThunkAction } from "@/lib/redux"
import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk"
import { fetchDashboardApi, fetchProjectInfoSelectInfoApi } from "@/api/api"
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchDashboardAsync = createAppAsyncThunk(
  "luanch/fetchDashboard",
  async () => {
    const response = await fetchDashboardApi()
    return response.data
  }
)
export const fetchProjectInfoSelectInfoAsync = createAppAsyncThunk(
  "luanch/ProjectInfoSelectInfo",
  async ({
    pageNum,
    pageSize,
    tabType,
  }: {
    pageNum: number
    pageSize: number
    tabType: FilterTypeProps
  }) => {
    const projecttype = tabType === "ALL" ? undefined : tabType === "FT" ? 1 : 2
    const response = await fetchProjectInfoSelectInfoApi({ pageNum, pageSize ,projecttype})
    return { ...response.data, tabType }
  }
)
