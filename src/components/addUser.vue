<template>
  <el-dialog :visible.sync="isShow" class="addUser" width="600px">
    <div slot="title" class="title">{{mode=='add'?'新增用户':'编辑用户'}}</div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role_id">
        <el-select v-model="form.role_id" placeholder="请输入角色">
          <el-option label="超级管理员" :value="1"></el-option>
          <el-option label="管理员" :value="2"></el-option>
          <el-option label="老师" :value="3"></el-option>
          <el-option label="学生" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" placeholder="请输入状态">
          <el-option label="禁用" :value="0"></el-option>
          <el-option label="启用" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="footer">
      <el-button @click="isShow=false">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//导入接口
import { add, edit } from "@/api/user/user.js";
export default {
  props: ["mode"],
  watch: {
    isShow(newVal) {
      if (newVal == false) {
        //表单初始化
        (this.form = {
          username: "", //	是	string	用户名
          email: "", //	是	string	邮箱
          phone: "", //	是	string	手机号
          role_id: "", //	是	string	角色 、2 管理员、3 老师、4 学生
          status: "", //	否	string	1(启用)0(禁用)
          remark: "" //	否	string	备注
        }),
          this.$nextTick(() => {
            this.$refs.form.clearValidate();
          });
      }
    }
  },
  methods: {
    //确定按钮
    submit() {
      this.$refs.form.validate(v => {
        if (v) {
          if (this.mode == "add") {
            add(this.form).then(() => {
              this.$message.success("新增成功");
              //刷新数据
              this.$emit("search");
              //关闭对话框
              this.isShow = false;
            });
          } else {
            edit(this.form).then(() => {
              this.$message.success("编辑成功");
              //刷新默认数据
              this.$emit("getData");
              //关闭对话框
              this.isShow = false;
            });
          }
        } else {
          this.$message.error("请完善信息");
        }
      });
    }
  },
  data() {
    return {
      isShow: false,
      form: {
        username: "", //	是	string	用户名
        email: "", //	是	string	邮箱
        phone: "", //	是	string	手机号
        role_id: "", //	是	string	角色 、2 管理员、3 老师、4 学生
        status: "", //	否	string	1(启用)0(禁用)
        remark: "" //	否	string	备注
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" }
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "change" }],
        phone: [{ required: true, message: "请输入电话", trigger: "change" }],
        role_id: [{ required: true, message: "请输入角色", trigger: "change" }]
      }
    };
  }
};
</script>

<style lang='less'>
.addUser {
  .el-dialog__header {
    padding: 0;
  }
}
</style>