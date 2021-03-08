/****   http.js   ****/
// 导入封装好的axios实例
import request from './request'

export function get(url,params) {
    const config = {
        method: 'get',
        url:url
    }
    if(params) config.data = params
    return request(config)
}
export function post(url,params) {
    const config = {
        method: 'post',
        url:url
    }
    if(params) config.data = params
    return request(config)
}