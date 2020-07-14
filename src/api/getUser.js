import copy from "./copy"
function getUser() {
  return copy({
    url: "/info",
  })
}
// 暴露出来
export { getUser }
