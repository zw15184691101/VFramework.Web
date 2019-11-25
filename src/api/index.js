import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'
const BASE = ""
/* 
包含应用中所有请求接口的函数：接口请求函数
函数的返回值都是Promise对象
*/

//登陆请求
export const reqLogin = (username,password)=> ajax.post(`${BASE}/login`,{username,password})

//通过jsonp请求天气信息
export const reqWeather = (city) => {
    /* 
        执行器函数：内部去执行异步任务
        成功了调用resolve,失败了不调用reject，直接提示错误
    */
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    return new Promise((resolve,reject)=>{
        jsonp(url,{},(err,data)=>{
            if (!err) {//获取成功
                const { dayPictureUrl,weather} = data.results[0].weather_data[0]
                resolve({ dayPictureUrl,weather})
            }else{//获取数据失败
                message.error('获取天所信息失败')
            }
        })
    })
}
