<!-- 商品详细 -->
<template>
  <div class="box">
    <!-- 图片 -->
    <div class="picture">
      <ul
        @touchstart.stop.prevent="touchstart"
        @touchmove.stop.prevent="touchmove"
        @touchend.stop.prevent="touchend"
        :style="navX"
        :class="{'mytransition':useTransition}"
      >
        <li v-for="(item,index) in detail.img" :key="index">
          <img :src="item" alt>
        </li>
      </ul>
      <!-- 浮动元素 -->
      <!-- 返回按钮 左上-->
      <i class="el-icon-arrow-left" @click="goback"></i>
      <!-- 页码 右下-->
      <span class="nowPic">{{index + 1}}/{{total}}</span>
    </div>
    <!-- 金额、标题 -->
    <div class="pricebox">
      <span class="price">￥{{detail.price}}</span>
      <span class="tag" v-if="detail.ispreferential">优惠价</span>
    </div>
    <div class="title">
      <span>{{detail.name}}</span>
      <!-- 分享按钮 -->
      <div class="share">
        <i class="el-icon-share"></i>
        <span>分享</span>
      </div>
    </div>
    <!-- 销量、产地 -->
    <div class="tpl-wrapper">
      <span>快递：{{detail.express}}</span>
      <span>月销{{detail.salesVolume}}</span>
      <span>{{detail.city}}</span>
    </div>
    <!-- 服务 -->
    <div class="service clearfix" @click="toggleClick('serviceModalDisplay')">
      <span class="title">服务</span>
      <span class="sub">坏单包赔 · 订单险 · 7天无理由 · 运费险 · 公益宝贝 · 48小时内发货</span>
      <i class="icon el-icon-arrow-right"></i>
    </div>
    <!-- 参数 -->
    <div class="param clearfix" @click="toggleClick('paramModalDisplay')">
      <span class="title">参数</span>
      <span class="sub">生产日期 厂名...</span>
    </div>
    <!-- 评价 -->
    <div class="appraise clearfix">
      <span class="title">宝贝评价</span>
      <i class="icon el-icon-arrow-right"></i>
      <span class="all">查看全部</span>
    </div>
    <div class="appraise item">
      <div class="user">
        <img src="../../../static/img/logo.png" alt>
        <span>用户昵称1</span>
      </div>
      <div class="text">非常好非常好非常好非常好非常好非常好非常好非常好非常好非常好</div>
    </div>
    <!-- 购买栏 -->
    <div class="bottom">
      <ul>
        <li class="shopName">
          <i class="el-icon-s-shop"></i>
          <span>店铺</span>
        </li>
        <li class="helper">
          <i class="el-icon-user"></i>
          <span>客服</span>
        </li>
        <li class="favor" @click="toggleClick('isFavor')">
          <i :class="isFavor?'el-icon-star-on':'el-icon-star-off'"></i>
          <span>收藏</span>
        </li>
        <li class="add" @click="toggleClick('addCartModalDisplay')">加入购物车</li>
        <li class="buy" @click="toggleClick('cartModalDisplay')">立即购买</li>
      </ul>
    </div>
    <!-- 模态框 -->
    <transition
      enter-active-class="animated fadeInUpBig"
      leave-active-class="animated fadeOutDownBig"
    >
      <!-- 服务模态框 -->
      <div class="modal" v-if="serviceModalDisplay">
        <ul>
          <li>
            <p class="item-title">正品保证</p>
            <p class="item-detail">商品支持正品保障服务</p>
          </li>
          <li>
            <p class="item-title">赠品保价</p>
            <p
              class="item-detail"
            >活动结束后15天内若发生降价,可举证申请保险理赔.部分场景下不支持理赔(如双十一活动订单等),具体理赔范围详见【帮助中心-聚划算保价险服务】</p>
          </li>
          <li>
            <p class="item-title">极速退款</p>
            <p class="item-detail">极速退款是为诚信会员提供的退款退货流程的专享特权额度是根据每个用户当前的信誉评级情况而定</p>
          </li>
          <li>
            <p class="item-title">赠运费险</p>
            <p class="item-detail">卖家为您购买的商品投保退货运费险(保单生效以下单显示为准)</p>
          </li>
          <li>
            <p class="item-title">七日无理由退换</p>
            <p class="item-detail">消费者在满足7天无理由退换货申请条件的前提下,可以提出“7天无理由退换货”的申请</p>
          </li>
          <li>
            <div class="button" @click="toggleClick('serviceModalDisplay')">确认</div>
          </li>
        </ul>
      </div>
    </transition>
    <!-- 参数模态框 -->
    <transition
      enter-active-class="animated fadeInUpBig"
      leave-active-class="animated fadeOutDownBig"
    >
      <div class="modal" v-if="paramModalDisplay">
        <ul>
          <li class="title">
            <span>基本信息</span>
          </li>
          <li v-for="(item,index) in detail.paramList.data" :key="index">
            <p class="item-title">{{item.title}}</p>
            <p class="item-detail">{{item.detail}}</p>
          </li>
        </ul>
        <div class="button" @click="toggleClick('paramModalDisplay')">确认</div>
      </div>
    </transition>
    <transition
      enter-active-class="animated fadeInUpBig"
      leave-active-class="animated fadeOutDownBig"
    >
      <!-- 购物车模态框 -->
      <div class="modal cartModal" v-show="cartModalDisplay">
        <i class="icon el-icon-circle-close" @click="toggleClick('cartModalCancel')"></i>
        <div class="header">
          <div class="img-wrap">
            <img :src="cartSelectImg" alt>
          </div>
          <div class="main">
            <div class="price">￥{{detail.price}}</div>
            <div class="stock">库存 233件</div>
            <div class="sku-info">
              已选择：
              <span v-for="(item,index) in cartSelectParam" :key="index">{{item}}</span>
            </div>
          </div>
        </div>
        <!-- 选择类型 -->
        <div class="sku-list-wrap">
          <ul>
            <li v-for="(items,index_i) in detail.paramSelect.data" :key="index_i">
              <div class="prop_title">{{items.title}}</div>
              <div>
                <div
                  class="item"
                  :class="[index_j == 0 ? 'itemSelect':'']"
                  v-for="(item,index_j) in items.detail"
                  :key="index_j"
                  @click.stop="itemSelect($event,index_i,index_j)"
                >
                  <img :src="item.img" alt v-if="item.img">
                  <span>{{item.text}}</span>
                </div>
              </div>
            </li>
            <!-- 购买数量 -->
            <li class="amount">
              <div class="prop_title">购买数量</div>
              <el-input-number
                v-model="cartSelectAmount"
                @change="cartSelectAmountChange"
                :min="1"
                :max="10"
                label="购买数量"
              ></el-input-number>
            </li>
          </ul>
        </div>
        <div class="button" @click="toggleClick('cartModalSubmit')">确认</div>
      </div>
    </transition>
    <!-- 卖家窗口 -->
    <div class="seller">
      <div class="main clearfix">
        <div class="shopImg">
          <img :src="detail.shopImg" alt>
        </div>
        <div class="shop-info clearfix">
          <div class="shop-name">{{detail.shopName}}</div>
        </div>
      </div>
      <dir class="score">
        <ul>
          <li>
            宝贝描述
            <i>{{detail.score.describe}}</i>
          </li>
          <li>
            卖家服务
            <i>{{detail.score.service}}</i>
          </li>
          <li>
            物流服务
            <i>{{detail.score.logistics}}</i>
          </li>
        </ul>
      </dir>
    </div>
    <!-- 背景模态层 -->
    <div class="modal-bg" v-if="bgModal" @click="toggleClick('bgModal')"></div>
    <!-- 收藏模态框 -->
    <div class="modal-collect" v-show="modalCollectShow">
      <i class="el-icon-circle-check"></i>
      <div>收藏成功！</div>
    </div>
    <!-- 添加购物车模态框 -->
    <div class="modal-addCart" v-show="modalAddCart">
      <i class="el-icon-circle-check"></i>
      <div>已添加到购物车！</div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      detail: {
        img: [
          "../../../static/img/goodsDetail/item-detail-1.jpg",
          "../../../static/img/goodsDetail/item-detail-2.jpg",
          "../../../static/img/goodsDetail/item-detail-1.jpg",
          "../../../static/img/goodsDetail/item-detail-2.jpg",
          "../../../static/img/goodsDetail/item-detail-1.jpg",
          "../../../static/img/goodsDetail/item-detail-2.jpg"
        ],
        price: 2999.0,
        ispreferential: true, //是否优惠
        name: "商品名称名称名称名称名称名称名称名称名称",
        express: "免运费",
        salesVolume: 666, //销量
        city: "广东广州",
        shopName: "xxx旗舰店", //卖家名称
        shopImg: "../../../static/img/logo.png", //店铺头像
        // 店铺评价相关
        score: {
          describe: 4.8,
          service: 4.8,
          logistics: 4.9
        },
        paramList: {
          data: [
            {
              title: "网络类型",
              detail: "4G"
            },
            {
              title: "型号",
              detail: "xxx"
            },
            {
              title: "售后服务",
              detail: "一年保修"
            },
            {
              title: "分辨率",
              detail: "2340x1080"
            },
            {
              title: "核心数",
              detail: "8核"
            },
            {
              title: "机身颜色",
              detail: "红 白 蓝"
            },
            {
              title: "运行内存",
              detail: "6G 8G"
            },
            {
              title: "网络类型",
              detail: "4G"
            }
          ]
        },
        // 添加购物车选择
        paramSelect: {
          data: [
            {
              title: "颜色",
              detail: [
                {
                  img: "../../../static/img/goodsDetail/pack/9.jpg",
                  text: "红色"
                },
                {
                  img: "../../../static/img/goodsDetail/pack/1.jpg",
                  text: "蓝色"
                },
                {
                  img: "../../../static/img/goodsDetail/pack/2.jpg",
                  text: "黑色"
                }
              ]
            },
            {
              title: "配置",
              detail: [
                {
                  text: "6G + 64G"
                },
                {
                  text: "8G + 128G"
                },
                {
                  text: "8G + 256G"
                }
              ]
            },
            {
              title: "套餐类型",
              detail: [
                {
                  text: "官方标配"
                }
              ]
            }
          ]
        }
      },
      index: 0, //当前图片
      total: 6, //图片总数
      navX: {
        transform: "translateX(" + this.translateX + "px)"
      },
      imgOffset: 0,
      initX: 0, //初始坐标 - this.translateX
      eventX: 0, //初始坐标
      nowX: 0, //当前坐标
      translateX: 0,
      touchMoveX: 0, //每次位移差
      useTransition: true, //是否开启动画
      isFavor: false, //收藏
      paramModalDisplay: false, //param模态框显示
      serviceModalDisplay: false, //server模态框显示
      modalCollectShow: false, //收藏模态框显示
      modalAddCart: false, //添加到购物车模态显示
      isAddCart: false, //添加购物车
      bgModal: false, //背景层
      cartModalDisplay: false, //购物车选项模态框显示
      // 当前模态框title显示图片
      cartSelectImg: "../../../static/img/goodsDetail/item-detail-1.jpg",
      cartSelectParam: ["请选择"], //当前所选参数
      cartSelectAmount: 1 //购买数量
    };
  },
  methods: {
    ...mapActions(["addShoppingCart", "addOrder","information"]),
    touchstart(e) {
      // 停用动画
      this.useTransition = false;
      //记录当前X坐标为初始值
      this.initX = e.changedTouches[0].clientX - this.translateX;
      this.eventX = e.changedTouches[0].clientX;
    },
    touchmove(e) {
      //根据初始值与当前坐标差值做位移
      let temp = e.changedTouches[0].clientX - this.initX;
      //修改translateX
      this.translateX = temp;
      // 判断边界
      if (this.translateX >= 0) {
        this.translateX = 0;
      } else if (this.translateX <= (this.total - 1) * this.imgOffset * -1) {
        this.translateX = (this.total - 1) * this.imgOffset * -1;
      }
      this.navX.transform = "translateX(" + this.translateX + "px)";
      // 位移差，在touchennd时做判断
      this.touchMoveX = this.eventX - e.changedTouches[0].clientX;
    },
    touchend(e) {
      let touchMoveX = Math.abs(this.touchMoveX);
      let index;
      //判断位移值是否大于图片宽度4/1
      if (touchMoveX >= this.imgOffset / 4) {
        // 判断位移方向，更改index
        if (this.touchMoveX > 0 && this.index < this.total - 1) {
          // 左滑
          index = this.index + 1;
          this.index++;
        } else if (this.touchMoveX < 0 && this.index > 0) {
          // 右滑
          index = this.index - 1;
          this.index--;
        }
      } else {
        // 吸附回来
        index = this.index;
      }
      // 移动
      let temp = index * this.imgOffset * -1;
      this.translateX = temp;
      this.navX.transform = "translateX(" + this.translateX + "px)";
      // 启用动画
      this.useTransition = true;
    },
    // 返回上一页
    goback() {
      this.$router.push("/m.shop/goodsList");
    },
    // 收藏
    toggleClick(e) {
      switch (e) {
        case "isFavor":
          this.isFavor = !this.isFavor;
          if (this.isFavor) {
            this.modalCollectShow = true;
            setTimeout(() => {
              this.modalCollectShow = false;
            }, 1000);
          }
          break;
        case "serviceModalDisplay":
          this.serviceModalDisplay = !this.serviceModalDisplay;
          // 背景层显隐
          this.bgModal = !this.bgModal;
          break;
        case "paramModalDisplay":
          this.paramModalDisplay = !this.paramModalDisplay;
          // 背景层显隐
          this.bgModal = !this.bgModal;
          break;
        // 右上关闭按钮
        case "cartModalCancel":
          this.cartModalDisplay = false;
          this.isAddCart = false;
          // 背景层显隐
          this.bgModal = !this.bgModal;
          break;
        // 确认按钮
        case "cartModalSubmit":
          // 准备数据
          let data = {
            isData: true,
            data: {
              seller: {
                  name:this.detail.shopName
              },
              goods: [
                {
                  imgUrl: this.cartSelectImg, //图片
                  goodsName: this.detail.name, //名称
                  goodsPrice: this.detail.price, //单价
                  tag: this.cartSelectParam, //参数选择
                  selectNum: this.cartSelectAmount, //数量
                  isSelect: false
                }
              ]
            }
          };
          if (this.isAddCart) {
            // 判断登录状态
            if(this.information.username){
              // 添加到购物车
              //显示模态框
              this.modalAddCart = true;
              setTimeout(() => {
                this.modalAddCart = false;
              }, 1000);
              //添加到购物车
              this.addShoppingCart(data);
            }else{
              // 登录              
              this.$router.push("login");
            }
          } else {
            //跳转到下单页面      
            // 判断是否登录
            if(this.information.username){
              this.addOrder(data);
              this.$router.push("order");
            }else{
              // 登录
              this.$router.push("login");
            }
          }
          this.cartModalDisplay = !this.cartModalDisplay;
          // 背景层显隐
          this.bgModal = !this.bgModal;

          break;
        // 立即购买
        case "cartModalDisplay":
          this.cartModalDisplay = !this.cartModalDisplay;
          // 背景层显隐
          this.bgModal = !this.bgModal;
          break;
        // 添加购物车按钮
        case "addCartModalDisplay":
          this.isAddCart = true;
          this.cartModalDisplay = !this.cartModalDisplay;
          this.isAddCart = true;

          // 背景层显隐
          this.bgModal = !this.bgModal;
          break;
        case "bgModal":
          // 隐藏模态框
          this.paramModalDisplay = false;
          this.serviceModalDisplay = false;
          this.cartModalDisplay = false;
          // 背景层显隐
          this.bgModal = false;
          break;
        default:
          break;
      }
    },
    // 参数选择
    itemSelect(e, i, j) {
      //i:来自哪行选项，j:该行哪个选项
    //   console.log("i:", i, "j:", j);

      // 获取同级元素
      let items = e.currentTarget.parentNode.children;
      let imgUrl = null;
      // 如果选项带图片
      if (e.currentTarget.querySelector("img")) {
        imgUrl = e.currentTarget.querySelector("img").getAttribute("src");
      }
      for (let item of items) {
        item.className = "item";
      }
      // 当前元素添加select
      e.currentTarget.className = "item itemSelect";
      // 替换模态框当前所选显示的图片
      if (imgUrl) {
        this.cartSelectImg = imgUrl;
      }
      // console.log(this.detail.paramSelect.data[i].detail);
      // 当前所选参数
      // 根据当前所选修改参数
      this.cartSelectParam[i] = this.detail.paramSelect.data[i].detail[j].text;
      this.$forceUpdate();
    //   console.log(this.cartSelectParam);
    },
    cartSelectAmountChange(e) {
    //   console.log(e);
    }
  },
  computed: {
    // cartSelectParam(){
    //     let data = ['']
    //     // 参数的种类
    //     for(let item of this.detail.paramSelect.data){
    //         data.push(item.detail[0].text + ' ')
    //     }
    //     return data
    // }
  },
  mounted() {
    // 页面置顶
    document.body.scrollTop = 0;
    // 初始化，获取图片宽度
    this.imgOffset = document.querySelector(".picture img").offsetWidth;
    console.log(this.imgOffset);
    // 已选参数
    let data = [];
    // 参数的种类
    for (let item of this.detail.paramSelect.data) {
      data.push(item.detail[0].text);
    }
    this.cartSelectParam = data;
    console.log("first");
    console.log(data);
  }
};
</script>
<style lang='less' scoped>
@import url("../../../static/css/less.less");

.box {
  background-color: rgb(248, 248, 248);
  padding-bottom: 8em;
  z-index: 9999;
  .picture {
    position: relative;
    background-color: #fff;
    overflow: hidden;
    ul {
      width: max-content;
      touch-action: none;
      li {
        float: left;
        width: 100vw;
      }
    }
    img {
      width: 100%;
      height: auto;
    }
    i,
    .nowPic {
      position: absolute;
      background-color: rgba(0, 0, 0, 0.3);
      color: #fff;
    }
    i {
      top: 0.8em;
      left: 0.8em;
      padding: 0.5em;
      border-radius: 50%;
      color: #fff;
      font-size: 1.2em;
      font-weight: bold;
    }
    .nowPic {
      padding: 0.4em;
      bottom: 0.8em;
      right: 0.8em;
      border-radius: 1em;
      font-size: 0.8em;
    }
  }
  .pricebox {
    background-color: #fff;
    text-align: left;
    padding-left: 0.5em;
    vertical-align: middle;
    padding-top: 1em;
    span.price {
      color: #ff5000;
      font-weight: bold;
      font-size: 1.5em;
    }
    span.tag {
      font-size: 0.7em;
      color: @tag-color1;
      background-color: @tag-bgColor1;
      border-radius: 5px;
      padding: 0.2em;
    }
  }
  .title {
    background-color: #fff;
    position: relative;
    font-size: 1em;
    padding-left: 1em;
    font-weight: bold;
    text-align: left;
    text-overflow: ellipsis;
    line-height: 1.5em;
    padding-right: 20%;
    // max-width: 80%;
    // 分享
    .share {
      position: absolute;
      top: 0;
      right: 0;
      border-radius: 50% 0 0 50%;
      font-size: 0.6em;
      color: @sub-black;
      background-color: rgb(244, 244, 244);
      padding: 0.3em;
    }
  }
  // 销量产地
  .tpl-wrapper {
    display: flex;
    background-color: #fff;
    padding: 0 1em 1em 1em;
    color: @normal-black;
    // margin:0.5em 0;
    span {
      flex: 1;
      font-size: 0.8em;
      line-height: 1.5em;
    }
    span:nth-child(1) {
      text-align: left;
    }
    span:nth-child(2) {
    }
    span:nth-child(3) {
      text-align: right;
    }
  }
  .service,
  .param {
    background-color: #fff;
    margin: 0.5em 0;
    vertical-align: middle;
    span {
      float: left;
      line-height: 3em;
      font-size: 0.6em;
      color: @normal-black;
    }
    .sub {
      float: left;
      max-width: 15em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .icon {
      float: right;
      line-height: 2.3em;
      // font-size: 0.6em;
      padding-right: 1em;
    }
  }
  .appraise {
    background-color: #fff;
    span,
    i {
      vertical-align: middle;
      font-size: 0.8em;
      line-height: 3em;
    }
    .title {
      float: left;
    }
    .all,
    i {
      float: right;
      color: rgb(255, 80, 0);
    }
  }
  .appraise.item {
    padding: 0 1em;
    text-align: left;
    .user {
      color: @sub-black;
      img {
        width: 1em;
        height: auto;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
    .text {
      font-size: 0.8em;
      padding-bottom: 2em;
    }
  }
  .bottom {
    width: 100%;
    position: fixed;
    left: 0;
    height: 3em;
    // line-height: 3em;
    bottom: 0;
    z-index: 999;
    background-color: #fff;
    ul {
      display: flex;
      height: 100%;
      li {
        span {
          display: block;
          font-size: 0.8em;
        }
      }
      .shopName,
      .helper,
      .favor {
        flex: 1;
        background-color: #fff;
        line-height: 1.5em;
      }
      .add,
      .buy {
        flex: 3;
        color: #fff;
        line-height: 3em;
      }
      .add {
        background-color: #66b1ff;
      }
      .buy {
        background-color: #0099ff;
      }
    }
  }
  // 卖家
  .seller {
    margin-top: 0.5em;
    padding-top: 0.8em;
    padding-left: 0.8em;
    padding-bottom: 0.8em;
    background-color: #fff;
    .shopImg {
      position: relative;
      width: 3em;
      height: 3em;
      overflow: hidden;
      border-radius: 5px;
      border: 3px solid #fff;
      float: left;
      margin-right: 0.8em;
      img {
        width: 100%;
        height: auto;
      }
    }
    .shop-info {
      float: left;
      .shop-name {
        font-size: 1.2em;
      }
    }
    .score {
      padding: 0;
      ul {
        display: flex;
        margin: 0;
        li {
          flex: 1;
          font-size: 0.8em;
          i {
            color: #ff1e00;
            font-style: normal;
          }
        }
      }
    }
  }
  // 模态框
  .modal {
    // display:none;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    max-height: 60%;
    overflow: auto;
    z-index: 999;
    ul {
      // position: fixed;
      // left: 0;
      // bottom: 0;
      padding: 1em 1em 3em 1em;
      width: 100%;
      background-color: #fff;
    }
    li {
      padding: 1em 0;
    }
    .title {
      font-size: 1em;
      font-weight: bold;
    }
    .item-title {
      color: #333;
      text-align: left;
      line-height: 2em;
    }
    .item-detail {
      color: #999;
      text-align: left;
      line-height: 1.5em;
      font-size: 0.8em;
    }
    .button {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      text-align: center;
      background-color: #0099ff;
      color: #fff;
      font-size: 0.8em;
      line-height: 3em;
      border: none;
    }
  }
  // 购物车模态框
  .cartModal {
    background-color: #fff;
    text-align: left;
    height: 500px;
    overflow: visible;
    // 关闭按钮
    .icon {
      position: absolute;
      top: 0.5em;
      right: 0.5em;
      font-size: 1.5em;
      color: @sub-black;
    }
    .header {
      padding: 0.5em 1em 1em 8em;
      margin: 0 1em;
      border-bottom: 1px solid #ccc;
      overflow: hidden;
      .img-wrap {
        position: absolute;
        top: -3em;
        left: 1em;
        border: 1px solid #eee;
        border-radius: 5px;
        img {
          width: 7em;
          height: auto;
        }
      }
      .main {
        line-height: 1.2em;
        .price {
          font-size: 1.2em;
          color: @tag-color1;
        }
        .stock,
        .sku-info {
          font-size: 0.8em;
          span {
            padding-right: 0.5em;
          }
        }
      }
    }
    // 选择商品参数
    .sku-list-wrap {
      overflow: auto;

      height: 15em;
      ul {
        padding: 0;
        margin-bottom: 3em;
      }
      li {
        margin: 0 1em;
        border-bottom: 1px solid #ccc;
        font-size: 0.8em;
        .prop_title {
          text-align: left;
          line-height: 2em;
        }
        .item {
          display: inline-block;
          margin: 0 1em;
          background-color: #f5f5f5;
          padding: 0.5em;
          border-radius: 5px;
          line-height: 1.5em;
          img {
            width: 2em;
            height: auto;
            vertical-align: middle;
            margin-right: 0.5em;
          }
        }
        .itemSelect {
          background-color: #dfeeff;
          color: #0099ff;
          border: 1px solid #0099ff;
        }
      }
      // 购买数量选择
      .amount {
        input {
          border: none;
        }
      }
    }
  }
  .modal-bg {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .modal-collect,
  .modal-addCart {
    position: fixed;
    width: 10em;
    // height: 10em;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2em;
    background-color: rgba(0, 0, 0, 0.5);
    text-align: center;
    line-height: 2em;
    border-radius: 10px;
    color: #fff;
    i {
      font-size: 3em;
    }
  }
}
</style>