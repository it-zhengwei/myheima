import axios from "axios"

//导入element-ui的提示框Message
import { Message } from "element-ui"
let copy = axios.create({
  baseURL: "http://127.0.0.1/heimamm/public",
  withCredentials: true,
})
copy.interceptors.request.use(
  function(config) {
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
    } else {
      Message.error(response.data.message)
      return Promise.reject("error")
    }
  },
  function(error) {
    return Promise.reject(error)
  }
)
//获取验证码
function getRcode(data) {
  return copy({
    url: "/sendsms",
    method: "post",
    data,
  })
}
//注册接口
function register(data) {
  return copy({
    url: "/register",
    method: "post",
    data,
  })
}
//登录接口
function login(data) {
  return copy({
    url: "/login",
    method: "post",
    data,
  })
}
export { getRcode, register, login }
