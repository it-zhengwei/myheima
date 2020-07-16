<template>
  <div>
    <el-card>
      <el-form ref="form" :inline="true" label-width="80px" :model="form">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="form.rid" class="setWidth"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
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
          <el-button type="primary">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="table">
      <el-table :data="subject">
        <el-table-column label="序号" width="80px">
          <template v-slot="scope">
            <div>
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="rid" label="学科编号" width="120px">
        </el-table-column>
        <el-table-column prop="name" label="学科名称" width="150px">
        </el-table-column>
        <el-table-column prop="short_name" label="简称" width="150px">
        </el-table-column>
        <el-table-column prop="username" label="创建者" width="150px">
        </el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="200px">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80px">
          <template v-slot="scope">
            {{ scope.row.status == 0 ? "禁用" : "开启" }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button v-if="scope.row.status == 0">启用</el-button>
            <el-button v-else>禁用</el-button>
            <el-button @click="delete scope.row">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getSubject } from "@/api/subject/getSubject.js"
export default {
  data() {
    return {
      currentPage: 2,
      //表格的数据  el-table 的 data绑定的数据需要是数组
      subject: [],
      form: {
        name: "", //	否	string	学科名称
        page: "", //	否	string	页码 默认为1
        limit: "", //	否	string	页尺寸 默认为10
        rid: "", //	否	string	学科编号
        username: "", //	否	string	创建者用户名
        status: "", //	否	string	状态 0(禁用) 1(启用)
      },
    }
  },
  methods: {
    reset() {
      //清除表单内容  //resetFields是清除有prop属性的表单
      this.$refs.form.resetFields()
    },
    //编辑
    edit(data) {
      window.console.log(data)
    },
    //删除
    delete(data) {
      window.console.log(data)
    },
    //页容量改变执行的回调函数
    sizeChange(size) {
      window.console.log(size)
    },
    //页码改变执行的回调函数
    currentChange(page) {
      window.console.log(page)
    },
  },
  created() {
    getSubject().then((res) => {
      // window.console.log(res)
      this.subject = res.data.items
    })
  },
}
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
</style>
