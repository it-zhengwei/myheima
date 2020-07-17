import copy from "@/api/copy.js"
//获取学科列表
function getSubject(params) {
  return copy({
    url: "/subject/list",
    params,
  })
}
//设置状态
function setStatus(data) {
  return copy({
    url: "/subject/status",
    method: "post",
    data,
  })
}
//新增学科
function addSubject(data) {
  return copy({
    url: "/subject/add",
    method: "post",
    data,
  })
}
//编辑学科
function editSubject(data) {
  return copy({
    url: "/subject/edit",
    method: "post",
    data,
  })
}
//删除学科
function deleteSubject(data) {
  return copy({
    url: "/subject/remove",
    method: "post",
    data,
  })
}
export { getSubject, setStatus, addSubject, editSubject, deleteSubject }
