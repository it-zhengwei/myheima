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
//新增
function add(data) {
  return copy({
    url: "/user/add",
    method: "post",
    data,
  })
}
//编辑
function edit(data) {
  return copy({
    url: "/user/edit",
    method: "post",
    data,
  })
}
//删除
function dele(data) {
  return copy({
    url: "/user/remove",
    method: "post",
    data,
  })
}
//暴露
export { userList, update, add, edit, dele }
