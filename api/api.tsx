import { objectToUrlParams } from "@/utils"
import Ajax from "./Ajax"

export const fetchDashboardApi=()=>{
	return Ajax.get('/projectInfo/dashboard')
}
export const fetchProjectInfoSelectInfoApi=(params:any)=>{
	const query_params = objectToUrlParams(params)	
	return Ajax.get(`/projectInfo/selectInfo?status=1&${query_params}`)
}
export const fetchProjectInfoApi=(params:any)=>{
	const query_params = objectToUrlParams(params)	
	return Ajax.get(`/projectInfo/launchById?${query_params}`)
}
export const fetchWhtielistInfoApi=(params:any)=>{
	const query_params = objectToUrlParams(params)	
	// http://101.251.211.205:8066/whtielist/launchById
	return Ajax.get(`/whtielist/launchById?${query_params}`)
}
export const fetchProjectDetailsApi=(id:any)=>{
	return Ajax.get(`/projectDetails/${id}`)
}