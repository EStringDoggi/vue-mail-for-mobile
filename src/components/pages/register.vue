<!-- 注册 -->
<template>
    <div class="registBox">

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
                        <input type="password" placeholder="密码" v-model="password">
                    </div>
                    
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            username:'',        //用户名
            password:'',        //密码
            
        }
    },
}
</script>
<style lang='less' scoped>
@import url('../../../static/css/less.less');
.registBox{
    background-color: #f8f8fa;
    height: 100vh;
    background-image: url('../../../static/img/individual/loginBG.png');
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    .grid-content{
        position: relative;
        height: 60vh;
        top: 40vh;
        border-radius: 10px;
        padding: 2em;
        background-color: #fff;
        .input{
            margin-bottom: 2em;
            border: none;
            border-bottom: 1px solid #0099ff;
            input{
                padding: 0.5em;
                &:focus{
                    outline: none;
                }
            }
        }

    }
}
</style>