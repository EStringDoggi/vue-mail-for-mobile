import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        userInfo: { // 用户信息
            username: ''
        },
        shoppingCart: [], // 购物车
    },
    getters,
    actions,
    mutations
});