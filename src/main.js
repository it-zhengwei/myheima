import Vue from "vue"
import App from "./App.vue"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import store from "@/vuex/index.js"
Vue.use(ElementUI)
Vue.config.productionTip = false
import router from "@/router/index.js"
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
