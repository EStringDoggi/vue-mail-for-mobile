<!-- 个人中心 -->
<template>
    <div class="box">
        <!-- 背景图 -->
        <div class="bg"></div>
        <!-- 登录注册模块 -->
        <div class="login" v-show="!information.username" @click="login">
            登录\注册
        </div>
        <!-- 个人信息 -->
        <div class="myInformation" v-show="information.username">
            <!-- 头像 -->
            <div class="head">
                <img :src="information.headImgUrl" alt="">
            </div>
            <!-- 昵称 -->
            <div class="nameBox">
                <div class="name">{{information.name}}</div>
                <!-- 手机号 -->
                <div class="phoneNum">
                    <i class="el-icon-mobile-phone"></i>
                    {{phoneNum}}
                </div>
            </div>
        </div>
        <!-- VIP -->
        <div class="vip">
            <img :src="vipImgUrl" alt="">
            <div class="textBox">
                <span>黄金会员</span>
                <span>专属权益全面升级，价值3600/年</span>
            </div>
                <el-button round size="mini">查看权益</el-button>
        </div>
        <!-- VIP end-->
        <!-- 我的订单 -->
        <div class="myOrder">
            <h5>
            <i class="el-icon-s-order"></i>
                我的订单
            </h5>
            <div class="items">
                <div class="item">
                    <i class="el-icon-wallet"></i>
                    <span>待付款</span>
                </div>
                <div class="item">
                    <i class="el-icon-shopping-bag-2"></i>
                    <span>待收货</span>
                </div>
                <div class="item">
                    <i class="el-icon-edit-outline"></i>
                    <span>订单评价</span>
                </div>
                <div class="item">
                    <i class="el-icon-document-copy"></i>
                    <span>全部订单</span>
                </div>
            </div>
        </div>
        <!-- 我的订单 end-->
        <!-- 我的钱包 -->
        <div class="myWallet">
            <h5>
            <i class="el-icon-s-order"></i>
                我的钱包
            </h5>
            <div class="items">
                <div class="item">
                    <div>
                        <span>{{money}}</span>
                    </div>
                    <span>余额</span>
                </div>
                <div class="item">
                    <div>
                        <span>{{information.redPaper}}</span>
                    </div>
                    <span>红包</span>
                </div>
                <div class="item">
                    <div>
                        <span>{{information.coupon}}</span>
                    </div>
                    <span>优惠券</span>
                </div>
                <div class="item">
                    <div>
                        <span>{{information.integral}}</span>
                    </div>
                    <span>积分</span>
                </div>
            </div>
        </div>
        <!-- 我的钱包 end-->
        <!-- 其他功能 -->
        <div class="others clearfix">
            <!-- 金牌导游 -->
            <div>
                <img src="../../../static/img/individual/2-09.png" alt="">
                <span>金牌导游</span>
            </div>
            <!-- 会员俱乐部 -->
            <div>
                <img src="../../../static/img/individual/2-10.png" alt="">
                <span>会员俱乐部</span>
            </div>
            <!-- 常用联系人 -->
            <div>
                <img src="../../../static/img/individual/2-11.png" alt="">
                <span>常用联系人</span>
            </div>
            <!-- 我的点评 -->
            <div>
                <img src="../../../static/img/individual/2-12.png" alt="">
                <span>我的点评</span>
            </div>
            <!-- 超值团购 -->
            <div>
                <img src="../../../static/img/individual/2-13.png" alt="">
                <span>超值团购</span>
            </div>
            <!-- 我的收藏 -->
            <div>
                <img src="../../../static/img/individual/2-14.png" alt="">
                <span>我的收藏</span>
            </div>
            <!-- 浏览历史 -->
            <div>
                <img src="../../../static/img/individual/2-15.png" alt="">
                <span>浏览历史</span>
            </div>
            <!-- 任务中心 -->
            <div>
                <img src="../../../static/img/individual/2-16.png" alt="">
                <span>任务中心</span>
            </div>
            <!-- 旅游特产 -->
            <div>
                <img src="../../../static/img/individual/2-17.png" alt="">
                <span>旅游特产</span>
            </div>
            <!-- 礼品卡 -->
            <div>
                <img src="../../../static/img/individual/2-18.png" alt="">
                <span>礼品卡</span>
            </div>
            <!-- 周边商铺 -->
            <div>
                <img src="../../../static/img/individual/2-19.png" alt="">
                <span>周边商铺</span>
            </div>
            <!-- 我的保单 -->
            <div>
                <img src="../../../static/img/individual/2-20.png" alt="">
                <span>我的保单</span>
            </div>
        </div>
        <!-- 其他功能 end-->
        <!-- 底栏 -->
        <myFooter></myFooter>
        <!-- 撑起高度给底栏 -->
        <!-- <div class="bottom"></div> -->
    </div>
</template>
<script>
import myFooter from '../footer/footer'
import {mapState,mapActions} from 'vuex'
export default {
    data(){
        return{
            // information:{
            //     headImgUrl:'../../../static/img/logo.png',      //头像
            //     name:'张梓康',                                   //昵称
            //     phoneNum:13682503999,                           //手机号
            //     money:666.00,                                   //余额
            //     redPaper:3,                                     //红包
            //     coupon:6,                                       //优惠券
            //     integral:260                                    //积分

            // },
            vipImgUrl:"../../../static/img/individual/vip.png"
            
        }
    },
    components:{
        myFooter
    },
    computed: {
        ...mapState(['information']),
        phoneNum:function(){
            if(this.information.phoneNum){
                return this.information.phoneNum.toString().replace(/(\d{3})\d{4}(\d{4})/,'$1****$2')
            }
        },
        money:function(){
            if(this.information.money){
                return this.information.money.toFixed(2)
            }
        }
    },
    methods:{
        login(){
            this.$router.push('login')
        }
    }
}
</script>
<style lang='less' scoped>
@import url("../../../static/css/less.less");

.box{
    position: relative;
    background-color: rgb(240, 240, 240);
    padding-bottom: 5em;
    // 背景
    .bg{
        background-image: url('../../../static/img/individual/bg.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        position: relative;
        width: 100%;
        height: 10em;
        overflow: hidden;
        filter: blur(0px) brightness(100%);
        &::after{
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: rgba(19, 131, 244, 0.8);
        }
    }
    // 注册登录
    .login{
        position: absolute;
        top: 4em;
        left: 2em;
        border: 2px solid #fff;
        padding: 0.5em 1em;
        border-radius: 15px;
        color: #fff;
        background-color: #0099ff;
    }
    // 个人信息
    .myInformation{
        position: absolute;
        width: 100%;
        top: 4em;
        left: 0;
        transform: translateY(-50%);
        
        // 头像
        .head{
            position: relative;
            float: left;
            margin-top: 0;
            margin-left: 5%;
            width:5em;
            border-radius: 50%;
            border: 3px solid #fff;
            overflow: hidden;
            img{
                width: 100%;
                height: auto;
                vertical-align:-webkit-baseline-middle;
            }
        }
        .nameBox{
            float: left;
            color: #fff;
            text-align: left;
            // margin-top: 1em;
            margin-left: 1em;
            padding-top:1.5em;
            line-height: 2em; 
            height: 100%;
            // line-height: 2;
            .name{
                font-size: 1.5em;
                font-weight: bolder;
            }
            .phoneNum{
                font-weight: normal;
            }

        }
    }
    // VIP
    .vip{
        width: 90%;
        position: relative;
        top: -2em;
        margin: 0 auto;
        margin-bottom: -1.5em;
        padding: 0.5em;
        border-radius: 10px;
        text-align: left;
        background-color: #fff;
        img{
            // float: left;
            display: inline-block;
            width: 2em;
            margin-right: 0.5em;
            height: auto;
        }
        .textBox{
            // float: left;
            display: inline-block;
            // width: 50%;
            span{
                display: block;
                line-height: 1.5em;
            }
            span:first-of-type{
                font-weight: bolder;
                
            }span:last-of-type{
                font-size: 10px;
                max-width: 50vw;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                // -webkit-text-size-adjust: none;
            }
        }
        button{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 1em;
            font-size: 0.5em;
        }
    }
    .myOrder,.myWallet{
        background-color: #fff;
            font-weight: bold;
        h5{
            // display: inline-block;
            text-align: left;
            padding: 0.5em 0em;
            // width: 80%;
            margin: 0 1em;
            border-bottom: 1px solid #e5e5e5;
        }
        
    }
    // 我的订单
    .myOrder{
        .items{
            display: flex;
            position: relative;
            line-height: 3em;
            // padding: 1em 0;
            .item{
                flex: 1;
                display: inline-block;
                height: 100%;
                font-size: 0.8em;
                div{
                    // height: auto;

                }
            }
        }
    }
    // 我的钱包
    .myWallet{
        margin-top: 0.5em;
         .items{
            display: flex;
            position: relative;
            // line-height: 3em;
            // padding: 1em 0;
            .item{
                flex: 1;
                display: inline-block;
                height: 100%;
                padding: 1em 0;
                line-height: 1.5em;
                // font-weight: bold;
                font-size: 0.8em;
                div:first-of-type span{
                    // height: auto;
                    // font-size: 0.5em;
                }
            }
        }
    }
    // 其他功能
    .others{
        margin-top: 0.5em;
        padding: 5%;
        position: relative;
        background-color: #fff;
        font-size: 0.8em;
        div{
            // border: 1px solid #e5e5e5;
            position: relative;
            width: 25%;
            height: 4.8em;
            float: left;
            padding: 1em 0;
            
        }
        img{
            width: 1.2em;
            max-width: 30px;
            height: auto;
        }
        span{
            display: block;
            font-weight: 600;
            font-size: 0.8em;
            line-height: 2em;
        }
    }


}
</style>