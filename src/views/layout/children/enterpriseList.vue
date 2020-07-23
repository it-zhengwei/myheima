<template>
  <div>
    <el-card>
      <el-form ref="form" :inline="true" label-width="80px" :model="form">
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="form.eid" class="setWidth"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="form.name" class="setWidth"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="form.username" class="setWidth"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="50px" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option value="1" label="开启"></el-option>
            <el-option value="0" label="禁用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" @click="add">+新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="table">
      <el-table :data="subject">
        <el-table-column label="序号" width="80px">
          <template v-slot="scope">
            <div>{{ (pagination.currentPage-1)*pagination.size+scope.$index + 1 }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="eid" label="企业编号" width="120px"></el-table-column>
        <el-table-column prop="name" label="企业名称" width="150px"></el-table-column>
        <el-table-column prop="short_name" label="简称" width="150px"></el-table-column>
        <el-table-column prop="username" label="创建者" width="150px"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="200px"></el-table-column>
        <el-table-column prop="status" label="状态" width="80px">
          <template v-slot="scope">
            <div :class="{red:scope.row.status==0}">{{ scope.row.status == 0 ? "禁用" : "开启" }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button @click="status(scope.row.id)">{{scope.row.status==0?'开启':'禁用'}}</el-button>
            <el-button @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="pagination.currentPage"
        :page-sizes="[2,10, 20, 30, 40]"
        :page-size="pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <enterpri ref="subject" @search="search" @getData="getData" :mode="mode"></enterpri>
  </div>
</template>

<script>
//导入子组件enterpri
import enterpri from "@/components/enterpri.vue";
//导入接口
import {
  getEnter,
  setEnter,
  deleteEnter,
} from "@/api/enterpriseList/getEnter.js";
export default {
  //注册
  components: {
    enterpri,
  },
  data() {
    return {
      // 定义一个状态值  是否是新增或者是编辑
      mode: "",
      total: 0,
      pagination: {
        currentPage: 1, //初始第一页
        size: 2, //初始页容量
      },
      //表格的数据  el-table 的 data绑定的数据需要是数组
      subject: [],
      form: {
        name: "", //	否	string	企业名称
        page: "", //	否	string	页码 默认为1
        limit: "", //	否	string	页尺寸 默认为10
        eid: "", //	否	string	企业id
        username: "", //	否	string	用户名
        status: "", //	否	string	状态 1（启用） 0（禁用）
      },
    };
  },
  methods: {
    reset() {
      //清除表单内容  //resetFields是清除有prop属性的表单
      this.$refs.form.resetFields();
      //执行搜索功能获取默认的数据
      this.search();
    },
    //编辑
    edit(data) {
      // window.console.log(data);
      //让状态值为edit
      this.mode = "edit";
      //把当前行的数据给子组件的form表单
      this.$refs.subject.form = JSON.parse(JSON.stringify(data));
      //弹出对话框
      this.$refs.subject.isShow = true;
    },

    //页容量改变执行的回调函数
    sizeChange(size) {
      // window.console.log(size);
      // 页容量改变就把当前页容量保存下来 发送请求获取当前页容量的数据  并且默认获取第一页的数据
      this.pagination.size = size;
      this.pagination.currentPage = 1;
      this.getData();
    },
    //页码改变执行的回调函数
    currentChange(page) {
      // window.console.log(page);
      // 页码改变就获取当前页码的数据
      // 把当前页码赋值给默认页码
      this.pagination.currentPage = page;
      this.getData();
    },
    //获取当前默认页和默认页容量的数据
    getData() {
      let params = {
        //把form表单的数据展开过来
        ...this.form,
        page: this.pagination.currentPage,
        limit: this.pagination.size,
      };
      getEnter(params).then((res) => {
        // window.console.log(res);
        //获取到的数据给数组
        this.subject = res.data.items;
        //获取到的总页数保存起来
        this.total = res.data.pagination.total;
      });
    },
    //搜索功能
    search() {
      // //搜索也是默认搜索第一页的数据
      this.pagination.currentPage = 1;
      this.getData();
    },
    //设置状态功能
    status(id) {
      setEnter({ id }).then(() => {
        //提示用户
        this.$message.success("设置状态成功");
        //更新数据
        this.getData();
      });
    },
    //新增功能
    add() {
      //显示对话框
      // //父传子  获取子组件的isShow
      this.$refs.subject.isShow = true;
      //改变状态值为add
      this.mode = "add";
    },
    //删除功能
    del(id) {
      //询问用户是否删除
      this.$confirm("你确定要删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteEnter({ id }).then(() => {
          //提示用户
          this.$message.success("删除成功");
          //执行搜索功能
          this.search();
        });
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less">
.setWidth {
  width: 120px;
}
.table {
  margin-top: 20px;
  text-align: center;
}
.pagination {
  margin-top: 20px;
}
.red {
  color: #ff3d3d;
}
</style>
