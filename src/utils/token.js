//保存token
function setItem(value) {
  window.localStorage.setItem("token", value)
}
//获取token
function getItem() {
  //因为需要用到token作为参数  所以需要return
  return window.localStorage.getItem("token")
}
//删除token
function removeItem() {
  window.localStorage.removeItem("token")
}
//暴露出去
export { setItem, getItem, removeItem }
