<template>
  <div class="chatBox">
    <div class="top">
      <i class="el-icon-arrow-left"></i>
      <h5>{{seller.name}}</h5>
    </div>
    <ul>
      <!-- 聊天消息 -->
      <li v-for="(item,index) in data" :key="index" class="clearfix">
        <img
          :src="[item.isSeller?seller.img:user.img]"
          :class="[item.isSeller?'imgLeft':'imgRight']"
          alt
        >
        <div class="chatText" :class="[item.isSeller?'text_seller':'text_user']">{{item.text}}</div>
      </li>
    </ul>
    <div class="text-box">
      <i class="el-icon-circle-plus-outline"></i>
      <input type="text">
      <el-button class="button" type="success" @click="send" v-model="text" size="small" round>发送</el-button>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      id: this.$route.query.id, //参数id
      text: "", //输入框内容
      data: [], //聊天记录
      seller: { img: null, name: null }, //卖家信息
      user: { img: null, name: null } //用户信息
    };
  },
  methods: {
    send() {},
    // 获取数据
    getData() {
      let data = [];
      let seller_img = null;
      let seller_name = null;
      this.news.data.forEach(item => {
        if (item.id == this.id) {
          data = item.chat;
          seller_img = item.img;
          name = item.title;
        }
      });
      this.data = data;
      this.seller.img = seller_img;
      this.seller.name = name;
      this.user.img = this.information.headImgUrl;
      this.user.name = this.information.name;
    }
  },
  computed: {
    ...mapState(["news", "information"])
  },
  created() {
    this.getData();
  }
};
</script>
<style lang='less' scoped>
@import url("../../../static/css/less.less");
.chatBox {
  height: 100vh;
  background-color: rgb(243, 243, 243);
  .top {
    line-height: 2rem;
    background-color: #fff;
    i {
      float: left;
      margin-left: 1em;
      line-height: 2em;
    }
    h5 {
    }
  }
  .imgLeft {
    float: left;
  }
  .imgRight {
    float: right;
  }
  ul {
    li {
      padding: 0.5em;
      line-height: 2rem;
      img {
        width: 2em;
        height: auto;
        border-radius: 5px;
      }
      //   聊天消息框
      .chatText {
        width: max-content;
        max-width: 80%;
        padding: 0.5rem 0.5rem;
        font-size: 0.8rem;
        position: relative;
        border-radius: 5px;
        line-height: 1.2rem;
      }
      .text_seller {
        margin-left: 0.5rem;
        background-color: #fff;
        float: left;
        text-align: left;
        &::before {
          content: "";
          position: absolute;
          top: 0.5rem;
          left: -1rem;
          border:0.5rem solid transparent;
          border-right-color:#fff;
        }
      }
      .text_user {
        margin-right: 0.5rem;
        background-color: @theme-color;
        text-align: right;
        float: right;
        &::after {
          content: "";
          position: absolute;
          top: 0.5rem;
          right: -1rem;
          border:0.5rem solid transparent;
          border-left-color:@theme-color;
        }
      }
    }
  }
  .text-box {
    position: fixed;
    display: flex;
    width: 100%;
    left: 0;
    bottom: 0em;
    padding: 0.2em 0;
    background-color: rgb(247, 247, 247);
    border-top: 1px solid #ddd;
    i {
      flex: 1;
      line-height: 2rem;
      font-size: 2em;
    }
    input {
      flex: 6;
    }
    .button {
      flex: 1;
      margin: 0 0.5em;
    }
  }
}
</style>