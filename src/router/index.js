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
      //配置路由元信息
      meta: {
        title: "登录",
      },
    },
    //路由重定向
    {
      path: "*",
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
          meta: {
            title: "数据概览",
          },
        },
        {
          path: "enterpriseList",
          component: enterpriseList,
          meta: {
            title: "企业列表",
          },
        },
        {
          path: "questionList",
          component: questionList,
          meta: {
            title: "题库列表",
          },
        },
        {
          path: "subject",
          component: subject,
          meta: {
            title: "学科列表",
          },
        },
        {
          path: "userList",
          component: userList,
          meta: {
            title: "用户列表",
          },
        },
      ],
    },
  ],
})

//nprogress进度条  是一个插件 使用需要安装  导入 js css  start()是进度条开始  done()是进度条结束
//设置在导航守卫里 可以给路由跳转一个进度条动画
import Nprogress from "nprogress"
import "nprogress/nprogress.css"

//设置导航守卫
//前置守卫  to代表目标路由  from代表当前路由 next表示是否给路由跳转
//后置守卫  to 代表目标路由 已经进入了目标路由    from代表哪里来的路由
// to from 都代表当前的路由信息  $route
//前置守卫
router.beforeEach((to, from, next) => {
  //路由离开前开始进度条
  Nprogress.start()

  next()
})
//后置守卫
router.afterEach((to) => {
  //设置标题为当前路由的元信息的title值
  document.title = to.meta.title
  //路由到达了结束进度条
  Nprogress.done()
})
export default router
