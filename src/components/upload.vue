<template>
  <el-upload
    class="avatar-uploader"
    :action="baseURL + '/question/upload'"
    name="file"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <video
      controls
      autoplay
      v-show="video == 'video'"
      v-if="value"
      :src="value"
    ></video>
    <img v-show="video != 'video'" v-if="value" :src="value" class="avatar" />

    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
export default {
  props: ['value', 'video'],
  data () {
    return {
      baseURL: process.env.VUE_APP_URL
    }
  },
  methods: {
    handleAvatarSuccess (res) {
      // window.console.log(res)
      this.$emit('input', this.baseURL + '/' + res.data.url)
      // this.value = this.baseURL + '/' + res.data.url
    },
    beforeAvatarUpload (file) {
      if (this.video == 'video') {
        // window.console.log(file)
        const isJPG = file.type === 'video/x-ms-wmv'
        const isLt2M = file.size / 1024 / 1024 < 8
        if (!isJPG) {
          this.$message.error('上传视频只能是 wmv 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传视频大小不能超过 8MB!')
        }
        return isJPG && isLt2M
      } else {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
