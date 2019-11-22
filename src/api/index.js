import ajax from './ajax'
const BASE = ""

//登陆请求
export const reqLogin = (username,password)=> ajax.post(`${BASE}/login`,{username,password})
