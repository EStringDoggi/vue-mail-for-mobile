<template>
  <!-- 订单页 -->
  <div class="orderBox">
      <!-- 顶栏 -->
      <div class="top">
          <i class="el-icon-arrow-left" @click="goback"></i>
      </div>
    <!-- 收货地址 -->
    <div class="address">
        <i class="el-icon-location-outline address-icon"></i>
      <div class="address-col-1">
        <span>收货人:</span>
        <span>{{information.name}}</span>
        <span>{{information.phoneNum}}</span>

      </div>
      <div class="address-col-2">
          <span>收货地址:</span>
          <span>{{information.address[0]}}</span>
          <div>(收货不便时，可选择免费暂存服务)</div>
      </div>
    </div>
    <div class="check">
        <div class="goods-list">
            <ul v-for="(item,index) in order" :key="index">
                <!-- 卖家 -->
                <li>
                    <div class="seller">
                        <i class="el-icon-s-shop"></i>
                        {{item.seller}}
                    </div>
                </li>
                <!-- 商品 -->
                <li class="goods clearfix" v-for="(goods,index) in item.goods" :key="index">
                    <div class="img">
                    <img :src="goods.imgUrl" alt="" srcset="">
                    </div>
                    <div class="text">
                        <span class="goods-name">{{goods.goodsName}}</span>
                        <span class="sendout">发货时间:卖家承诺24小时</span>
                        <span class="price">￥{{goods.goodsPrice}}</span>
                        <i>x{{goods.selectNum}}</i>
                    </div>
                    
                </li>
                <!-- 其他 -->
                <li class="other clearfix">
                    <span class="left">公益宝贝</span>
                    <span class="right">成交后卖家将捐赠0.02元给公益宝贝计划</span>
                    <i class="el-icon-arrow-right"></i>
                </li>
                <li class="other clearfix">
                    <span class="left">配送方式</span>
                    <span class="right">快递 免邮</span>
                    <i class="el-icon-arrow-right"></i>
                </li>
                <li class="other clearfix">
                    <span class="left">运费险</span>
                    <span class="right">卖家送,确认收货前退货可赔</span>
                    <i class="el-icon-arrow-right"></i>
                </li>
                <li class="other clearfix">
                    <span class="left">买家留言</span>
                    <input type="text" class="left" placeholder="选填">
                    <i class="el-icon-arrow-right"></i>
                </li>
                <li class="sub-total">
                    <span >共{{total.subNum[index]}}件商品</span>
                    <span >小计:</span>
                    <span >￥{{total.subPrice[index].toFixed(2)}}</span>
                </li>
            </ul>
        </div>
    </div>
    <!-- 提交订单 -->
    <div class="total">
        <span >共{{total.totalNum}}件商品</span>
        <span >共计:</span>
        <span >￥{{total.totalPrice.toFixed(2)}}</span>
        <button class="submit" @click="submit">提交订单</button>
    </div>
    <!-- 模态框 -->
    <div class="modal" v-show="isModalShow">
        <div class="text">
            <i class="el-icon-loading"></i>
            <span>请稍等</span>
        </div>
    </div>
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
    data() {
        return {
            isModalShow:false,                  //模态框显示
        }
    },
    methods: {
        goback(){
            window.history.go(-1)
        },
        submit(){
            this.isModalShow = true
            setTimeout(() => {
                this.isModalShow = false
                this.$router.push('pay')
            }, 1000);
        }
    },
    computed: {
        ...mapState(['order','information']),
        total:function(){
            let totalPrice = 0
            let totalNum = 0
            let subPrice = []
            let subNum = []
            let tempPrice = 0
            let tempNum = 0
            this.order.forEach(item => {
                item.goods.forEach(goods => {
                    totalPrice += goods.goodsPrice * goods.selectNum
                    totalNum += goods.selectNum
                    tempPrice += goods.goodsPrice * goods.selectNum
                    tempNum += goods.selectNum
                })
                subPrice.push(tempPrice)
                subNum.push(tempNum)
                tempPrice = 0
                tempNum = 0
            })
            return {
                totalPrice,
                totalNum,
                subPrice,
                subNum
            };
            // return totalPrice
        }
    },
};
</script>
<style lang='less' scoped>
@import url("../../../static/css/less.less");
.orderBox{
    background-color: rgb(248,248,248);
    padding-bottom: 3rem;
    .top{
        text-align: left;
        background-color: @theme-color;
        i{
            line-height: 2em;
            padding-left: 1em;
            color:#fff;
        }
    }
    .address{
        text-align: left;
        padding: 1em 3em;
        margin-bottom: 10px;
        background-color: #fff;
        position: relative;
        .address-icon{
            position: absolute;
            top: 50%;
            left: 1rem;
            transform: translateY(-50%);
            font-size: 1.3em;
        }
        .address-col-1{
            font-size: 0.9em;
            margin-bottom: 1em;
            span:last-child{
                float: right;
            }
        }
        .address-col-2{
            font-size: 0.7em;
            div{
                color:@tag-color2;
                // line-height: 2rem;
                margin-top: 1em;
            }
        }
    }
    .check{
        text-align: left;
        .seller{
            background-color: #fff;
            line-height: 3rem;
            margin-top: 10px;
            font-size: 0.8em;
            padding-left: 1em;

        }
        .goods{
            padding: 5px 10px;
            position: relative;
            .img{
                width: 5rem;
                height: 5rem;
                overflow: hidden;
                float: left;
                img{
                    width: 100%;
                    height: auto;
                }
            }
            .text{
                // float: left;
                position: relative;
                // width: 100%;
                height: 5rem;
                display: flex;
                padding-left: 10px;
                flex-direction: column;
                justify-content: space-between;
                
                span{
                    display: block;
                }
                i{
                    font-style: normal;
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    font-size: 0.8em;
                }
                .goods-name{
                    font-size: 0.8em;
                }
                .sendout{
                    font-size: 0.7em;
                    line-height: 2em;
                    color:@tag-color2;
                }
                .price{
                    font-size: 0.8em;
                    color:@tag-color1;
                }
            }
        }
        // 其他
        .other{
            padding: 0 10px;
            font-size: 0.8em;
            line-height: 3em;
            position: relative;
            background-color: #fff;
            border-bottom: 1px solid rgb(248,248,248);
            .left{
                float: left;
            }
            .right{
                float: right;
                padding-right: 2em;
            }
            i{
                position: absolute;
                top: 1em;
                right: 1em;
            }
            input{
                // font-size: 0.8em;
                line-height: 3em;
                margin-left: 0.5em;
                padding-left: 0.5em;
                font-weight: 200;
                &:focus{
                    outline: none;
                }
            }
        }
    }
    .total,.sub-total{
        padding-right: 10px;
        background-color: #fff;
        text-align: right;
        font-size: 0.8em;
        line-height: 3rem;
        position: relative;
        span:first-child{
            margin-right: 1.5em;
        }
        span:last-of-type{
            color: @tag-color1;
        }
        .submit{
            background:linear-gradient(135deg,@tag-bgColor3 -50%,@theme-color 100%);
            border: none;
            color: #fff;
            height: 3rem;
            position: relative;
            left: 10px;
            padding: 0 1.5em;
            vertical-align: bottom;
        }
    }
    .total{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: rgb(248,248,248);
        border-top: 1px solid #ccc;
    }
    // 模态框
    .modal{
        background-color: rgba(0,0,0,.5);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
        .text{
            color:#fff;
            position: absolute;
            width: 100%;
            top: 50%;
            transform: translateY(-50%);
            text-align: center;

        }
    }  
}
</style>