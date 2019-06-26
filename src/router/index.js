import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/pages/index.vue'                     //主页
import goodsList from '../components/pages/goodsList.vue'             //商品列表
import goodsDetail from '../components/pages/goodsDetail.vue'         //商品详细
import individual from '../components/pages/individual.vue'           //个人中心
import news from '../components/pages/news.vue'                       //消息列表
import chatBox from '../components/pages/chatBox.vue'                       //消息列表
import shoppingCart from '../components/pages/shoppingCart.vue'       //购物车
import login from '../components/pages/login.vue'                     //登录
import register from '../components/pages/register.vue'               //注册
import QRCode from '../components/pages/QRCode.vue'                 //扫码
import order from '../components/pages/order.vue'                 //订单
import pay from '../components/pages/pay.vue'                 //付款成功
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Router)
//使用饿了么UI
Vue.use(ElementUI);

export default new Router({
  routes: [
    {
      path: '/m.shop/',
      name: 'index',
      component: index
    },{
      path: '/m.shop/goodsList',
      name: 'goodsList',
      component: goodsList
    },{
      path: '/m.shop/goodsDetail',
      name: 'goodsDetail',
      component: goodsDetail
    },{
      path: '/m.shop/individual',
      name: 'individual',
      component: individual
    },{
      path: '/m.shop/news',
      name: 'news',
      component: news
    },{
      path: '/m.shop/chatBox',
      name: 'chatBox',
      component:chatBox
    },{
      path: '/m.shop/shoppingCart',
      name: 'shoppingCart',
      component: shoppingCart
    },{
      path: '/m.shop/login',
      name: 'login',
      component: login
    },{
      path: '/m.shop/register',
      name: 'register',
      component: register
    },{
      path: '/m.shop/QRCode',
      name: 'QRCode',
      component: QRCode
    },{
      path: '/m.shop/order',
      name: 'order',
      component: order
    },{
      path: '/m.shop/pay',
      name: 'pay',
      component: pay
    },{
      path:'*',
      redirect:'/m.shop/'
    }
  ]
})
