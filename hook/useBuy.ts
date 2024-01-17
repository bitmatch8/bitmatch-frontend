import { addToast, useDispatch } from "@/lib/redux"
import { useMemo, useState } from "react"

const useBuy = (info: any, readData: any) => {
  const dispatch = useDispatch()
  const [value, setValue] = useState("")

  //单地址最低份额
  const mposa = useMemo(() => info.mposa, [info])
  //单地址最高份额
  const hposa = useMemo(() => info.hposa, [info])
  //用户已购买份额
  const singlePersonPurchased = useMemo(
    () => info.singlePersonPurchased,
    [info]
  )

  const availableAmount = useMemo(() => {
    return (info?.tokennumber || 0) - (info?.totalPersonPurchased || 0)
  }, [info])
  const minAmount = useMemo(() => {
    return mposa
  }, [mposa])
  const maxAmount = useMemo(() => {
    const maxNum = hposa - singlePersonPurchased
    return maxNum > availableAmount ? availableAmount : maxNum
  }, [hposa, singlePersonPurchased, availableAmount])

  const onChangeInput = (e: any) => {
    let { value } = e.target
    // const reg = /^-?\d*(\.\d*)?$/;
    const reg = /^-?\d*?$/
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      if (value === "") {
        value = ""
      } else if (Number(value) < Number(minAmount)) {
        value = minAmount
      } else if (Number(value) > Number(maxAmount)) {
        value = maxAmount
      }
      setValue(value)
    }
  }

  const callbackSuccess = () => {
    setValue("")
    dispatch(
      addToast({
        contxt: "success",
        icon: "success",
      })
    )
    setTimeout(() => {
      readData()
    }, 2000)
  }

  const onMax = () => {
    onChangeInput({ target: { value: maxAmount } })
  }

  return {
    value,
    onChangeInput,
    callbackSuccess,
    onMax,
  }
}

export default useBuy
