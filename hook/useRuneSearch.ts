import { useMemo } from "react";
import swr from "swr";

const useRuneSearch = (arg: any, api: any, opt: any): any => {
  const { data, isLoading, error, mutate } = swr(arg, api, opt);
  const result = useMemo(() => {
    if (isLoading) {
      return null;
    }
    const res = data?.result || null;
    // 格式化返回值
    if (res && res?.exist) {
      const { rune } = res;
      let runeInfo = [] as any,
        runeList = [] as any;
      if (res?.type === "byname") {
        runeInfo = [
          { name: "rune", label: "Rune", value: rune.runeName },
          // { name: "etcher", label: "Etcher", value: "" },
          {
            name: "amount",
            label: "Total Amount",
            value: (rune?.premine || 0) + (rune?.capacity || 0),
          },
          { name: "height", label: "Height", value: rune.blockHeight },
          // { name: "time", label: "Timestamp", value: "" },
          {
            name: "transaction",
            label: "Genesis Transaction",
            value: rune.txid,
          },
        ];
      } else if (res?.type === "byaddress") {
        runeList = [...res.rune];
      }

      return {
        ...res,
        runeInfo,
        runeList,
      };
    }
    return { ...res, runeInfo: [], runeList: [] };
  }, [data, isLoading, error]);
  return { result, mutate, isLoading };
};

export default useRuneSearch;
