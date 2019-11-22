import axios from 'axios'
import {message} from 'antd'
//import qs from 'qs'//使用这个插件进行转换

//请求拦截器：data数据的json或urlencoded格式在这配置，默认为json
axios.interceptors.request.use(function(config){
    const {method,data} = config
    //处理POST请求，将data对象转换成query参数格式字符串
    if (method.toLowerCase === 'post' && typeof data === 'object') {//判断是否是post请求，并且data是一个对象
        //config.data = qs.stringify(data)
    }
    return config
})

//添加响应拦截器
//功能1：让请求成功的结果不再是response,而是response.data的值
//功能2：统一处理所有请求异常的错误
//在请求返回之后且在我们指定的请求响应回调函数之前
axios.interceptors.response.use(function(response){

    return response.data//返回的结果就会交给我们指定的请求响应的回调

},function(error){
    message.error(`请求失败！${error.message}`)
    //返回一个pending状态的promise，中断promise链
    return new Promise(()=>{})
})

export default axios