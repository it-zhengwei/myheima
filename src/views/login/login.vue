<template>
  <div class="login">
    <div class="header">
      <div class="left">
        <img class="logo" src="@/assets/img/login_logo.png" alt />
        <span class="t1">黑马面面</span>
        <div class="_border"></div>
        <span class="t2">用户登录</span>
      </div>
      <el-form :model="form" class="form" :rules="rules" ref="form">
        <el-form-item prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" :show-password="true"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8">
              <img class="code" @click="refresh" :src="code_image" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="isYes">
          <el-checkbox v-model="form.isYes" label="勾选">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="login">登录</el-button>
          <br />
          <el-button class="btn" type="primary" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
      <register ref="register"></register>
    </div>
    <div class="right">
      <img src="@/assets/img/login_right.png" alt />
    </div>
  </div>
</template>

<script>
import register from "@/components/register.vue";
import { login } from "@/api/register.js";
//导入保存token的js   获取token的js
import { setItem, getItem } from "@/utils/token.js";
export default {
  //如果进入该页面有token 那就强制跳转到layout页面
  created() {
    // 判断是否有token  主要是针对登录了的用户然后手动去到登录页
    if (getItem()) {
      // 如果没有值是undefined 就不跳转  如果有token  就跳转到layout页面
      this.$router.push("/layout");
    }
  },
  components: {
    register
  },
  data() {
    return {
      code_image: process.env.VUE_APP_URL + "/captcha?type=login",
      form: {
        phone: "",
        password: "",
        code: "",
        isYes: ""
      },
      rules: {
        phone: [
          { required: true, message: "必填", trigger: "change" },
          //自定义表单验证
          {
            validator: (rule, value, callback) => {
              if (
                /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
                  value
                )
              ) {
                callback();
              } else {
                callback(new Error("请输入正确的手机号码"));
              }
            },
            trigger: "change"
          }
        ],
        password: [{ required: true, message: "必填", trigger: "change" }],
        code: [
          { required: true, message: "必填", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              if (/^\d{4}$/.test(value)) {
                callback();
              } else {
                callback(new Error("验证码是4个数字"));
              }
            },
            trigger: "change"
          }
        ],
        isYes: [
          { required: true, message: "必填", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              if (value == true) {
                callback();
              } else {
                callback(new Error("请勾选协议"));
              }
            },
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    refresh() {
      this.code_image =
        process.env.VUE_APP_URL + "/captcha?type=login&sdaf=" + Date.now();
    },
    register() {
      this.$refs.register.bol = true;
    },
    login() {
      this.$refs.form.validate(v => {
        if (v) {
          //验证成功就发送登录请求
          login(this.form).then(res => {
            // window.console.log(res);
            //保存token
            setItem(res.data.token);
            //跳转到layout页面
            this.$router.push("/layout");
            this.$message({
              type: "success",
              message: "登录成功"
            });
          });
        } else {
          this.$message({
            type: "error",
            message: "登录失败"
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.login {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;

  background: linear-gradient(to right, #1493fa, #01c6fa);
  .header {
    width: 478px;
    height: 550px;
    background: #f5f5f5;
    padding: 50px;
    .left {
      display: flex;
      align-items: center;
      width: 100%;
      .logo {
        width: 22px;
        height: 17px;
        margin-right: 20px;
      }
      .t1 {
        font-size: 24px;
        font-family: SourceHanSansCN Regular, SourceHanSansCN Regular-Regular;
        font-weight: 400;
        text-align: left;
        color: #0c0c0c;
      }
      ._border {
        width: 1px;
        height: 28px;
        background: #c7c7c7;
        margin: 0 20px;
      }
      .t2 {
        font-size: 22px;
        font-family: PingFangSC Regular, PingFangSC Regular-Regular;
        font-weight: 400;
        text-align: left;
        color: #0c0c0c;
      }
    }
    .form {
      margin-top: 20px;
    }
    .code {
      width: 100%;
      height: 40px;
    }
    .btn {
      width: 100%;
      height: 100%;
      margin-top: 20px;
    }
  }
}
</style>
