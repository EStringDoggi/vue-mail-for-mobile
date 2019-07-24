<template>
  <div class="head-box mytransition" :style="boxBGcolor">
    <!-- 导航栏-->
    <!-- ←按钮返回 -->
    <div class="goback" v-show="eleShow.gobackBtn">
      <i class="el-icon-back" @click="goBack"></i>
    </div>
    <!-- ←按钮返回 end-->

    <!-- 城市 -->
    <div class="city" v-show="eleShow.cityShow">
      <i class="el-icon-location-outline" @click="cityListShow"></i>
      <!-- 当前城市 -->
      <span @click="cityListShow">{{city}}</span>
      <i :class="el_icon_caret" @click="cityListShow"></i>
      <!-- 城市列表 -->
      <div class="cityList" v-show="isCityListShow">
        <ul v-for="(items,index) in cityArr" :key="index">
          <li v-for="(item,index) in items" :key="index" @click="changeCity(item)">{{item}}</li>
        </ul>
      </div>
    </div>
    <!-- 城市 end-->

    <!-- 搜索框 -->
    <div class="search mytransition" :class="{'searchFocus':eleShow.searchShow}">
      <input 
      type="text" 
      class="mytransition" 
      placeholder="请输入内容"
      @focus="searchFocus" 
      v-model="eleShow.searchText"
      >
      <i class="el-icon-error" @click="clearSearch" v-show="eleShow.clearSearchBtnShow"></i>
    </div>
    <!-- 搜索框 end-->
    <!-- 主页 -->
    <div class="goBackIndex" v-show="eleShow.indexShow" @click="goBackIndex">
      <i class="el-icon-s-home"></i>
    </div>
    <!-- 主页 end-->
    <!-- 天气 -->
    <div class="weather" v-show="eleShow.weatherShow">
      <i class="el-icon-cloudy-and-sunny"></i>
      <span>27°C</span>
    </div>
    <!-- 天气 end-->

    <!-- 搜索按钮 -->
    <div class="searchBtn" v-show="eleShow.searchBtnShow" @click="searchBtnClick(null)">
      <button class>搜索</button>
    </div>
    <!-- 搜索按钮 end-->

    <!-- 快速搜索模块 -->
    <div class="searchBox" v-show="eleShow.searchBoxShow" @touchmove.stop.prevent>
      <!-- 历史搜索 -->
      <div class="historySearch">
        <div class="clearfix">
          <h5>历史搜索</h5>
          <!-- 垃圾桶 -->
          <i class="el-icon-delete delete" @click="deleteHistorySearch"></i>
        </div>
        <div class="tagBox clearfix">
          <el-tag
            class="SearchText"
            type="info"
            v-for="(item,index) in historySearchText"
            :key="index"
            @click="searchBtnClick(item)"
          >{{item}}</el-tag>
        </div>
      </div>
      <!-- 历史搜索 end-->
      <div class="popSearch">
        <div class="clearfix">
          <h5>热门搜索</h5>
        </div>
        <div class="tagBox">
          <el-tag
            class="SearchText"
            type="info"
            v-for="(item,index) in popSearchText"
            :key="index"
            @click="searchBtnClick(item)"
          >{{item}}</el-tag>
        </div>
      </div>
      <!-- 热门搜索 -->
      <div class="popSearch" v-show="eleShow.popSearchShow">
        <div class="clearfix">
          <h5>热门搜索</h5>
          <i class="el-icon-delete delete"></i>
        </div>
      </div>
      <!-- 热门搜索 end-->
      <!-- 快速搜索模块 end-->
    </div>

  </div>
</template>

<script>
// import store from "@/vuex/store";
import { mapState } from "vuex";
export default {
  name: "myHeader",
  created() {
    // this.isLogin();
  },
  data() {
    return {
      // isAllShow:true,
      boxBGcolor: {
        backgroundColor: "#0099ff"
      },
      city: "深圳",
      isCityListShow: false,
      cityArr: [
        ["北京", "上海", "天津", "重庆", "广州"],
        ["深圳", "河南", "辽宁", "吉林", "江苏"],
        ["江西", "四川", "海南", "贵州", "云南"],
        ["西藏", "陕西", "甘肃", "青海", "珠海"]
      ],
      el_icon_caret: "el-icon-caret-bottom",
      eleShow: {
        gobackBtn: false,
        searchShow: false,      //搜索框是否变长
        searchBtnShow: false,
        searchBoxShow: false,   //快速搜索模块
        cityShow: true,
        weatherShow: true,
        indexShow:true,         //主页按钮
        searchText:'',
        clearSearchBtnShow:false
      },
      isSearchFocus: false,     //搜索框是否对焦
      //历史搜索需要从本地获取，且允许记录搜索内容                        ！！
      historySearchText: [
        "内存条",
        "瓜子",
        "益生菌",
        "台灯",
        "三文鱼",
        "锐龙3700",
        "音箱",
        "铁三角"
      ],
      popSearchText: [
        "内存条",
        "瓜子",
        "益生菌",
        "台灯",
        "三文鱼",
        "锐龙3700",
        "音箱",
        "铁三角"
      ],
    };
  },
  computed: {
    ...mapState(["userInfo", "shoppingCart"])
  },
  methods: {
    //  ...mapActions(['signOut', 'isLogin']),

    // 显隐城市列表
    cityListShow() {
      // 显隐列表
      this.isCityListShow = !this.isCityListShow;
      // 图标切换
      this.el_icon_caret == "el-icon-caret-bottom"
        ? (this.el_icon_caret = "el-icon-caret-top")
        : (this.el_icon_caret = "el-icon-caret-bottom");
    },
    // 切换城市
    changeCity(city) {
      this.city = city;
      // 隐藏列表
      this.isCityListShow = !this.isCityListShow;
      // 图标切换
      this.el_icon_caret == "el-icon-caret-bottom"
        ? (this.el_icon_caret = "el-icon-caret-top")
        : (this.el_icon_caret = "el-icon-caret-bottom");
    },
    // 搜索框焦点
    searchFocus() {
      if (!this.isSearchFocus) {
        // 宽度80%
        this.eleShow.searchShow = true;
        // 隐藏城市
        this.eleShow.cityShow = false;
        // 背景色白
        this.boxBGcolor.backgroundColor = "#fff";
        // 隐藏天气
        this.eleShow.weatherShow = false;
        // 隐藏主页按钮
        this.eleShow.indexShow = false;
        // 显示左箭头返回
        this.eleShow.gobackBtn = true;
        // 显示搜索按钮
        this.eleShow.searchBtnShow = true;
        //显示清除按钮
        this.eleShow.clearSearchBtnShow = true
        // 显示历史、热门搜索
        this.eleShow.searchBoxShow = true;
        //当前已对焦
        this.eleShow.isSearchFocus = true;
      }
    },
    // 点击搜索按钮跳转至商铺列表
    searchBtnClick(e){
      if(e!=null){
        this.eleShow.searchText = e
      }
      this.goBack()
      this.$router.push({path:'/m.shop/goodsList',query:{searchText:this.eleShow.searchText}})
    },
    //清空搜索框
    clearSearch(){
      this.eleShow.searchText = ''
    },
    // 返回
    goBack() {
      this.isSearchFocus = false;
      // 宽度40%
      this.eleShow.searchShow = false;
      // 显示天气
      this.eleShow.weatherShow = true;
      // 显示主页按钮
      this.eleShow.indexShow = true;
      // 显示城市
      this.eleShow.cityShow = true;
      // 背景色蓝
      this.boxBGcolor.backgroundColor = "#0099ff";
      // 隐藏左箭头返回
      this.eleShow.gobackBtn = false;
      // 隐藏搜索按钮
      this.eleShow.searchBtnShow = false;
      //隐藏清除按钮
      this.eleShow.clearSearchBtnShow = false
      //当前无对焦
      this.eleShow.isSearchFocus = false;
      // 隐藏历史、热门搜索
      this.eleShow.searchBoxShow = false;
      console.log("goBack()");
    },
    // 清除历史搜索
    deleteHistorySearch() {
      this.historySearchText = [];
    },
    // 返回主页
    goBackIndex(){
      this.$router.push('/m.shop')

    }
    // goToPay () {
    //   this.$router.push('/m.shop/order');
    // },
    // myInfo () {
    //   this.$router.push('/m.shop/home');
    // },
    // signOutFun () {
    //   this.signOut();
    //   this.$router.push('/m.shop/');
    // }
  }
  //   store
};
</script>

<style lang="less" scoped>
@import url("../../../static/css/less.less");
.head-box {
  width: 100%;
  height: 3em;
  background-color: #0099ff;
  // display: flex;
}
.nav {
  margin: 0% auto;
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.nav ul {
  list-style: none;
}
.nav li {
  float: left;
  font-size: 14px;
  line-height: 35px;
  margin-right: 15px;
  font-weight: bold;
}
.nav a {
  text-decoration: none;
  color: #999999;
  padding-left: 15px;
  border-left: 1px solid #ccc;
  cursor: pointer;
}
.location a {
  border-left: none;
}
.nav a:hover {
  color: #d9534f;
}
.location {
  color: #999999;
}
.icon {
  color: #d9534f;
}
.first {
  color: #999999;
}
.first a:first-child {
  padding-left: 3px;
  border-left: none;
}
.city {
  padding: 10px 15px;
}
.city-item {
  font-weight: bold;
  cursor: pointer;
  padding: 5px;
}
.city-item:hover {
  color: #d9534f;
}
.person-icon {
  color: #d9534f;
  background-color: #f0cdb2;
}
.username {
  color: #999999;
}
.shopping-cart-list {
  padding: 3px 15px;
}
.shopping-cart-box {
  margin: 8px 0px;
  margin-top: 15px;
  padding-bottom: 15px;
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px #ccc dotted;
}
.shopping-cart-box:first-child {
  margin-top: 8px;
}
.shopping-cart-img {
  margin-right: 15px;
  width: 40px;
  height: 40px;
}
.shopping-cart-img img {
  width: 100%;
}
.shopping-cart-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
  width: 200px;
  overflow: hidden;
  font-size: 12px;
  line-height: 20px;
  color: #999999;
}
.shopping-cart-detail {
  color: #999999;
}
.shopping-cart-text {
  color: #ccc;
}
.go-to-buy {
  display: flex;
  justify-content: flex-end;
}
.shopping-cart-null {
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.cart-null-icon {
  font-size: 38px;
  margin-bottom: 15px;
}
.shopping-cart-null span {
  color: #999999;
  font-size: 12px;
  line-height: 16px;
}
.username-p {
  cursor: pointer;
}
.my-page {
  padding: 3px 5px;
  width: 180px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.my-page a {
  margin: 0px;
  padding: 0px;
  border: none;
}
.my-info {
  padding: 5px;
  width: 50%;
  height: 100%;
  text-align: center;
  cursor: pointer;
}
.my-info:hover {
  box-shadow: 0px 0px 5px #ccc;
}
.my-info i {
  font-size: 28px;
}
.my-info p {
  font-size: 12px;
}
.sign-out {
  padding: 5px;
  width: 50%;
  height: 100%;
  text-align: center;
  cursor: pointer;
}
.sign-out:hover {
  box-shadow: 0px 0px 5px #ccc;
}
.sign-out i {
  font-size: 28px;
}
.sign-out p {
  font-size: 12px;
}

/* -------------------------- */
.goback {
  margin: 0;
  padding: 0;
  float: left;
  width: 20%;
  vertical-align: middle;
  line-height: 1.5em;
  font-size: 2em;
  color: @important-black;
}
/* 城市 */
.city {
  width: 30%;
  float: left;
  // flex: 1;
  text-align: left;
  color: #fff;
  line-height: 3em;
  vertical-align: middle;
  margin: 0;
  padding: 0;
  // position: absolute;
  // left: 0;
  // padding: 0;
  i:first-child {
    padding: 0 0 0 0.5em;
  }
}
.cityList {
  background-color: #fff;
  margin: 0;
  padding: 0;
  position: absolute;
  width: max-content;
  box-shadow: 0 0px 5px #777;
  z-index: 999;
  border-radius:0 0 5px 5px;
  ul {
    padding: 0;
    margin: 0;
    // position: relative;
    // display: block;
    li {
      display: inline-block;
      margin: 0 1em;
      font-size: 0.8em;
      color: #0099ff;
      text-shadow: 0 1px 2px #ccc;
    }
  }
}
// 搜索框
.search {
  position: relative;
  vertical-align: middle;
  line-height: 3em;
  display: inline-block;
  width: 40%;
  // flex: 3;
  input {
    border-radius: 1em;
    font-size: 1em;
    border: none;
    height: 2em;
    // flex: 3;
    position: relative;
    top: 0.5em;
    width: 100%;
    display: block;
    // padding: 0 0 0 1em;
    padding: 0;
    text-indent: 1em;
    // vertical-align: middle;
    &:focus {
      border: 0;
      outline: none;
      -webkit-appearance: none;
    }
  }
  i{
    position: absolute;
    top: 50%;
    // transform: translateY(-50%);
    right: 0.5em;
    // background-color: #e5e5e5;
  }
}
// 搜索框对焦
.searchFocus {
  width: 60%;
  // padding-left: 5%;
  input {
    background-color: rgb(230, 230, 230);
    border-radius: 0;
  }
}
// 天气
.weather {
  // display: inline-block;
  // flex: 1;
  width: 10%;
  float: right;
  color: #fff;
  padding-top: 0.5em;
  i {
    // line-height: 1.5em;
    font-size: 1em;
  }
  span{
    display: block;
    font-size: 0.8em;
  }
}
// 返回主页
.goBackIndex{
  // display: inline-block;
  width: 15%;
  float: right;
  color: #fff;
  i{
    line-height: 1.5em;
    font-size: 2em;
  }
}
// 搜索按钮
.searchBtn {
  width: 20%;
  min-width: 2em;
  float: right;
  position: relative;
  top: 0.5em;
  button {
    width: 100%;
    font-size: 1em;
    line-height: 2em;
    margin: 0;
    padding: 0;
    background-color: transparent;
    border: none;
    color: @important-black;
    &:focus{
      outline: none;
    }
  }
}

.searchBox {
  position: absolute;
  top: 3em;
  width: 100%;
  min-height: 500px;
  background-color: #fff;
  z-index: 9999;
  height: 100%;
  
}
// 历史、热门搜索
.historySearch,
.popSearch {
  h5 {
    float: left;
    padding-top: 1em;
    padding-left: 1em;
    font-size: 0.8em;
    font-weight: bold;
  }
  // 垃圾桶
  .delete {
    float: right;
    padding-top: 1em;
    padding-right: 1em;
    font-size: 0.8em;
    font-weight: bold;
  }
  .tagBox {
    padding: 1em 1em;
  }
  .SearchText {
    margin: 1em 1em;
    float: left;
  }

}
</style>
