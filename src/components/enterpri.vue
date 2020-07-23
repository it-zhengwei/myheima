<template>
  <el-dialog :visible.sync="isShow" width="600px" class="setSubject">
    <div slot="title" class="title">{{mode=='add'?'新增企业':'编辑企业'}}</div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="企业编号" prop="eid">
        <el-input v-model="form.eid"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" prop="short_name">
        <el-input v-model="form.short_name"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" prop="intro">
        <el-input v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="企业备注" prop="remark">
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
import { addEnter, editEnter } from "@/api/enterpriseList/getEnter.js";
export default {
  props: ["mode"],
  watch: {
    isShow(newVal) {
      if (newVal == false) {
        //把form表单初始化  主要是edit操作把整个数据赋值给他 为了不影响新增的操作 所以要初始化回原来的样子
        this.form = {
          eid: "", //	是	string	学科编号
          name: "", //	是	string	学科名称
          short_name: "", //	否	string	学科简称
          intro: "", //	否	string	学科简介
          remark: "", //	否	string	备注
        };
        //清除表单验证  因为初始化会触发表单的验证 所以设置一个定时器让他完全渲染验证了再清除
        this.$nextTick(() => {
          this.$refs.form.clearValidate();
        });
      }
    },
  },
  data() {
    return {
      isShow: false,
      form: {
        eid: "", //	是	string	学科编号
        name: "", //	是	string	学科名称
        short_name: "", //	否	string	学科简称
        intro: "", //	否	string	学科简介
        remark: "", //	否	string	备注
      },
      rules: {
        eid: [{ required: true, message: "请输入学科编号", trigger: "change" }],
        name: [
          { required: true, message: "请输入学科名称", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    submit() {
      //获取表单form  然后执行表单的全局验证validate
      this.$refs.form.validate((v) => {
        if (v) {
          //验证通过判断状态值执行新增功能
          if (this.mode == "add") {
            addEnter(this.form).then(() => {
              //提示用户
              this.$message.success("新增成功");
              //隐藏对话框
              this.isShow = false;
              //搜索数据
              this.$emit("search");
            });
          } else {
            //编辑功能
            editEnter(this.form).then(() => {
              //提示用户
              this.$message.success("编辑成功");
              //关闭对话框
              this.isShow = false;
              //更新数据
              this.$emit("getData");
            });
          }
        } else {
          this.$message.error("请完善信息");
        }
      });
    },
  },
};
</script>

<style lang='less'>
.setSubject {
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
}
</style>