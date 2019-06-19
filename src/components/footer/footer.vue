<template>
  <div class="footerBox">
    <ul>
      <!-- 首页 -->
      <li v-for="(item,index) in lisArr" 
      :key="index" 
      :class="{active:index == footerIndex}"
      @click="IndexChange(index)"
      >
        <router-link :to="item.routerLink">
          <i :class="item.iclassName"></i>
          <span>{{item.text}}</span>
        </router-link>
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
          routerLink:'/m.shop/QRCode',
          iclassName:'el-icon-full-screen',
          text:'扫码',
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
    IndexChange(index){
      this.$store.commit('INDEX_CHANGE',index)
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
  ul{
    display: flex;
    justify-content: space-around;
    li{
      flex: 1;
      display: inline-block;
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

}
.active{
  background-color:#d9ecff ;
}
</style>
