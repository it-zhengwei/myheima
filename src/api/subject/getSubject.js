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
export { getSubject, setStatus }
