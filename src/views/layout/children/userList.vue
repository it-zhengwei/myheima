<template>
  <div class="userList">
    <el-card>
      <el-form ref="form" :inline="true" :model="form" label-width="90px">
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
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" @click="add">+新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="footer">
      <el-table :data="userList">
        <el-table-column label="序号" width="70px">
          <template v-slot="scope">{{(page-1)*size+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="用户名" prop="username" width="150px"></el-table-column>
        <el-table-column label="电话" prop="phone" width="150px"></el-table-column>
        <el-table-column label="邮箱" prop="email" width="200px"></el-table-column>
        <el-table-column label="角色" prop="role" width="150px"></el-table-column>
        <el-table-column label="备注" prop="remark" width="150px"></el-table-column>
        <el-table-column label="状态" prop="status" width="100px">
          <template v-slot="scope">
            <div :class="{red:scope.row.status==0}">{{scope.row.status==0?'禁用':'开启'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button @click="setStatus(scope.row.id)">{{scope.row.status==0?'开启':'禁用'}}</el-button>
            <el-button @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="page"
        :page-sizes="[2,10, 20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <addUser ref="son" @search="search" :mode="mode" @getData="getData"></addUser>
  </div>
</template>

<script>
//导入组件
import addUser from "@/components/addUser.vue";
//导入接口
import { userList, update, dele } from "@/api/user/user.js";
export default {
  //注册
  components: {
    addUser
  },
  methods: {
    //删除
    del(id) {
      dele({ id }).then(() => {
        this.$confirm("你确定要删除", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message.success("删除成功");
            //执行搜索功能
            this.search();
          })
          .catch(() => {});
      });
    },
    //编辑
    edit(data) {
      //设置状态
      this.mode = "edit";
      //把整个表单的数据给子组的form  深拷贝一个值给子组件
      this.$refs.son.form = JSON.parse(JSON.stringify(data));

      //打开对话框
      this.$refs.son.isShow = true;
    },
    //新增
    add() {
      //设置状态
      this.mode = "add";
      //打开对话框
      this.$refs.son.isShow = true;
    },
    //改变状态
    setStatus(id) {
      update({ id }).then(() => {
        //提示用户
        this.$message.success("设置状态成功");
        //刷新数据
        this.getData();
      });
    },
    //清除功能
    reset() {
      //获取form的this 调用它的清空表单信息和表单验证的方法
      this.$refs.form.resetFields();
      //刷新数据
      this.getData();
    },
    //搜索功能
    search() {
      //默认搜索第一页
      this.page = 1;
      this.getData();
    },
    //封装获取默认页码页容量的方法
    getData() {
      let data = {
        ...this.form,
        page: this.page,
        limit: this.size
      };
      userList(data).then(res => {
        // window.console.log(res);
        this.userList = res.data.items;
        this.total = res.data.pagination.total;
      });
    },
    //页容量改变
    sizeChange(size) {
      // window.console.log(size);
      this.size = size;
      this.getData();
    },
    //页码改变
    currentChange(page) {
      // window.console.log(page);
      this.page = page;
      this.getData();
    }
  },
  data() {
    return {
      mode: "",
      total: 0,
      page: 1,
      size: 2,
      userList: [],
      form: {
        username: "",
        email: "",
        role_id: ""
      }
    };
  },
  created() {
    this.getData();
  }
};
</script>

<style lang='less'>
.footer {
  margin-top: 20px;
}
</style>