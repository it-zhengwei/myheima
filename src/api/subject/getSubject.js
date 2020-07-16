import copy from "@/api/copy.js"
//获取学科列表
function getSubject() {
  return copy({
    url: "/subject/list",
  })
}
export { getSubject }
