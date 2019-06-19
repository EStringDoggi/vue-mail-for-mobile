<template>
  <div id="app">
    <!-- <myHeader></myHeader> -->
    <router-view/>
    <!-- <myFooter></myFooter> -->
  </div>
</template>

<script>
import '../static/css/reset.css';
import '../static/css/myClass.css'
// import myHeader from '../src/components/header/header'
import 'animate.css/animate.css'

// import myFooter from '../src/components/footer/footer'
export default {
  name: 'App',
  components:{
    // myHeader,
    // myFooter
  }
}
</script>

<style lang="less">
// @import url("../static/css/less.less");
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // position: relative;
}
</style>
