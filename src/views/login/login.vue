<template>
  <div class="login">
      <div class="header">
        <div class="left">
            <img class="logo" src="@/assets/img/login_logo.png" alt="">
            <span class="t1">黑马面面</span>
            <div class="_border"></div>
            <span class="t2">用户登录</span>
           
        </div>
         <el-form :model='from' class="form">
                <el-form-item>
                    <el-input v-model="form.phone" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.password" placeholder="请输入密码" show-password=ture></el-input>
                </el-form-item>
                <el-form-item>
                    <el-row>
                        <el-col :span='16'><el-input v-model="form.code" placeholder="请输入验证码"></el-input></el-col>
                        <el-col :span='8'><img class="code" src="@/assets/img/code.png" alt=""></el-col>
                    </el-row>

                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="form.isYes">我已阅读并同意<el-link type='primary'>用户协议</el-link>和<el-link type='primary'>隐私条款</el-link ></el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button class="btn" type='primary'>登录</el-button>
                    <br>
                    <el-button class="btn" type='primary'>注册</el-button>
                </el-form-item>
            </el-form>
    </div>
      <div class="right">
          <img src="@/assets/img/login_right.png" alt="">
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
           form:{
                phone:'',
            password:'',
            code:'',
            isYes:''
           }
        }
    }
}
</script>

<style lang='less'>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.login{
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    
    background: linear-gradient(to right,#1493fa, #01c6fa);
    .header{
        width: 478px;
        height: 550px;
        background: #f5f5f5;
         padding: 50px;
       .left{
            display: flex;
        align-items: center;
            width: 100%;
        .logo{
            width: 22px;
            height: 17px;
            margin-right: 20px;
        }
        .t1{
            font-size: 24px;
            font-family: SourceHanSansCN Regular, SourceHanSansCN Regular-Regular;
            font-weight: 400;
            text-align: left;
            color: #0c0c0c;
        }
        ._border{
            width: 1px;
            height: 28px;
            background: #c7c7c7;
            margin: 0 20px;
        }
        .t2{
            font-size: 22px;
            font-family: PingFangSC Regular, PingFangSC Regular-Regular;
            font-weight: 400;
            text-align: left;
            color: #0c0c0c;
        }
       }
       .form{
           margin-top: 20px;
       }
       .code{
           width: 100%;
           height: 40px;
       }
       .btn{
           width: 100%;
           height: 100%;
           margin-top: 20px;
       }
        
    }
}
</style>