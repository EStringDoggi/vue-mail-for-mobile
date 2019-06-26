<template>
    <div class="payBox">
        <div class="img">
            <img src="../../../static/img/pay-success.png" alt="">
        </div>
        <div class="goback-index" >
            <span @click="goback">返回主页</span>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex' 
export default {
    methods: {
        ...mapActions(['IndexChange']),
        goback(){
            this.$router.push('index')
            this.IndexChange(0)
        }
    },
}
</script>
<style lang='less' scoped>
@import url("../../../static/css/less.less");
.payBox{
    .img{
        max-width: 80vw;
        height: auto;
        margin: 2em auto;
        img{
            width: 100%;
            height: auto;
        }
    }
    .goback-index{
        text-align: center;
        margin-top: 3em;
        span{
            border-radius: 15px;
            background-color: @tag-color3;
            color:#fff;
            padding: 1em 2em;
            font-size: 0.8em;
        }
    }
}
</style>