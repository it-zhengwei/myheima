<template>
  <div class="allSelect">
    <div
      v-show="form.type != 3"
      v-for="(item, index) in form.select_options"
      :key="index"
      class="single"
    >
      <el-radio
        v-if="form.type == 1"
        v-model="form.single_select_answer"
        :label="item.label"
        @change="yan"
        >{{ item.label }}</el-radio
      >
      <el-checkbox
        v-else-if="form.type == 2"
        v-model="form.multiple_select_answer"
        :label="item.label"
        :value="item.label"
      ></el-checkbox>
      <el-input v-model="item.text"></el-input>
      <upload v-model="item.image"></upload>
    </div>
    <div v-show="form.type == 3">
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="form.short_answer"
      >
      </el-input>
    </div>
  </div>
</template>

<script>
//导入上传组件
import upload from '@/components/upload.vue'
export default {
  props: ['form'],
  components: {
    upload
  },
  methods: {
    yan () {
      this.$emit('yanzheng')
    }
  }
}
</script>

<style lang="less">
.allSelect {
  .single {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
