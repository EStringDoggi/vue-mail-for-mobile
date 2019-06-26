<!-- 购物车 -->
<template>
    <div class="shoppingCartBox" >
        <div class="top clearfix">
            <i class="el-icon-arrow-left"></i>
            <span v-show="!isAdit" @click="adit">编辑</span>
            <span v-show="isAdit" @click="adit">取消编辑</span>
        </div>
        <ul class="seller-list" v-if="information.username">
            <!-- 店铺及其下级 -->
            <li class="seller" v-for="(item,index_i) in cart_data" :key="index_i">
                <div class="title clearfix">
                    <div class="select-btn title-select" @click="_selectChangeAll(item,$event)">
                        <i class="el-icon-success" style="display:none"></i>
                    </div>
                    <i class="el-icon-s-shop icon"></i>
                    <h5>{{item.seller.name}}</h5>
                    <i class="el-icon-arrow-right right"></i>
                    <span class="coupon">领券</span>
                </div>
                <div class="list clearfix">
                    <ul>
                        <li class="clearfix" v-for="(goods,index_j) in item.goods" :key="index_j" >
                            <div class="select-btn sub-select" 
                            @click="_selectChange($event,index_j,item)"
                            >
                               <i class="el-icon-success" v-show="goods.isSelect"></i>
                            </div>
                            <div class="goods-img">
                                <img :src="goods.imgUrl" alt="">
                            </div>
                            <div class="goods-main">
                                <div class="main-h">
                                    <h5>{{goods.goodsName}}</h5>
                                    <div class="sub-title">
                                        <span class="tag" v-for="(tag,index_j) in goods.tag" :key="index_j">
                                            {{tag}}
                                        </span>
                                    </div>
                                    <!-- 删除按钮 -->
                                    <i class="el-icon-delete" 
                                    @click="goodsDelete(index_i,index_j)"
                                    v-show="isAdit"
                                    ></i>
                                </div>
                                <div class="main-f">
                                    <!-- 金额 -->
                                    <span class="price">￥{{goods.goodsPrice.toFixed(2)}}</span>
                                    <!-- 数量 -->
                                    <el-input-number class="number" 
                                    v-model="goods.selectNum" 
                                    @change="handleChange" 
                                    @click.stop
                                    :min="1" 
                                    :max="10" 
                                    label="数量"
                                    size="mini"
                                    v-show="isAdit"
                                    ></el-input-number>
                                    <span class="selectNum" v-show="!isAdit">x{{goods.selectNum}}</span>
                                </div>
                            </div>

                        </li>
                    </ul>
                </div>
            </li>
        </ul>
        <!-- 提交订单 -->
        <div class="order" v-if="information.username">
            <div class="select" @click="_selectChangeAll(null,null,true)">
                <div class="select-btn all-select">
                    <i class="el-icon-success" style="display:none"></i>
                </div>
                <span>全选</span>
            </div>
            <!-- 总金额 -->
            <div class="price">总计:
                <span>
                    {{totalPrice}}
                </span>
            </div>
            <!-- 提交按钮 -->
            <div class="submit" :class="[totalPrice > 0?'':'disable']" @click="order" >提交订单</div>
        </div>
        <!-- 未登录时显示 -->
        <div class="noUser" v-if="!information.username">
            <span>您未登录，请先登录</span>
            <div class="login" @click="login">
                登录\注册
            </div>
        </div>
        <transition 
        enter-active-class="animated fadeIn" 
        leave-active-class="animated fadeOut"
        >
        
        <div class="confirmModal" v-show="confirmModal.modalShow" >
        <transition  
        enter-active-class="animated fadeInDown" 
        leave-active-class="animated fadeOutDown">
            <div class="modal" v-show="confirmModal.modalShow">
                <div class="modal-t">是否确认移除该商品</div>
                <div class="modal-b">
                    <span class="cancel" @click="modalResult(0)">取消</span>
                    <span class="confirm" @click="modalResult(1)">确认</span>
                </div>
            </div>
        </transition>
        </div>
        </transition>
        <myFooter></myFooter>
    </div>
</template>
<script>
import myFooter from '../footer/footer'
import {mapState,mapActions} from 'vuex'
export default {
    data(){
        return{
            confirmModal:{
                modalShow:false,            //模态框显隐
            },
            nowIndex:{
                i:-1,
                j:-1
            },                              //删除项下标  
            isAdit:false,                   //编辑              
        }
    },
    computed:{
        ...mapState(['cart_data','totalPrice','information'])
    },
    methods: {
        ...mapActions(['loadShoppingCart',
        'handleChange',
        'test1',
        'selectChange',
        'selectChangeAll',
        'btnShow',
        'addOrder',
        'del_goods'
        ]),
        // test
        test(e,index){
            let data = {
                e:666,
                index:888
            }
            // this.test1(data);
            // console.log(this.$store); 
        },
        _selectChange(e, index, item){
            let data = {
                e,
                index,
                item
            }
             this.selectChange(data)
        },
        _selectChangeAll(arr, e, all = false){
            let data = {
                arr,
                e,
                all
            }
            this.selectChangeAll(data)
        },
        // 编辑
        adit(){
            this.isAdit = !this.isAdit
        },
        // 删除按钮
        goodsDelete(i,j){
            // this.nowIndex = index
            this.nowIndex.i = i
            this.nowIndex.j = j
            // 弹窗
            this.alertModal()
        },
        // 弹窗
        alertModal(){
            this.confirmModal.modalShow = !this.confirmModal.modalShow
        },
        // 弹窗确认
        modalResult(param){
            if(param == 0){
                // 取消
                // this.confirmModal.isConfirm = false;
                
            }else{
                // this.confirmModal.isConfirm = true;  
                //删除
                // let i = this.nowIndex.i
                // let j = this.nowIndex.j
                let data = {
                    i:this.nowIndex.i,
                    j:this.nowIndex.j
                }
                // console.log(this.cart_data[i].goods[j]);

                this.del_goods(data)
                
            }
            this.alertModal()
            // this.confirmModal.modalShow = false
        },
        // 提交订单
        order(){
            if(this.totalPrice <= 0){
                return;
            }
            this.addOrder()
            this.$router.push('order')
            
        },
        // 登录按钮
        login(){
            this.$router.push('login')
        }
        
    },
    watch: {
        
    },
    components:{
        myFooter
    },
    created(){
        this.loadShoppingCart()        
    },
    mounted(){
        this.test('666','888')
    }
}
</script>
<style lang='less' scoped>
@import url("../../../static/css/less.less");
// 按钮通用样式
.select-btn{
    float: left;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    margin: 0 0.3em;
    border: 1px solid rgb(240, 240, 240);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    i{
        width: 100%;
        height: 100%;
        font-size: 1em;
        color:@tag-color3;
        position: absolute;
        top: -1px;
        left: -1px;
    }
}


.shoppingCartBox{
    background-color: rgb(248,248,248);
    // 顶栏
    .top{
        background-color: @theme-color;
        position: relative;
        height: 2rem;
            color: #fff;
        i{
            position: absolute;
            top: 0.5rem;
            left: 0;
            padding-left: 1rem;
        }
        span{
            position: absolute;
            line-height: 2rem;
            top: 0rem;
            right: 0.5rem;
            font-size: 0.8em;
        }
    }
    // 选购商品列表
    .seller-list{
        margin-bottom: 5em;
        .seller{
            margin: 1em 0;
            // 店家名称
            .title{
                background-color: #fff;
                border-bottom: 1px solid rgb(248,248,248);
                border-radius: 5px;
                position: relative;
                line-height: 2em;

                .icon{
                    margin-left: 2em;
                }
                .right{
                    margin-left: 1em;
                }
                // icon
                .right,.icon{
                    float: left;
                    line-height: 2em;
                }
                h5{
                    float: left;
                    font-size: 0.8em;
                }
                .coupon{
                    float: right;
                    margin-right: 1em;
                    border-radius: 10px;
                    color:@tag-color3;
                    background-color: @tag-bgColor3;
                    border: 1px solid @tag-color3;
                    font-size: 0.8em;
                    padding: 0 0.5em;
                    margin-top: 0.4em;
                    line-height: 1.5em;

                }
            }
            // 该店商品
            .list{
                li{
                    background-color: #fff;
                    padding: 0.5em 0;
                    position: relative;

                    .goods-img{
                        float: left;
                        width: 5em;
                        max-height: 5em;
                        overflow: hidden;
                        margin-left: 2em;
                        margin-right: 0.5em;
                        img{
                            width: 100%;
                            height: auto;
                            vertical-align: sub;
                        }
                    }
                    .goods-main{
                        height: 5rem;
                        text-align: left;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        font-size: 0.8em;
                        .main-h{
                            // 商品标签
                            .sub-title{
                                font-size: 0.7em;
                                line-height: 1.5em;
                                .tag{
                                    margin: 0 0.5em;
                                }
                            }
                            i{
                                position: absolute;
                                top: 0rem;
                                right: 0rem;
                                padding: 0.5rem;
                            }
                        }
                        .main-f{
                            display: flex;
                            vertical-align: middle;
                            padding-right: 5px;
                            .price{
                                color:@tag-color1;
                                font-size: 1em;
                                line-height: 26px;
                                flex:1;
                            }
                            .number{
                                display: inline-block;
                                flex:1;
                                border:none;

                                span{
                                    width: 20px;
                                }
                                input,.el-input-number--mini .el-input__inner{
                                    padding: 0 20px;
                                }
                            }
                            .selectNum{
                                position: absolute;
                                bottom: 15px;
                                right: 1rem;

                            }
                        }
                    }
                }
            }

        }
    }
    // 提交订单
    .order{
        display: flex;
        position: fixed;
        width: 100%;
        left: 0;
        bottom: 3.5em;
        background-color: #fff;
        line-height: 2.5em;
        padding: 0.25em 0;
        z-index: 999;
        .select{
            flex: 1;
            span{
                margin-left: 1em;
            }
        }
        .price{
            flex:2;
            text-align: right;
            span{
                color:@tag-color1;
            }
        }
        .submit{
            flex:2;
            color:#fff;
            background-color: @tag-color3;
            border-radius: 20px;
            margin:0em 1em;
        }
        .disable{
            background-color: #a0cfff;
        }
    }
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
    // 移除商品弹窗
    .confirmModal{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5);
        z-index: 9999;
        .modal{
            position: absolute;
            width: 12rem;
            height: max-content;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin:auto;
            // transform: translate(-50%,-50%); 
            background-color: #fff;
            border-radius: 10px;
            overflow: hidden;
            .modal-t{
                padding: 1rem;
                border-bottom: 1px solid #eee;
            }
            .modal-b{
                // padding: 0.5rem;
                line-height: 2rem;
                display: flex;
                
                span{
                    flex:1;
                }
                span:first-child{
                    border-right: 1px solid #eee;
                }
                span:active{
                    background-color: #eee;
                }
            }
        }
    }
}
</style>