<template>
  <el-dialog :visible="bol" class="register" width="600px">
    <div slot="title" class="title">用户注册</div>
    <el-form :model="form" :rules="rules" label-width="100px" ref="form">
      <el-form-item label="头像" prop="avatar">
        <el-upload
          :action="icon_url"
          name="image"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-success="success"
          class="upload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          :show-password="true"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="图形码" prop="captchat">
        <el-row>
          <el-col :span="16">
            <el-input
              v-model="form.captchat"
              placeholder="请输入图形码"
            ></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img
              class="avatar_image"
              @click="refresh"
              :src="avatar_image"
              alt
            />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" prop="rcode">
        <el-row>
          <el-col :span="16">
            <el-input
              v-model="form.rcode"
              placeholder="请输入验证码"
            ></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-button @click="getRcode" :disabled="msg < 5"
              ><span v-if="msg == 5">获取用户验证码</span
              ><span v-else>{{ msg + 1 }}</span></el-button
            >
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="footer">
      <el-button @click="bol = false">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getRcode, register } from "@/api/register.js"
export default {
  data() {
    return {
      avatar_image: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      icon_url: process.env.VUE_APP_URL + "/uploads",
      imageUrl: "",
      bol: false,
      msg: 5,
      form: {
        username: "",
        phone: "",
        email: "",
        captchat: "",
        password: "",
        rcode: "",
        avatar: "",
      },
      rules: {
        username: [{ required: true, message: "必填", trigger: "change" }],
        phone: [
          {
            validator: (rule, value, callback) => {
              if (
                /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
                  value
                )
              ) {
                callback()
              } else {
                callback(new Error("请输入正确的手机号"))
              }
            },
            trigger: "change",
          },
          { required: true, message: "必填", trigger: "change" },
        ],
        email: [
          {
            validator: (rule, value, callback) => {
              if (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
                callback()
              } else {
                callback(new Error("请输入正确的email"))
              }
            },
            trigger: "change",
          },
          { required: true, message: "必填", trigger: "change" },
        ],
        captchat: [
          {
            validator: (rule, value, callback) => {
              if (/^\d{4}$/.test(value)) {
                callback()
              } else {
                callback(new Error("请输入4个数字"))
              }
            },
          },
          { required: true, message: "必填", trigger: "change" },
        ],
        password: [{ required: true, message: "必填", trigger: "change" }],
        rcode: [{ required: true, message: "必填", trigger: "change" }],
        avatar: [{ required: true, message: "必填", trigger: "change" }],
      },
    }
  },
  //侦听器  侦听bol的变化
  watch: {
    bol(newVal) {
      if (newVal == false) {
        //把表单的内容清空
        this.$refs.form.resetFields()
      }
    },
  },
  methods: {
    //刷新图形验证码  因为img有缓存  所以在接口后拼接时间戳或者随机数
    refresh() {
      this.avatar_image =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&&sdaf=" + Date.now()
    },
    //获取验证码
    getRcode() {
      //部分表单验证
      //声明一个全局变量来保存总秒数
      let num = 0
      this.$refs.form.validateField(["phone", "captchat"], (error) => {
        window.console.log(error)
        //如果error是空 代表验证成功 否则失败   因为是验证两个 所以会执行两次  所以num如是是2代表全部验证成功
        if (error == "") {
          num++
        }
        if (num == 2) {
          //验证成功  发送请求获取验证码
          getRcode({
            code: this.form.captchat,
            phone: this.form.phone,
          }).then((res) => {
            // window.console.log(res)
            if (res.data.code == 200) {
              //因为this.$message.success里的内容只能是字符串
              this.$message.success(res.data.data.captcha + "")
            } else {
              this.$message.error(res.data.message)
            }
          })
          //给按钮设置倒计时
          this.msg--
          let timeID = setInterval(() => {
            this.msg--
            if (this.msg <= -1) {
              clearInterval(timeID)
              this.msg = 5
            }
          }, 1000)
        }
      })
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg"
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!")
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!")
      }
      return isJPG && isLt2M
    },
    success(res) {
      //把响应的图片赋值给表单的avatar
      this.form.avatar = res.data.file_path
      //部分表单验证 手动触发
      this.$refs.form.validateField("avatar", (error) => {
        window.console.log(error)
      })
      this.imageUrl = process.env.VUE_APP_URL + "/" + res.data.file_path
    },
    submit() {
      this.$refs.form.validate((v) => {
        if (v) {
          //发送注册请求
          register(this.form).then((res) => {
            // window.console.log(res)
            if (res.data.code == 200) {
              this.$message.success("注册成功")
              //关闭注册对话框
              this.bol = false
            } else {
              this.$message.error(res.data.message)
            }
          })
        } else {
          this.$message({
            type: "error",
            message: "请完善信息",
          })
        }
      })
    },
  },
}
</script>

<style lang="less">
.title {
  width: 100%;
  height: 53px;
  background: linear-gradient(to right, #02c2fa, #1297fa);
  font-size: 24px;
  font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
  font-weight: 400;
  text-align: center;
  color: #fefefe;

  letter-spacing: 0px;
  line-height: 53px;
}
.register .el-dialog__header {
  padding: 0;
}
.footer {
  text-align: center;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.upload {
  border: 1px dashed #d9d9d9;
  width: 178px;
  height: 178px;
  margin: 0 auto;
}
.avatar_image {
  width: 100%;
  height: 41px;
}
</style>
