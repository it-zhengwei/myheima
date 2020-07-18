import copy from "@/api/copy.js"
function userList(params) {
  return copy({
    url: "/user/list",
    params,
  })
}
//暴露
export { userList }
