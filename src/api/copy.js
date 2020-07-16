import axios from "axios"
//导入获取token的js
import { getItem } from "@/utils/token.js"
//导入element-ui的提示框Message
import { Message } from "element-ui"
//导入router
import router from "@/router/index.js"
let copy = axios.create({
  baseURL: "http://127.0.0.1/heimamm/public",
  withCredentials: true,
})
copy.interceptors.request.use(
  function(config) {
    //请求拦截 设置请求头携带token
    // window.console.log(config)
    config.headers.token = getItem()
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)
copy.interceptors.response.use(
  function(response) {
    //响应拦截 如是状态码是200 就响应数据 如果不是就中止后面then执行
    if (response.data.code == 200) {
      //把响应信息的data去掉  axios喜欢套一层data
      return response.data
    } else if (response.data.code == 206) {
      //这是直接打网址进去或者token超时了  因为强制跳转到首页
      router.push("/")
      //返回promise.reject()中止执行后面的then
      return Promise.reject("请登录")
    } else {
      // window.console.log(response)

      Message.error(response.data.message)
      return Promise.reject("error")
    }
  },
  function(error) {
    return Promise.reject(error)
  }
)
//暴露出去
export default copy
