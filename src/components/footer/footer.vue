<template>
  <div class="footerBox">
    <ul class="clearfix">
      <!-- 首页 -->
      <li v-for="(item,index) in lisArr" 
      :key="index" 
      :class="{active:index == footerIndex && index != 2}"
      @click="Index_Change(index)"
      >
        <router-link :to="item.routerLink" v-if="item.id != 2">
          <i :class="item.iclassName"></i>
          <span>{{item.text}}</span>
        </router-link>
        <div class="icon" v-if="item.id == 2">
          <img src="../../../static/img/logo.png" alt="" srcset="">
        </div>
      </li>
      
    </ul>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex"
export default {
  name: 'Footer',
  data () {
    return {
      lisArr:[
        {
          routerLink:'/m.shop/',
          iclassName:'el-icon-s-home',
          text:'首页',
          id:0
        },{
          routerLink:'/m.shop/news',
          iclassName:'el-icon-bell',
          text:'消息',
          id:1
        },{
          routerLink:'',
          // iclassName:'el-icon-full-screen',
          iclassName:'',
          text:'',
          id:2
        },{
          routerLink:'/m.shop/shoppingCart',
          iclassName:'el-icon-shopping-cart-2',
          text:'购物车',
          id:3
        },{
          routerLink:'/m.shop/individual',
          iclassName:'el-icon-user',
          text:'个人中心',
          id:4
        }
      ],
      // 需要使用vuex
      nowIndex:0,       //当前active下标
    };
  },
  computed:{
    ...mapGetters(["footerIndex"])
  }
  ,
  methods:{
    ...mapActions(['IndexChange']),
    Index_Change(index){
      // this.$store.commit('INDEX_CHANGE',index)
      this.IndexChange(index)
      console.log("change");
      
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../../static/css/less.less");

.footerBox{
  width: 100%;
  left: 0;
  bottom: 0;
  position: fixed;
  background-color: #fff;
  z-index: 999;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  ul{
    // position: absolute;
    // top: 0;
    // left: 0;
    display: flex;
    justify-content: space-around;
    li{
      flex: 1;
      display: inline-block;
      position: relative;
      // line-height: 2em;
      padding: 0.5em 0;
      i{
        display: block;
        font-size: 1.5em;
      }
      span{
        font-size: 0.6em;
      }
    }
  }
  .icon{
    width: 4em;
    height: 4em;
    overflow: hidden;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;

    img{
      width: 100%;
      height: auto;
    }
  }

}
.active{
  background-color:#d9ecff ;
}
</style>
