<template>
  <el-dialog :visible.sync="isShow" class="question" :fullscreen="true">
    <div slot="title" class="title">
      {{ mode == 'add' ? '新增题库测试' : '编辑题库测试' }}
    </div>
    <el-form ref="form" :rules="rules" :model="form" label-width="200px">
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
      <el-form-item label="城市" prop="city">
        <el-cascader
          v-model="form.city"
          :options="options"
          :props="{ value: 'label' }"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="题型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio
            :label="index + 1"
            v-for="(item, index) in questionArr"
            :key="index"
            >{{ item }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度" prop="difficulty">
        <el-radio-group v-model="form.difficulty">
          <el-radio
            :label="index + 1"
            v-for="(item, index) in difficultyArr"
            :key="index"
            >{{ item }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <hr />
      <el-form-item label="试题标题" prop="title">
        <quillEditor
          v-model="form.title"
          placeholder="请在这里输入..."
          @change="yanzheng"
        ></quillEditor>
      </el-form-item>
      <el-form-item
        :label="questionArr[form.type - 1]"
        :prop="arr[form.type - 1]"
      >
        <allSelect @yanzheng="yanzheng" :form="form"></allSelect>
      </el-form-item>
      <hr />
      <el-form-item label="解析视频">
        <upload v-model="form.video" video="video"></upload>
      </el-form-item>
      <hr />
      <el-form-item label="答案解析" prop="answer_analyze">
        <quillEditor
          v-model="form.answer_analyze"
          placeholder="请在这里输入..."
          @change="yanzheng"
        ></quillEditor>
      </el-form-item>
      <hr />
      <el-form-item label="试题备注" prop="remark">
        <el-input type="textarea" v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="footer">
      <el-button @click="isShow = false">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//导入接口
import { add, edit } from '@/api/question/index.js'
//导入上传组件
import upload from '@/components/upload.vue'
//导入封装的组件
import allSelect from '@/components/allSelect.vue'
//导入富文本组件  vue-quill-editor
import { quillEditor } from 'vue-quill-editor'
//导入省市数据
import { regionData } from 'element-china-area-data'
export default {
  //注册
  components: {
    quillEditor,
    allSelect,
    upload
  },

  watch: {
    isShow (newVal) {
      if (newVal == false) {
        //初始化
        this.form = {
          subject: '',
          city: [],
          step: '',
          enterprise: '',
          type: 1,
          difficulty: 1,
          title: '',
          single_select_answer: '',
          multiple_select_answer: [],
          short_answer: '',
          video: '',
          answer_analyze: '',
          remark: '',
          select_options: [
            {
              label: 'A',
              text: '',
              image: ''
            },
            {
              label: 'B',
              text: '',
              image: ''
            },
            {
              label: 'C',
              text: '',
              image: ''
            },
            {
              label: 'D',
              text: '',
              image: ''
            }
          ]
        }
        this.$nextTick(() => {
          this.$refs.form.clearValidate()
        })
      }
    }
  },
  methods: {
    //自定义验证
    yanzheng () {
      this.$refs.form.validateField([
        'title',
        'answer_analyze',
        'single_select_answer'
      ])
    },
    //确定
    submit () {
      //获取form表单的全局验证
      this.$refs.form.validate(v => {
        if (v) {
          if (this.mode == 'add') {
            add(this.form).then(() => {
              this.$message.success('新增成功')
              //刷新数据
              this.$emit('search')
              //关闭对话框
              this.isShow = false
            })
          } else {
            edit(this.form).then(() => {
              this.$message.success('编辑成功')
              //刷新数据
              this.$emit('getData')
              //关闭对话框
              this.isShow = false
            })
          }
        } else {
          this.$message.error('验证失败')
        }
      })
    }
  },
  props: [
    'subjectArr',
    'stepArr',
    'enterArr',
    'questionArr',
    'difficultyArr',
    'mode'
  ],
  data () {
    return {
      isShow: false,
      arr: ['single_select_answer', 'multiple_select_answer', 'short_answer'],
      form: {
        subject: '',
        city: [],
        step: '',
        enterprise: '',
        type: 1,
        difficulty: 1,
        title: '',
        single_select_answer: '',
        multiple_select_answer: [],
        short_answer: '',
        video: '',
        answer_analyze: '',
        remark: '',
        select_options: [
          {
            label: 'A',
            text: '',
            image: ''
          },
          {
            label: 'B',
            text: '',
            image: ''
          },
          {
            label: 'C',
            text: '',
            image: ''
          },
          {
            label: 'D',
            text: '',
            image: ''
          }
        ]
      },
      rules: {
        subject: [{ required: true, message: '必填', trigger: 'change' }],
        city: [{ required: true, message: '必填', trigger: 'change' }],
        step: [{ required: true, message: '必填', trigger: 'change' }],
        enterprise: [{ required: true, message: '必填', trigger: 'change' }],
        type: [{ required: true, message: '必填', trigger: 'change' }],
        difficulty: [{ required: true, message: '必填', trigger: 'change' }],
        title: [{ required: true, message: '必填', trigger: 'change' }],
        single_select_answer: [
          { required: true, message: '必填', trigger: 'change' }
        ],
        multiple_select_answer: [
          { required: true, message: '必填', trigger: 'change' }
        ],
        short_answer: [{ required: true, message: '必填', trigger: 'change' }],

        answer_analyze: [
          { required: true, message: '必填', trigger: 'change' }
        ],
        remark: [{ required: true, message: '必填', trigger: 'change' }]
      },
      //省份数据
      options: []
    }
  },
  created () {
    this.options = regionData
  }
}
</script>

<style lang="less">
.question {
  .el-dialog__header {
    padding: 0;
  }
  .title {
    text-align: left;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
}
</style>
