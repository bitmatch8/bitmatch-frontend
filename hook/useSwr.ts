import { useMemo } from "react"
import swr from "swr"

const useSwr = (arg:any,api:any,opt:any):any => {
  const { data, isLoading, error } = swr(arg, api,opt)
  const result=useMemo(()=>{
    if(error || isLoading || !data){
      return null
    } 
    const {code,data:reponse} = data
    if(code === 0){
      return reponse
    }
  },[data,isLoading,error])
  return result
}

export default useSwr
