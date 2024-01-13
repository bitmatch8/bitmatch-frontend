/* Instruments */
import type { FilterTypeProps } from "@/lib/redux"
import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk"
import { fetchProjectInfoSelectInfoApi } from "@/api/api"
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const buySubmitAsync = createAppAsyncThunk(
  "buy/submit",
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
