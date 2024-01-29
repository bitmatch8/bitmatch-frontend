import { addToast, selectWallter, useDispatch, useSelector } from "@/lib/redux"
import { useMemo, useState } from "react"
import useSwr from "./useSwr"
import { fetchQueryByWhitelist } from "@/api/api"

const useBuy = (info: any, readData: any, detail: any, stage: any) => {
  const dispatch = useDispatch()
  const [value, setValue] = useState("")
  const { connected, address, network } = useSelector(selectWallter)
  const { result: isWhiteInfo } = useSwr(
    {
      pid: detail.id,
      address,
    },
    address && stage === "whitelist" ? fetchQueryByWhitelist : null,
    {}
  )  
  
  //是否限额
  const isLimit = useMemo(()=>(isWhiteInfo && isWhiteInfo?.share && stage === "whitelist"),[isWhiteInfo,stage])
  // console.log({isLimit},isWhiteInfo , isWhiteInfo?.share , stage === "whitelist")
  //单地址最低份额
  const mposa = useMemo(() => {
    if (isLimit) {
      return isWhiteInfo?.share
    }
    return info.mposa
  }, [info, isWhiteInfo,isLimit])
  //单地址最高份额
  const hposa = useMemo(() => {
    if (isLimit) {
      return isWhiteInfo?.share
    }
    return info.hposa
  }, [info, isWhiteInfo,isLimit])
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
    if (isLimit) {
      return isWhiteInfo?.share
    }
    const maxNum = hposa - singlePersonPurchased

    return maxNum > availableAmount ? availableAmount : maxNum
  }, [hposa, singlePersonPurchased, availableAmount, isWhiteInfo,isLimit])

  const onChangeInput = (e: any) => {
    let { value } = e.target
    // const reg = /^-?\d*(\.\d*)?$/;
    const reg = /^-?\d*?$/
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      if (value === "") {
        value = ""
      } else if (Number(value) > Number(maxAmount)) {
        value = maxAmount
      }
      setValue(value)
    }
  }
  const showValue = useMemo(() => {
    if (isLimit) {
      if (Number(info?.singlePersonPurchased) >= Number(hposa)) {
        return ""
      }
      return isWhiteInfo?.share
    }
    return value
  }, [value, isWhiteInfo, info, hposa,isLimit])

  const callbackSuccess = () => {
    setValue("")
    setTimeout(() => {
      readData()
    }, 5000)
  }

  const inputLoad = useMemo(() => {
    if (stage === "whitelist" && isWhiteInfo === null) {
      return true
    } else if (stage === "whitelist" && (isWhiteInfo === 0 || isWhiteInfo?.share)
    ) {
      return true
    }
    return false
  }, [stage, isWhiteInfo])

  const onMax = () => {
    if (maxAmount > 0 && inputLoad === false) {
      onChangeInput({ target: { value: maxAmount } })
    }
  }

  return {
    isLimit,
    inputLoad,
    isWhiteInfo,
    value: showValue,
    mposa,
    hposa,
    minAmount,
    maxAmount,
    onChangeInput,
    callbackSuccess,
    onMax,
  }
}

export default useBuy
