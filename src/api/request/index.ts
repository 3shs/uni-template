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
  const token = uni.getStorageSync('token')
  config.header = {
    ...config.header,
  }
  if (token) {
    config.header.token = token
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
  if (response.data.status === 500) {
    uni.showToast({
      icon: 'error',
      title: '阿星bug！！！！',
    })
    return
  }
  if (response.statusCode === 401) {
    uni.showToast({
      icon: 'error',
      title: '登陆过期～',
    })
    uni.clearStorage()
    setTimeout(() => {
      uni.navigateTo({
        url: '/pages/login/index'
      })
    }, 1000)
    return
  }
  if (response.statusCode === 500) {
    uni.showToast({
      icon: 'error',
      title: response.data || '阿星bug！！！',
    })
    return
  }
  return Promise.reject(response)
})

export default http
