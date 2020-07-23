import copy from "@/api/copy.js"
//获取面板数据接口
function title() {
  return copy({
    url: "/data/title",
  })
}
//企业数据
function statistics() {
  return copy({
    url: "/data/statistics",
  })
}
export { title, statistics }
