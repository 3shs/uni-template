import Request from '@/lib/http/index.js'

const http = new Request()

http.setConfig(config => { /* 设置全局配置 */
  config.baseURL = import.meta.env.VITE_API_BASE_URL /* 根域名不同 */
  config.header = {
    ...config.header,
  }
  return config
})

http.interceptors.request.use(config => { /* 请求之前拦截器。可以使用async await 做异步操作 */
  config.header = {
    ...config.header,
  }
  /*
 if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
   return Promise.reject(config)
 }
 */
  return config
}, config => {
  return Promise.reject(config)
})


http.interceptors.response.use(response => { /* 请求之后拦截器。可以使用async await 做异步操作  */
  // if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
  //   return Promise.reject(response)
  // }
  return response.data
}, response => { // 请求错误做点什么。可以使用async await 做异步操作
  console.log(response)
  return Promise.reject(response)
})

export default http
