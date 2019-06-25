<template>
  <!-- 订单页 -->
  <div class="orderBox">
    <!-- 收货地址 -->
    <div class="address">
      <div class="address-col-1">
        <span>收货人：</span>
        <span>？？？</span>
        <span>13000000000</span>
      </div>
      <div class="address-col-2">
          <span>收货地址：</span>
          <span>地址地址地址</span>
      </div>
    </div>
    <div class="check">
        <div class="goods-list">
            <ul v-for="(item,index) in order" :key="index">
                <li>
                    <div class="seller">
                        {{item.seller}}
                    </div>
                </li>
                <li v-for="(goods,index) in item.goods" :key="index">
                    {{goods.goodsName}}
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    computed: {
        ...mapState(['order'])
    },
};
</script>
<style lang='less' scoped>
</style>