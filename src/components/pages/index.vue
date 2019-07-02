<template>
  <div class="index" onresize="loadImgOffset">
    <myHeader></myHeader>    
    <!-- nav -->
    <div class="nav">
      <div class="navBox">
        <!-- 图片 -->
        <ul
          @touchstart.stop.prevent="touchstart"
          @touchmove.stop.prevent="touchmove"
          @touchend.stop.prevent="touchend"
          :style="navX"
          :class="{'mytransition':useTransition}"
          class="imageList clearfix"
        >
          <li v-for="(item,index) in navImgArrUrl" :key="index">
            <img :src="item.imgUrl">
          </li>
        </ul>
        <!-- 圆点 -->
        <ul class="pointList">
          <!-- nav去掉首尾图片，共五张图 -->
          <li
            v-for="(item,index) in 5"
            :key="index"
            :class="[(index == navIndex - 1)?'pointActive':'']"
          ></li>
        </ul>
      </div>
    </div>
    <!-- 分类 -->
    <div class="classify clearfix">
      <div class="item" v-for="(item,index) in classifyArr" :key="index">
        <img :src="item.imgUrl" alt>
        <span>{{item.text}}</span>
      </div>
    </div>
    <!-- 推荐内容-主题板块 -->
    <div class="recommend clearfix">
      <div class="item" v-for="(item,index) in recommendArr" :key="index">
        <img :src="item.imgUrl" alt>
      </div>
    </div>
    <!-- 推荐内容-主题板块 end-->
    <!-- 推荐内容-商品板块 -->
    <div class="recommendPro clearfix">
      <div class="item" v-for="(items,index) in recommendProArr" :key="index">
        <div>
          <img :src="items.titleIcon" class="titleIcon" alt>
          <h5>{{items.title}}</h5>
          <span>{{items.sub_title}}</span>
        </div>
        <img v-for="(item,index) in items.img" :key="index" class="itemImg" :src="item" alt>
      </div>
    </div>
    <!-- 推荐内容-商品板块 end-->
    <!-- 底栏 -->
    <div class="bottom"></div>
    <!-- 底栏 -->
    <myFooter></myFooter>
  </div>
</template>
<script>
import { Transform } from "stream";
import myHeader from '../header/header'
import myFooter from '../footer/footer'
// import { clearInterval } from 'timers';
export default {
  data() {
    return {
      // nav
      navImgArrUrl: [
        {
          imgUrl: "../../../static/img/nav/5.jpg", //图片地址
          link: "" //跳转地址
        },
        {
          imgUrl: "../../../static/img/nav/1.jpg", //图片地址
          link: "" //跳转地址
        },
        {
          imgUrl: "../../../static/img/nav/2.jpg", //图片地址
          link: "" //跳转地址
        },
        {
          imgUrl: "../../../static/img/nav/3.jpg", //图片地址
          link: "" //跳转地址
        },
        {
          imgUrl: "../../../static/img/nav/4.jpg", //图片地址
          link: "" //跳转地址
        },
        {
          imgUrl: "../../../static/img/nav/5.jpg", //图片地址
          link: "" //跳转地址
        },
        {
          imgUrl: "../../../static/img/nav/1.jpg", //图片地址
          link: "" //跳转地址
        }
      ],
      // 分类
      classifyArr: [
        {
          imgUrl: "../../../static/img/index/icon/9.png",
          link: "",
          text: "去看电影"
        },
        {
          imgUrl: "../../../static/img/index/icon/10.png",
          link: "",
          text: "鲜花蛋糕"
        },
        {
          imgUrl: "../../../static/img/index/icon/11.png",
          link: "",
          text: "网上书店"
        },
        {
          imgUrl: "../../../static/img/index/icon/12.png",
          link: "",
          text: "旅游出行"
        },
        {
          imgUrl: "../../../static/img/index/icon/13.png",
          link: "",
          text: "购物车"
        },
        {
          imgUrl: "../../../static/img/index/icon/14.png",
          link: "",
          text: "运动健身"
        },
        {
          imgUrl: "../../../static/img/index/icon/15.png",
          link: "",
          text: "生鲜超市"
        },
        {
          imgUrl: "../../../static/img/index/icon/16.png",
          link: "",
          text: "生活服务"
        }
      ],
      // 推荐-板块
      recommendArr: [
        {
          imgUrl: "../../../static/img/index/recommend/1.png",
          link: "",
          text: ""
        },
        {
          imgUrl: "../../../static/img/index/recommend/2.png",
          link: "",
          text: ""
        },
        {
          imgUrl: "../../../static/img/index/recommend/3.png",
          link: "",
          text: ""
        },
        {
          imgUrl: "../../../static/img/index/recommend/4.png",
          link: "",
          text: ""
        },
        {
          imgUrl: "../../../static/img/index/recommend/5.png",
          link: "",
          text: ""
        },
        {
          imgUrl: "../../../static/img/index/recommend/6.png",
          link: "",
          text: ""
        }
      ],
      // 推荐-商品
      recommendProArr: [
        //食品
        {
          title: "精选小吃",
          titleIcon: "../../../static/img/index/icon/7.png",
          sub_title: "限时限量抢半价",
          img: [
            "../../../static/img/index/eat/item-eat-1-5.jpg",
            "../../../static/img/index/eat/item-eat-1-2.jpg"
          ]
        },
        //数码1
        {
          title: "电脑整机",
          titleIcon: "../../../static/img/index/icon/16.png",
          sub_title: "只给挑剔的你",
          img: [
            "../../../static/img/index/computer/item-computer-1-3.jpg",
            "../../../static/img/index/computer/item-computer-2.jpg"
          ]
        },
        //数码2
        {
          title: "数码影音",
          titleIcon: "../../../static/img/index/icon/9.png",
          sub_title: "越买越开心",
          img: [
            "../../../static/img/index/computer/item-computer-2-3.jpg",
            "../../../static/img/index/computer/item-computer-2-5.jpg"
          ]
        },
        //日用
        {
          title: "实惠日用",
          titleIcon: "../../../static/img/index/icon/15.png",
          sub_title: "抢第二件1元",
          img: [
            "../../../static/img/index/seckill/seckill-item4.jpg",
            "../../../static/img/index/seckill/seckill-item5.jpg"
          ]
        }
      ],
      pointList: [],
      navIndex: 1, //当前img下标
      index: 0, //目标图片的下标
      navXStart: 0, //movestart坐标值 - this.translateX
      //   navXEnd: 0, //移动过程坐标值
      touchStartX: 0, //movestart坐标值
      touchBetween: 0, //move差值
      navImgOffset: 0, //nav图片宽度像素
      navX: {
        transform: "translateX(0px)"
      },
      translateX: 0, //位移的X值
      touchTranslateX: 0, //每次移动时start与end的差值
      useTransition: false, //nav是否使用过渡动画
      autoScrollInterval: null //定时器
    };
  },
  components:{
    myHeader,
    myFooter
  },
  methods: {
    touchstart(e) {
      //关闭动画
      this.useTransition = false;
      //记录初始X
      this.navXStart = e.changedTouches[0].clientX - this.translateX;
      this.touchStartX = e.changedTouches[0].clientX;
      console.log(this.autoScrollInterval);
      if (this.autoScrollInterval) {
        // console.log("清除定时器");
        // 清除定时器
        clearInterval(this.autoScrollInterval);
        this.autoScrollInterval = null;
      }
    },
    touchmove(e) {
      // 记录当前X坐标
      let navXEnd = e.changedTouches[0].clientX;
      // 位移差
      let tempX = navXEnd - this.navXStart;
      //位移
      this.navX["transform"] = "translateX(" + tempX + "px)";
      // 位移差赋值
      this.translateX = tempX;
      //计算移动差值，以便在touchend做判断
      this.touchBetween = navXEnd - this.touchStartX;
    },
    touchend(e) {
      //开启动画
      this.useTransition = true;
      //根据位移差判断是否跳到上下一张
      // console.log("图片宽度：",this.navImgOffset);
      let touchBetween = Math.abs(this.touchBetween);
      if (touchBetween >= this.navImgOffset / 4) {
        console.log(this.index);

        //移动距离大于屏幕宽度4/1
        if (this.touchBetween > 0) {
          //右滑
          this.animate_translateX(false);
          0;
        } else {
          //左滑
          this.animate_translateX(true);
        }
      } else {
        // 吸附回来
        this.navX["transform"] = "translateX(" + this.navIndex * this.navImgOffset * -1 + "px)";
      }

      //开启定时器
      if (!this.autoScrollInterval) {
        // console.log("开启定时器");
        this.newAutoScroll();
      }
    },
    //位移动画函数

    /**
     * direction:方向 true左  false右
     * init:初始化 0开头  1结尾
     * 功能：位移
     */
    animate_translateX(direction, init = 2) {
      //direction:方向 true左  false右
      let imgWidth = this.navImgOffset; //图片宽度
      let direcFactor = -1; //方向   -1:左  1：右
      let countFactor = 0;
      if (direction) {
        //左
        direcFactor = -1;
        this.index = this.navIndex + 1; //下一张图片的下标
        countFactor = 1;
      } else {
        //右
        this.index = this.navIndex - 1; //上一张图片的下标
        countFactor = -1;
      }
      if (init == 1) {
        //最后一张图，重置到第一张
        this.navIndex = 1;
        this.index = 1;
      }
      if (init == 0) {
        //第一张图，重置到最后一张
        this.navIndex = 5;
        this.index = 5;
      }
      let translateX = this.index * imgWidth * direcFactor;
      this.navX["transform"] = "translateX(" + translateX + "px)";
      // 更新translateX的值
      this.translateX = translateX;
      this.index = this.index + countFactor;
      //更新index
      this.navIndex = this.index - countFactor;
      //检查是否最后一张
      setTimeout(() => {
        // 如果到最后一张图，跳转到第一张图
        if (this.index >= 7) {
          // 关闭动画
          this.useTransition = false;
          //重置到第一张
          this.animate_translateX(true, 1);
          // 开启动画
          setTimeout(() => {
            this.useTransition = true;
          }, 300);
        } else if (this.index <= -1) {
          this.useTransition = false;
          //重置到最后一张
          this.animate_translateX(true, 0);
          //开启动画
          setTimeout(() => {
            this.useTransition = true;
          }, 300);
        }
      }, 300);

      console.log(this.index);
      
    },
    //设置定时器nav自动滚动
    newAutoScroll() {
      this.autoScrollInterval = setInterval(() => {
        this.animate_translateX(true);
      }, 1000);
    },
      loadImgOffset(){
      // 初始化，获取图片宽度，nav移至第一张图
      this.navImgOffset = document.querySelector(".navBox img").offsetWidth;
      this.translateX = -document.querySelector(".navBox img").offsetWidth;
      this.navX["transform"] = "translateX(" + this.translateX + "px)";
      console.log('loadImgOffset');
      
      }
  },
  mounted() {
    // 初始化，获取图片宽度，nav移至第一张图
    this.loadImgOffset()
    //nav动画
    this.newAutoScroll();
    //开启动画
    this.useTransition = true;
    // 窗口改变时，重新获取图片宽度
    window.onresize = () =>{
        this.loadImgOffset()
    }
  },
  destroyed() {
    window.onresize = null
    if (this.autoScrollInterval) {
        // console.log("清除定时器");
        // 清除定时器
        clearInterval(this.autoScrollInterval);
        this.autoScrollInterval = null;
      }
  },
};
</script>
<style lang="less">
@import url("../../../static/css/less.less");
.navBox {
  overflow: hidden;
  position: relative;
  .imageList {
    width: 700%; //五张图
    display: flex;
    li {
      flex: 1;
      float: left;
      img {
        width: 100%;
        height: auto;
      }
    }
  }
  .pointList {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    li {
      width: 0.5em;
      height: 0.5em;
      float: left;
      margin: 0 0.2em;
      border-radius: 50%;
      border: 1px solid #fff;
    }
  }
  .pointActive {
    background-color: #0099ff;
  }
}
// 分类
.classify {
  .item {
    float: left;
    width: 25%;
    margin-top: 0.5em;
    img {
      width: 50%;
      height: auto;
    }
    span {
      display: block;
      margin: 0.5em 0;
      font-size: 0.8em;
    }
  }
}
// 推荐-模块
.recommend {
  .item {
    float: left;
    width: 50%;
    margin-top: 0.5em;
    img {
      width: 90%;
    }
  }
}
// 推荐-商品
.recommendPro {
  .item {
    float: left;
    width: 50%;
    margin-top: 0.5em;
    div {
      text-align: left;
      line-height: 1.1em;
      h5 {
        font-size: 0.8em;
        font-weight: bold;
        // margin-left: 1em;
      }
      .titleIcon {
        width: 1.4em;
        font-size: 0.5em;
        height: auto;
        float: left;
        margin: 0 0.5em 0 2em;
        vertical-align: middle;
      }
      span {
        margin-left: 2em;
        font-size: 0.5em;
        color: @placeholder-black;
      }
    }
    .itemImg {
      width: 40%;
      height: auto;
      margin: 0 5%;
      float: left;
    }
  }
}
.bottom {
  height: 5em;
}
</style>