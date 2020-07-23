import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    userList: "",
    roles: "超级管理员",
  },
})
export default store
