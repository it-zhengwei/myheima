<template>
  <div class="questionList">
    <el-card>
      <el-form ref="form" :model="form" label-width="70px" :inline="true">
        <el-form-item label="学科" prop="subject">
          <el-select v-model="form.subject" placeholder="请选择学科">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="(item, index) in subjectArr"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" prop="step">
          <el-select v-model="form.step" placeholder="请选择阶段">
            <el-option
              :label="item"
              :value="index + 1"
              v-for="(item, index) in stepArr"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="enterprise">
          <el-select v-model="form.enterprise" placeholder="请选择企业">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="(item, index) in enterArr"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型" prop="type">
          <el-select v-model="form.type" placeholder="请选择题型">
            <el-option
              :label="item"
              :value="index + 1"
              v-for="(item, index) in questionArr"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="难度" prop="difficulty">
          <el-select v-model="form.difficulty" placeholder="请选择难度">
            <el-option
              :label="item"
              :value="index + 1"
              v-for="(item, index) in difficultyArr"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" prop="username">
          <el-input v-model="form.username" class="username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="create_data">
          <el-date-picker
            v-model="form.create_data"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" class="txt"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" @click="add">+新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="content">
      <el-table :data="tableList" border>
        <el-table-column label="序号" width="50px">
          <template v-slot="scope">
            {{ (page - 1) * size + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="题目" width="200px">
          <template v-slot="scope">
            <div v-html="scope.row.title"></div>
          </template>
        </el-table-column>
        <el-table-column label="学科.阶段" width="200px">
          <template v-slot="scope">
            {{ scope.row.subject_name }}.{{ stepArr[scope.row.step - 1] }}
          </template>
        </el-table-column>
        <el-table-column label="题型" width="80px">
          <template v-slot="scope">
            {{ questionArr[scope.row.type - 1] }}
          </template>
        </el-table-column>
        <el-table-column label="企业" prop="enterprise_name"></el-table-column>
        <el-table-column
          label="创建者"
          prop="username"
          width="150px"
        ></el-table-column>
        <el-table-column label="状态" width="90px">
          <template v-slot="scope">
            {{ scope.row.status == 0 ? '禁用' : '启用' }}
          </template>
        </el-table-column>
        <el-table-column
          label="访问量"
          prop="reads"
          width="80px"
        ></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" @click="setStatus(scope.row.id)">{{
              scope.row.status == 0 ? '启用' : '禁用'
            }}</el-button>
            <el-button type="text" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination1"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="page"
        :page-sizes="[2, 10, 20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <question
      :mode="mode"
      @getData="getData"
      @search="search"
      ref="question"
      :subjectArr="subjectArr"
      :enterArr="enterArr"
      :stepArr="stepArr"
      :questionArr="questionArr"
      :difficultyArr="difficultyArr"
    ></question>
  </div>
</template>

<script>
//导入对话框组件
import question from '@/components/question.vue'
//导入学科列表接口
import { getSubject } from '@/api/subject/getSubject.js'
//导入企业列表接口
import { getEnter } from '@/api/enterpriseList/getEnter.js'
//导入题库列表接口
import { getQuestion, status, dele } from '@/api/question/index.js'
export default {
  //注册
  components: {
    question
  },
  data () {
    return {
      mode: '',
      form: {
        subject: '', //学科,
        step: '', //阶段
        enterprise: '', //企业
        type: '', //题型
        username: '', //作者
        difficulty: '', //难度
        status: '', //状态
        create_data: '', //日期
        title: '' //标题
      },
      //学科数组
      subjectArr: [],
      //阶段数组
      stepArr: ['初级', '中级', '高级'],
      //企业数组
      enterArr: [],
      //题型数组
      questionArr: ['单选', '多选', '简答'],
      //难度数组
      difficultyArr: ['简单', '一般', '困难'],
      //题库列表
      tableList: [],
      //默认页
      page: 1,
      //默认页容量
      size: 2,
      //总条数
      total: 0
    }
  },
  methods: {
    //编辑
    edit (data) {
      this.$refs.question.form = data
      //改变状态
      this.mode = 'edit'
      //打开对话框
      this.$refs.question.isShow = true
    },
    //新增
    add () {
      this.mode = 'add'
      //打开对话框
      this.$refs.question.isShow = true
    },
    //删除功能
    del (id) {
      dele({ id }).then(() => {
        this.$confirm('你确定要删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            //提示用户
            this.$message.success('删除成功')
            //更新数据
            this.search()
          })
          .catch(() => {})
      })
    },
    //设置状态
    setStatus (id) {
      status({ id }).then(() => {
        //提示用户
        this.$message.success('设置状态成功')
        //更新数据
        this.getData()
      })
    },
    //清除表单功能
    reset () {
      this.$refs.form.resetFields()
      //执行搜索
      this.search()
    },
    //搜索功能
    search () {
      //默认获取第一页的数据
      this.page = 1
      this.getData()
    },
    //获取默认题库列表的方法
    getData () {
      let data = {
        ...this.form,
        page: this.page,
        limit: this.size
      }
      getQuestion(data).then(res => {
        // window.console.log(res)
        this.tableList = res.data.items
        this.tableList.forEach(v => {
          window.console.log(v.city)
          v.city = v.city.split(',')
          v.multiple_select_answer = v.multiple_select_answer.split(',')
        })
        this.total = res.data.pagination.total
      })
    },
    //页容量改变触发的回调函数
    sizeChange (size) {
      //获取当前的页容量
      this.size = size
      //默认获取第一页数据
      this.page = 1
      this.getData()
    },
    //页码改变触发的回调函数
    currentChange (page) {
      //获取当前页数据
      this.page = page
      this.getData()
    }
  },
  created () {
    //获取学科列表
    getSubject().then(res => {
      // window.console.log(res)
      let nameList = res.data.items.map(v => {
        return {
          name: v.name,
          id: v.id
        }
      })
      //把学科数组保存起来
      this.subjectArr = nameList
    })
    //获取企业列表
    getEnter().then(res => {
      // window.console.log(res)
      let enter = res.data.items.map(v => {
        return {
          name: v.name,
          id: v.id
        }
      })
      //把企业数组保存起来
      this.enterArr = enter
    })
    //获取题库列表
    this.getData()
  }
}
</script>

<style lang="less">
.questionList {
  .username {
    width: 220px;
  }
  .txt {
    width: 300px;
  }
  .content {
    margin-top: 20px;
  }
  .pagination1 {
    text-align: center;
  }
}
</style>
