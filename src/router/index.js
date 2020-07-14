import VueRouter from "vue-router"
import Vue from "vue"
import login from "@/views/login/login.vue"
import layout from "@/views/layout/layout.vue"
import data from "@/views/layout/children/data.vue"
import enterpriseList from "@/views/layout/children/enterpriseList.vue"
import questionList from "@/views/layout/children/questionList.vue"
import subject from "@/views/layout/children/subject.vue"
import userList from "@/views/layout/children/userList.vue"
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const router = new VueRouter({
  routes: [
    {
      path: "/login",
      component: login,
    },
    //路由重定向
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/layout",
      component: layout,
      //路由重定向
      redirect: "layout/data",
      children: [
        {
          path: "/layout/data",
          component: data,
        },
        {
          path: "enterpriseList",
          component: enterpriseList,
        },
        {
          path: "questionList",
          component: questionList,
        },
        {
          path: "subject",
          component: subject,
        },
        {
          path: "userList",
          component: userList,
        },
      ],
    },
  ],
})
export default router
