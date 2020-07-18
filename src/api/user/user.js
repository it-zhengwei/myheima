import copy from "@/api/copy.js"
//获取默认用户列表
function userList(params) {
  return copy({
    url: "/user/list",
    params,
  })
}
//改变状态
function update(data) {
  return copy({
    url: "/user/status",
    method: "post",
    data,
  })
}
//暴露
export { userList, update }
