<template>
  <el-dialog :visible="bol" class="register" width="600px">
    <div slot="title" class="title">用户注册</div>
    <el-form :model="form" :rules="rules" label-width="100px" ref="form">
      <el-form-item label="头像" prop="icon">
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
        <el-input v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="图形码" prop="avatar">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.avatar" placeholder="请输入图形码"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img class="avatar_image" :src="avatar_image" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" prop="rcode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode" placeholder="请输入验证码"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-button>获取用户验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="footer">
      <el-button @click="bol=false">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      avatar_image: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      icon_url: process.env.VUE_APP_URL + "/uploads",
      imageUrl: "",
      bol: false,
      form: {
        username: "",
        phone: "",
        email: "",
        avatar: "",
        password: "",
        rcode: "",
        icon: ""
      },
      rules: {
        username: [{ required: true, message: "必填", trigger: "change" }],
        phone: [{ required: true, message: "必填", trigger: "change" }],
        email: [{ required: true, message: "必填", trigger: "change" }],
        avatar: [{ required: true, message: "必填", trigger: "change" }],
        password: [{ required: true, message: "必填", trigger: "change" }],
        rcode: [{ required: true, message: "必填", trigger: "change" }],
        icon: [{ required: true, message: "必填", trigger: "change" }]
      }
    };
  },
  methods: {
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    success(res) {
      this.form.icon = process.env.VUE_APP_URL + "/" + res.data.file_path;
      this.imageUrl = process.env.VUE_APP_URL + "/" + res.data.file_path;
    },
    submit() {
      this.$refs.form.validate(v => {
        if (v) {
          this.$message.success("注册成功");
        } else {
          this.$message({
            type: "error",
            message: "注册失败"
          });
        }
      });
    }
  }
};
</script>

<style lang='less'>
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