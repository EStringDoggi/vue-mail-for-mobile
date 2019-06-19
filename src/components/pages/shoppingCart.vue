<!-- 购物车 -->
<template>
    <div class="shoppingCartBox">
        <ul class="seller-list">
            <!-- 店铺及其下级 -->
            <li class="seller" v-for="(item,index) in cart_data" :key="index">
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
                        <li class="clearfix" v-for="(goods,index) in item.goods" :key="index" >
                            <div class="select-btn sub-select" 
                            @click="_selectChange($event,index,item)"
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
                                        <span class="tag" v-for="(tag,index) in goods.tag" :key="index">
                                            {{tag}}
                                        </span>
                                    </div>
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
                                    ></el-input-number>
                                </div>
                            </div>

                        </li>
                    </ul>
                </div>
            </li>
        </ul>
        <!-- 提交订单 -->
        <div class="order">
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
            <div class="submit">提交订单</div>
        </div>
        <myFooter></myFooter>
    </div>
</template>
<script>
import myFooter from '../footer/footer'
import {mapState,mapActions} from 'vuex'
export default {
    data(){
        return{
            // cart_data:[
            //         {
            //         seller:{
            //             name:'xxxx旗舰店',
            //         },
            //         goods:[
            //             {
            //                 imgUrl:'../../../static/img/goodsList/item-show-1.jpg',
            //                 goodsName:'商品名称名称名称名称',
            //                 goodsPrice:4999,
            //                 tag:['全网通','8G+256G'],
            //                 selectNum:1,                    //购买数量
            //                 isSelect:false,                  //是否选中
            //             },
            //             {
            //                 imgUrl:'../../../static/img/goodsList/item-show-2.jpg',
            //                 goodsName:'商品名称名称名称名称',
            //                 goodsPrice:3999,
            //                 tag:['全网通','8G+256G'],
            //                 selectNum:2,                    //购买数量
            //                 isSelect:false,                  //是否选中
            //             },
            //             {
            //                 imgUrl:'../../../static/img/goodsList/item-show-3.jpg',
            //                 goodsName:'商品名称名称名称名称',
            //                 goodsPrice:5499,
            //                 tag:['全网通','8G+256G'],
            //                 selectNum:1,                    //购买数量
            //                 isSelect:false,                  //是否选中
            //             }
            //         ]
            //     },
            //     {
            //         seller:{
            //             name:'xxxx旗舰店',
            //         },
            //         goods:[
            //             {
            //                 imgUrl:'../../../static/img/goodsList/item-show-4.jpg',
            //                 goodsName:'商品名称名称名称名称',
            //                 goodsPrice:4999,
            //                 tag:['全网通','8G+256G'],
            //                 selectNum:1,                    //购买数量
            //                 isSelect:false,                  //是否选中
            //             }
            //         ]
            //     }
            // ],
            // totalPrice:0,                                 //金额总计
        }
    },
    computed:{
        ...mapState(['cart_data','totalPrice'])
    },
    methods: {
        ...mapActions(['loadShoppingCart',
        'handleChange',
        'test1',
        'selectChange',
        'selectChangeAll',
        'btnShow'
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
                a,
                all
            }
            this.selectChangeAll(data)
        },
        
        // 数量改变
        // handleChange(){
        //     let temp = 0
        //     // 遍历data
        //     this.cart_data.forEach(item => {
        //         item.goods.forEach(item => {
        //             // 单价与数量积的相加
        //             if(item.isSelect){
        //                 temp += item.selectNum * item.goodsPrice
        //             }
        //         })
        //     })
        //     this.totalPrice = temp
        // },
        // 修改选择框
        // selectChange(e,index,item){
        //     console.log(e.currentTarget);
            
        //     // console.log(item.goods[index].isSelect);
        //     let isAllInSelect = true                    //当前组的全选按钮是否显示
        //     item.goods[index].isSelect = !item.goods[index].isSelect
        //     item.goods.forEach(item=>{
        //         if(!item.isSelect){
        //             isAllInSelect = false
        //         }
        //     })
        //     if(isAllInSelect){
        //         // 当前组全选按钮显示
        //         this.btnShow(1,e,'block')
        //     }else{
        //         // 当前组全选按钮隐藏
        //         this.btnShow(1,e,'none')
        //     }
        //     // 计算总额
        //     this.handleChange()
        // },
        // selectChangeAll(arr,e,all = false){
        //     if(all){
        //         console.log('全选');
        //         let btnArr = document.querySelectorAll('.select-btn')
        //         let btnTitle = document.querySelectorAll('.title-select')
        //         let isSelect = false
        //         btnArr.forEach(item => {
        //             if(item.querySelector('i').style.display == 'none'){
        //                 isSelect = true
        //             }
        //         })
        //         if(isSelect){
        //             // 全选按钮勾选
        //             this.btnShow(3,null,'block')
        //             btnTitle.forEach(item => {
        //                 item.querySelector('i').style.display = 'block'
        //             })
        //             // 所有按钮显示
        //             this.btnShow(2,null,true)
        //         }else{
        //             // 全选按钮取消勾选
        //             this.btnShow(3,null,'none')
        //             btnTitle.forEach(item => {
        //                 item.querySelector('i').style.display = 'none'
        //             })
        //             // 所有按钮隐藏                    
        //             this.btnShow(2,null,false)
        //         }
        //     }else{
        //         let allInSelect = null             //是否全选
        //         let arrNum = arr.goods.length
        //         let icon = e.currentTarget.querySelector('i')
        //         // console.log(e.currentTarget.parentNode);
        //         console.log(icon);
        //         let num = 0
        //         arr.goods.forEach(item => {
        //             // console.log(item.isSelect);
        //             if(item.isSelect == true){
        //                 num ++
        //             }
        //         });
        //         if(num == arrNum){
        //             allInSelect = false
        //             // icon.style.visibility = 'hidden'
        //             icon.style.display = 'none'
        //         }else{
        //             allInSelect = true
        //             // icon.style.visibility = 'visible'
        //             icon.style.display = 'block'
    
        //         }
        //         arr.goods.forEach(item => {
        //             item.isSelect = allInSelect
        //         })
        //     }
        //     // 计算总额
        //     this.handleChange()
        // },
        // 控制显示
        // btnShow(i,e,display){
        //     switch (i) {
        //         // 改变当前按钮的title按钮的显隐
        //         case 1:
        //             let selectAllBtn = e.currentTarget.parentNode.parentNode.parentNode.parentNode.querySelector('.title i')
        //             selectAllBtn.style.display = display
        //             break;
        //         // 改变所有按钮的显隐
        //         case 2:
        //             let itemArr = this.cart_data
        //             itemArr.forEach(item => {
        //                 item.goods.forEach(item => {
        //                     item.isSelect = display
        //                 })
        //             })
        //             break;
        //         // 改变selectall按钮的显隐
        //         case 3:
        //             let btnAll = document.querySelector('.all-select i')
        //             btnAll.style.display = display
                    
        //             break;
        //         default:
        //             break;
        //     }
        // },
        // 全选事件：
        // 全选时，遍历data判断是否有未选中项，有则全部遍历改为true，没有则全部改为false

        // 单选事件
        // 修改当前项的select
        
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
    padding-bottom: 5em;
    // 选购商品列表
    .seller-list{
        padding: 1em 0;
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
                        height: 5.5em;
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
    }
}
</style>