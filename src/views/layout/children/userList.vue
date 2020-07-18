<template>
  <div class="userList">
    <el-card>
      <el-form :inline="true" :model="form" label-width="90px">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="form.role_id" placeholder="请选择状态">
            <el-option value="1" label="超级管理员"></el-option>
            <el-option value="2" label="管理员"></el-option>
            <el-option value="3" label="老师"></el-option>
            <el-option value="4" label="学生"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary">+新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        email: "",
        role_id: ""
      }
    };
  }
};
</script>

<style>
</style>