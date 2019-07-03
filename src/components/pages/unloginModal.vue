<template>
    <div class="noUser" >
        <span>您未登录，请先登录</span>
        <div class="login" @click="login">
            登录\注册
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        // 登录按钮
        login(){
            this.$router.push('login')
        }
    },
}
</script>
<style lang='less' scoped>
.noUser{
        position: fixed;
        top: 50%;
        left: 0;
        width: 100%;
        transform: translateY(-50%);
        .login{
            // position: absolute;
            // top: 4em;
            // left: 2em;
            width: 60%;
            margin: 0 auto;
            border: 2px solid #fff;
            padding: 0.5em 1em;
            border-radius: 15px;
            color: #fff;
            background-color: #0099ff;
        }    
    }
</style>