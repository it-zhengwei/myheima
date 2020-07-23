<template>
  <div>
    <el-container>
      <el-header class="Header">
        <ul class="top">
          <li class="el-icon-s-fold menu" @click="bol = !bol"></li>
          <li class="layout_logo">
            <img src="@/assets/img/menu.png" alt />
          </li>
          <li class="Title">黑马面面</li>
          <li class="null"></li>
          <li class="layout_avatar">
            <img
              v-if="$store.state.userList != ''"
              :src="baseUrl + '/' + $store.state.userList.avatar"
              alt
            />
          </li>
          <li class="username">{{ $store.state.userList.username }},您好</li>
          <li class="exit">
            <el-button type="primary" @click="exit">退出</el-button>
          </li>
        </ul>
      </el-header>
      <el-container>
        <el-aside width="auto" class="nav">
          <el-menu
            router
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            :collapse="bol"
          >
            <el-menu-item index="/layout/data">
              <i class="el-icon-pie-chart"></i>
              <span slot="title">数据概览</span>
            </el-menu-item>
            <el-menu-item index="/layout/userList">
              <i class="el-icon-user"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
            <el-menu-item index="/layout/questionList">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">题库列表</span>
            </el-menu-item>
            <el-menu-item index="/layout/enterpriseList">
              <i class="el-icon-office-building"></i>
              <span slot="title">企业列表</span>
            </el-menu-item>
            <el-menu-item index="/layout/subject">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">学科列表</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//导入获取用户信息接口
import { getUser } from "@/api/getUser.js"
//导入删除token的js
import { removeItem } from "@/utils/token.js"
export default {
  created() {
    //获取用户信息
    getUser().then((res) => {
      // window.console.log(res)
      //把响应的信息保存在变量中
      // this.userList = res.data
      //把用户信息保存到共享数据管理vuex
      this.$store.state.userList = res.data
      //把用户的身份给vuex
      this.$store.state.roles = res.data.role
      //因为这是异步请求，还没有完成身份赋值可能就访问了组件了
      //在这里再验证一次
      if (!this.$route.meta.roles.includes(this.$store.state.roles)) {
        //提示用户
        this.$message.warning("没有权限访问，请联系管理员")
        // 删除token
        removeItem()
        //路由跳转到登录页
        this.$router.push("/login")
      } else {
        //判断是否被禁用
        if (res.data.status == 0) {
          //提示用户
          this.$message.warning("您被冻结了，请联系管理员")
          // 删除token
          removeItem()
          //路由跳转到登录页
          this.$router.push("/login")
        }
      }
    })
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_URL,
      bol: false,
      userList: "",
    }
  },
  methods: {
    //退出操作
    exit() {
      this.$confirm("你确定要退出", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //提示用户
          this.$message.success("退出成功")
          //删除token
          removeItem()
          //跳转到登录页
          this.$router.push("/login")
        })
        .catch(() => {})
    },
  },
}
</script>

<style lang="less">
li {
  list-style: none;
}
.Header {
  width: 100%;
  height: 60px;

  .top {
    display: flex;
    align-items: center;
    .menu {
      font-size: 24px;

      margin-right: 22px;
    }
    .layout_logo {
      width: 33px;
      height: 28px;
      img {
        width: 100%;
      }
    }
    .Title {
      margin-left: 11px;
      font-size: 22px;
      font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
      font-weight: bold;
      text-align: left;
      color: #49a1ff;
      letter-spacing: 1px;
    }
    .null {
      flex: 1;
    }
    .layout_avatar {
      width: 43px;
      height: 43px;

      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    .username {
      margin: 0 28px 0 9px;
      font-size: 14px;
      font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
      font-weight: bold;
      text-align: left;
      color: #636363;
      letter-spacing: 0px;
    }
    .exit {
      margin-top: 10px;
    }
  }
}
.nav {
  height: 769px;
  // background-color: red;
}
.main {
  width: 100%;
  height: 769px;
  background-color: #e8e9ec;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
