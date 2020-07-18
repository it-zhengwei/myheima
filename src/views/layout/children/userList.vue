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
            <el-button>编辑</el-button>
            <el-button>{{scope.row.status==0?'开启':'禁用'}}</el-button>
            <el-button>删除</el-button>
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
  </div>
</template>

<script>
//导入接口
import { userList } from "@/api/user/user.js";
export default {
  methods: {
    //封装获取默认页码页容量的方法
    getData() {
      let data = {
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