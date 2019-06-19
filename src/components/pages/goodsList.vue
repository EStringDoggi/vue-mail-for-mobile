<!-- 商品列表 -->
<template>
    <div class="box">
        <myHeader></myHeader>
        <!-- 筛选面板 -->
        <div class="selectPanel">
            <ul 
            
            >
            <!-- 综合 -->
                <li :class="[actionIndex == 0 ?'action':'']" @click="indexChange(0)">
                    <span>{{selectPanel.synthesize}}</span>
                    <i :class="[iconIndex == 0?'el-icon-arrow-up':'el-icon-arrow-down']"></i>
                    <!-- 综合菜单栏 -->
                    <!-- 1、价格从高到低 2、价格从低到高 3、信用排序 -->
                    <ul 
                    class="list" 
                    :style="[iconIndex == 0?synthesizeList.block:synthesizeList.none]"
                    >
                        <li v-for="(item,index) in synthesizeList.text" 
                        :key="index"
                        @click="listChange(index)"
                        >
                            {{item}}
                        </li>
                    </ul>
                </li>
            <!-- 销量 -->
                <li :class="[actionIndex == 1 ?'action':'']" @click="indexChange(1)">
                    <span>{{selectPanel.salesVolume}}</span>
                    <i :class="[iconIndex == 1?'el-icon-arrow-up':'el-icon-arrow-down']"></i>
                </li>
            <!-- 价格 -->
                <li :class="[actionIndex == 2 ?'action':'']" @click="indexChange(2)">
                    <span>{{selectPanel.price}}</span>
                    <i :class="[iconIndex == 2?'el-icon-arrow-up':'el-icon-arrow-down']"></i>
                </li>
            <!-- 品牌 -->

            <!-- 筛选 -->
                <li :class="[actionIndex == 3 ?'action':'']" @click="indexChange(3)">
                    <span>{{selectPanel.select}}</span>
                    <i :class="[iconIndex == 3?'el-icon-arrow-up':'el-icon-arrow-down']"></i>
                </li>
            </ul>
        </div>
        <!-- 筛选面板 end-->
        <!-- 商品列表 -->
        <ul class="goodsList">
            <!-- 商品 -->
            <li class="item " v-for="(item,index) in goodsList" :key="index" @click="routeToDetail(index)">
                <div class="item-l">
                    <!-- 商品图 -->
                    <img :src="item.imgUrl" alt="">
                </div>
                <div class="item-r">
                    <div class="right-up">
                        <span class="title">{{item.title}}</span>
                        <!-- 商品标签 -->
                        <div class="tags">
                            <span v-for="(tag,index) in item.tags" :key="index">{{tag}}</span>
                        </div>
                    </div>
                    <div class="right-down">
                        <!-- 价格 -->
                        <div class="price">
                            <span class="money">￥{{item.price.toFixed(2)}}</span>
                            <span class="priceTags" 
                            v-for="(tag,index) in item.priceTag" 
                            :key="index"
                            :class="tag.class"
                            >{{tag.text}}</span>
                        </div>
                        <!-- 评价 -->
                        <div class="appraise">
                            <span class="people">{{item.appraise.people}}人购买</span>
                            <span class="nums">{{item.appraise.nums}}条评价</span>
                            <span class="percentage">{{item.appraise.percentage}}好评</span>
                        </div>
                        <!-- 店名 -->
                        <div class="seller">
                            <span>{{item.seller}}</span>
                        </div>
                    </div> 
                </div>

            </li>
        </ul>
        
    </div>
</template>
<script>
import myHeader from '../header/header'
export default {
    data() {
        return {
            selectPanel:{
                synthesize:'综合排序',          //综合
                salesVolume:'销量',         //销量
                price:'价格',               //价格
                // brand:'品牌',               //品牌
                select:'筛选'               //筛选
            },
            // 排序面板
            synthesizeList:{
                block:{
                    display:"block"
                },
                none:{
                    display:"none"
                },
                text:['综合排序','价格从高到低','价格从低到高','信用排序']
            },
            actionIndex:0,
            iconIndex:null,              //要应用el-icon-arrow-up的下标,否则默认down
            // 商品信息
            goodsList:[
                {
                    title:"商品标题标题标题标题标题商品标题标题标题标题标题商品标题标题标题标题标题",
                    imgUrl:"../../../static/img/goodsList/item-show-1.jpg",
                    tags:["骁龙845","大屏幕"],
                    price:2499.00,
                    priceTag:[
                        {
                            text:"疯狂价",
                            class:"tag1"
                        },
                        {
                            text:"包邮",
                            class:"tag2"
                        }
                    ],
                    appraise:{
                        people:1317,
                        nums:666,
                        percentage:'99%'
                    },
                    seller:'xxx旗舰店'
                },{
                    title:"商品标题标题标题标题标题商品标题标题标题标题标题商品标题标题标题标题标题",
                    imgUrl:"../../../static/img/goodsList/item-show-2.jpg",
                    tags:["骁龙845","大屏幕"],
                    price:3999.00,
                    priceTag:[
                        {
                            text:"疯狂价",
                            class:"tag1"
                        },
                        {
                            text:"包邮",
                            class:"tag2"
                        }
                    ],
                    appraise:{
                        people:1565,
                        nums:4619,
                        percentage:'99%'
                    },
                    seller:'xxx旗舰店'
                },{
                    title:"商品标题标题标题标题标题商品标题标题标题标题标题商品标题标题标题标题标题",
                    imgUrl:"../../../static/img/goodsList/item-show-3.jpg",
                    tags:["骁龙845","大屏幕"],
                    price:2999.00,
                    priceTag:[
                        {
                            text:"疯狂价",
                            class:"tag1"
                        },
                        {
                            text:"包邮",
                            class:"tag2"
                        }
                    ],
                    appraise:{
                        people:229,
                        nums:6846,
                        percentage:'98%'
                    },
                    seller:'xxx旗舰店'
                },{
                    title:"商品标题标题标题标题标题商品标题标题标题标题标题商品标题标题标题标题标题",
                    imgUrl:"../../../static/img/goodsList/item-show-4.jpg",
                    tags:["骁龙845","大屏幕"],
                    price:4999.00,
                    priceTag:[
                        {
                            text:"疯狂价",
                            class:"tag1"
                        },
                        {
                            text:"包邮",
                            class:"tag2"
                        }
                    ],
                    appraise:{
                        people:64951,
                        nums:6455,
                        percentage:'97%'
                    },
                    seller:'xxx旗舰店'
                },{
                    title:"商品标题标题标题标题标题商品标题标题标题标题标题商品标题标题标题标题标题",
                    imgUrl:"../../../static/img/goodsList/item-show-5.jpg",
                    tags:["骁龙845","大屏幕"],
                    price:666.00,
                    priceTag:[
                        {
                            text:"疯狂价",
                            class:"tag1"
                        },
                        {
                            text:"包邮",
                            class:"tag2"
                        }
                    ],
                    appraise:{
                        people:1317,
                        nums:666,
                        percentage:'99%'
                    },
                    seller:'xxx旗舰店'
                }
            ]
        }
    },
    components:{
        myHeader
    },
    methods:{
        indexChange(e){
            this.actionIndex = e
            //根据e对icon图标class更改
            //重复点击，up变down。已经是该index则清空
            if(this.iconIndex == e){
                this.iconIndex = null
            }else{
                this.iconIndex = e
            }
        },
        listChange(e){
            // if(e.target.)
            this.selectPanel.synthesize = this.synthesizeList.text[e]
        },
        routeToDetail(e){
                this.$router.push({path:'/m.shop/goodsDetail',query:{id:e}})
        }
    },
    computed:{
        // price:function(){
        //     return this.goodsList.price
        // }
    },
}
</script>
<style lang="less" scoped>
@import url("../../../static/css/less.less");
.box{
    padding-bottom: 5em;
}
.selectPanel{
    border-bottom: 1px solid #e5e5e5; 
    ul{
        display: flex;
        padding: 0 1em;
        li{
            flex:1;
            font-size: 0.8em;
            line-height: 2em;
            position: relative;
            // text-align: left;
        }
        li:first-of-type{
            flex:2;
        }
    }
    ul.list{
        position: absolute;
        display: block;
        top: 2em;
        left: -1em;
        padding: 1em; 
        z-index: 999;
        width: 100%;
        white-space: nowrap;
        background-color: #fff;
        li{
            display: list-item;
            text-align: center;
            border-bottom: 1px solid #f2f2f2; 
            &:last-of-type{
                border: none;
            }
        }
        
    }
}
.action{
    font-weight: bold;
}
.goodsList{
    // 每一条商品信息
    .item{
        position: relative;
        // display: flex;
        margin: 0.5em;
        padding: 0.5em 0;
        // border-top: 1px solid #f2f2f2;
        border-bottom: 1px solid #f2f2f2;
        overflow: hidden;
        .item-l{
            position: relative;
            // flex:4;
            float: left;
            // display: inline-block;
            overflow: hidden;
            border-radius: 5px;
            max-width: 40%;
            // vertical-align:middle;
            img{
                border-radius: 5px;
                width: auto;
                height: 100%;
                max-height: 8em;
                vertical-align:middle;
            }
        }  
        .item-r{
            // flex:6;
            // float: left;
            // display: inline-block;
            height: 100%;
            flex: 1;
            text-align: left;
            padding-left: 0.5em;
            display: flex;
            flex-direction: column;
            justify-content:space-between;
            // 标题
            .title{
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp:2;
                text-overflow: ellipsis;
                overflow: hidden;    
                font-size: 0.9em;
                color:#4b566a;
                font-weight: bold;            
            }
            .tags{
                span{
                    font-size: 0.6em;
                    color:@sub-black;
                    line-height: 2em;
                    padding-right: 1em;
                }
            }
            // 金额
            .price{
                line-height: 2em;
                white-space: nowrap;
                span{
                vertical-align:middle;

                }
                .money{
                    color:#f23a3a;
                    font-size: 1.2em;
                }
                .priceTags{
                    font-size: 0.5em;
                    margin: 0 0.1em;
                    padding: 0.3em 0.5em;
                    border-radius: 1em;
                }
                .tag1{
                    color: #f23a3a;
                    background-color: #ffcbcb;
                }
                .tag2{
                    color: #f98413;
                    background-color: #ffe8cb;
                }
            }
            // 评价
            .appraise{
                font-size: 0.5em;
                color:@placeholder-black;
                .nums,.percentage{
                    margin:0 0.5em;
                }
            }
            .seller{
                line-height: 1.5em;
            }
            .right-up{

            }
            .right-down{

            }

        }
    }
}


</style>
