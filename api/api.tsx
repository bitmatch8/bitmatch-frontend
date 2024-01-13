import { objectToUrlParams } from "@/utils"
import Ajax from "./Ajax"

export const fetchDashboardApi=()=>{
	return Ajax.get('/projectInfo/dashboard')
}
export const fetchProjectInfoSelectInfoApi=(params:any)=>{
	const query_params = objectToUrlParams(params)	
	return Ajax.get(`/projectInfo/selectInfo?${query_params}`)
}