import { useMemo } from "react"
import swr from "swr"

const useSwr = (arg:any,api:any,opt:any):any => {
  const { data, isLoading, error,mutate } = swr(arg, api,opt)
  const result=useMemo(()=>{
    if(isLoading || !data){
      return null
    }
    const {code,data:reponse} = data
    if(code === 0){
      return reponse
    }else if(code === 1010){
      return 0
    }
    return null
    
  },[data,isLoading,error])
  return {result,mutate} 
}

export default useSwr
