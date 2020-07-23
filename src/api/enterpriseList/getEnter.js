import copy from "@/api/copy.js"
//获取企业列表
function getEnter(params) {
  return copy({
    url: "/enterprise/list",
    params,
  })
}
//设置状态
function setEnter(data) {
  return copy({
    url: "/enterprise/status",
    method: "post",
    data,
  })
}
//删除企业
function deleteEnter(data) {
  return copy({
    url: "/enterprise/remove",
    method: "post",
    data,
  })
}
//新增
function addEnter(data) {
  return copy({
    url: "/enterprise/add",
    method: "post",
    data,
  })
}
//编辑
function editEnter(data) {
  return copy({
    url: "/enterprise/edit",
    method: "post",
    data,
  })
}
export { getEnter, setEnter, deleteEnter, addEnter, editEnter }
