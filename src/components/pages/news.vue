<!-- 消息列表 -->
<template>
<div class="newsBox">
    <!-- 未登录时显示 -->
        <unloginModal v-if="!information.username"></unloginModal>
    <ul v-if="information.username">
        <li class="clearfix" 
        v-for="(item,index) in news.data" 
        :key="index"
        @click="gotoChat(item.id)"
        >
            <div class="headImg">
                <img :src="item.img" alt="" >
            </div>
            <div class="data">
                <div class="title">{{item.title}}</div>
                <div class="text">{{item.text}}</div>
            </div>
            <div class="date">
                <span>{{item.date}}</span>
            </div>
        </li>
    </ul>
    <myFooter></myFooter>
</div>
</template>
<script>
import myFooter from '../footer/footer'
import {mapState,mapActions} from 'vuex'
import unloginModal from './unloginModal'
export default {
    data() {
        return {
            
        }
    },
    components:{
        myFooter,
        unloginModal
    },
    computed: {
        ...mapState(['news','information'])
    },
    methods: {
        gotoChat(id){
            this.$router.push({path:'chatBox',query:{id:id}})
        }
    },
}
</script>
<style lang='less' scoped>
@import url("../../../static/css/less.less");

.newsBox{
    background-color: rgb(248,248,248);
    ul{
        li{
            padding: 0.5em;
            margin-bottom: 0.1em;
            background-color: #fff;
            position: relative;
            // 头像
            .headImg{
                width: 3em;
                height: 3em;
                overflow: hidden;
                float: left;
                img{
                    width: 100%;
                    height: auto;
                }
            }
            .data{
                height: 3rem;
                text-align: left;
                padding-left: 1em;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                font-size: 0.8em;
                overflow: hidden;
                // 标题
                .title{
                    font-weight: bold;
                    // line-height: 2em;
                }
                // 内容
                .text{
                    // line-height: 2em;
                    white-space: nowrap;
                    text-overflow: ellipsis;                    
                }
            }
            // 时间
            .date{
                position: absolute;
                top: 1rem;
                right: 1rem;
                font-size: 0.8em;
                font-weight: lighter;
            }
        }
    }
}
</style>