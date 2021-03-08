import axios from 'axios'
import {getTimes,Encrypt} from './utils'
import { Base64 } from 'js-base64';
// import { Notification, MessageBox } from 'element-ui'

// 创建axios实例

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // api 的 base_url
  timeout: 100000 // 请求超时时间
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  console.log(config)
  config.data.time = getTimes(10);
  config.data.sign = Encrypt(config.data.time, config.data.module, config.data.fn);
  config.data = Base64.encode(JSON.stringify(config.data));
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {

  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
});

export default service
