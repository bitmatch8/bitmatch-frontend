import { objectToUrlParams } from "@/utils"
import Ajax from "./Ajax"

export const fetchDashboardApi=()=>{
	return Ajax.get('/projectInfo/dashboard')
}
export const fetchProjectInfoSelectInfoApi=(params:any)=>{
	const query_params = objectToUrlParams(params)	
	return Ajax.get(`/projectInfo/selectInfo?status=1&${query_params}`)
}
export const fetchProjectInfoApi=(id:number)=>{
	return Ajax.get(`/projectInfo/${id}`)
}
export const fetchWhtielistInfoApi=(id:any,type:1 | 2 = 1)=>{
	return Ajax.get(`/whtielist/${id}?type=${type}`)
}