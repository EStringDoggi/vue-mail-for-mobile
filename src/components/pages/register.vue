<!-- 注册 -->
<template>
  <div class="registBox">
    <div class="goback" @click="goback()">
      <i class="el-icon-back"></i>
    </div>
    <h5>注册</h5>
    <!-- elementUI的分栏布局 -->
    <!-- 其实可以不用，当做熟悉吧 -->
    <el-row :gutter="20">
      <el-col :span="20" :offset="2">
        <div class="grid-content bg-purple">
          <!-- 输入框 -->
          <div class="input">
            <i class="el-icon-user"></i>
            <input type="text" placeholder="用户名/手机号/邮箱" v-model="username">
          </div>
          <div class="input">
            <i class="el-icon-lock"></i>
            <input type="password" placeholder="设置密码" v-model="password">
          </div>
          <div class="input">
            <i class="el-icon-lock"></i>
            <input type="password" placeholder="请再输一次密码" v-model="passwordAgain">
          </div>
          <!-- 登录按钮 -->
          <button class="regist" @click="submit">注册</button>
          <!-- 需要帮助？ -->
          <div class="needHelp">
            <span>需要帮助</span>
            <i class="el-icon-question"></i>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      username: "", //用户名
      password: "", //密码
      passwordAgain: "" //密码again
    };
  },
  computed: {
    ...mapState(["register"]),
  },
  methods: {
    ...mapActions(["loadInformation","reset"]),
    goback() {
      console.log("goback");

      this.$router.push("individual");
    },
    submit() {
      if (this.password != this.passwordAgain) {
        alert("密码不一致");
      } else {
        //个人信息赋值
        let data = {
          username: this.username,
          password: this.password,
          state: "register"
        };
        this.loadInformation(data).then(() => {
          if (this.register.success) {
            this.reset();
            this.$router.push("login");
          }
        });
      }
    }
  }
};
</script>
<style lang='less' scoped>
@import url("../../../static/css/less.less");
.registBox {
  background-color: #f8f8fa;
  height: 100vh;
  background-image: url("../../../static/img/individual/loginBG.png");
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
  .goback {
    position: absolute;
    top: 0.5em;
    left: 0.5em;
    font-size: 2em;
    padding: 0.1em;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    z-index: 999;
  }
  h5 {
    position: absolute;
    top: 10vh;
    left: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 2.5em;
  }
  .grid-content {
    position: relative;
    height: 70vh;
    top: 30vh;
    border-radius: 10px;
    padding: 2em;
    background-color: #fff;
    .input {
      margin-bottom: 2em;
      border: none;
      border-bottom: 1px solid rgb(10, 67, 190);
      input {
        padding: 0.5em;
        &:focus {
          outline: none;
        }
      }
      // 忘记密码
      .forget {
        float: right;
        font-size: 0.8em;
        line-height: 3em;
        color: rgb(10, 67, 190);
      }
    }
    button {
      display: block;
      width: 80%;
      margin: 0 auto;
      padding: 0.5em 0;
      background-color: transparent;
      border: none;
      border-radius: 5px;
      margin-bottom: 1em;
    }
    .login {
      background-color: @tag-color2;
      color: #fff;
    }
    .regist {
      border: 1px solid rgb(10, 67, 190);
    }
    // 需要帮助
    .needHelp {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      line-height: 3em;
      font-size: 0.7em;
      text-align: center;
      color: rgb(10, 67, 190);
    }
  }
}
</style>