import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

// 定义属性
var state = {
    footerIndex: 0,          //底栏当前下标
    cart_data: [],           //购物车数据
    totalPrice: 0,           //总金额
    //当前用户数据
    information:{
        username:'',                                //用户名
        headImgUrl:'../../../../static/img/logo.png',                              //头像
        name:'',                                    //昵称
        phoneNum:null,                              //手机号
        money:null,                                 //余额
        redPaper:null,                              //红包
        coupon:null,                                //优惠券
        integral:null                               //积分
    },
    password:[
        {username:'colin',password:123456}
    ],       
    allUser:[
        {
            username:'colin',                                //用户名
            headImgUrl:'../../../../static/img/logo.png',    //头像
            name:'张梓康',                                   //昵称
            phoneNum:13682503999,                           //手机号
            money:666.00,                                   //余额
            redPaper:3,                                     //红包
            coupon:6,                                       //优惠券
            integral:260  
        }
    ],
    login:{
        success:false,                              //登录成功
    },
    register:{
        success:false
    },
    news:{
        data:[
            {
                id:1,
                title:'物流消息',
                text:'内容内容内容内容内容内容',
                date:'06-21 18:00',
                img:'../../../../static/img/individual/2-16.png',
                chat:[
                    {
                        username:'colin',
                        isSeller:false,
                        text:'第一条聊天内容'
                    },
                    {
                        username:'colin',
                        isSeller:true,
                        text:'第二条聊天内容'
                    },
                    {
                        username:'colin',
                        isSeller:false,
                        text:'第三条聊天内容第三条聊天内容第三条聊天内容第三条聊天内容第三条聊天内容第三条聊天内容第三条聊天内容第三条聊天内容第三条聊天内容'
                    }
                ]
            },
            {
                id:2,
                title:'物流消息',
                text:'内容内容内容内容内容内容',
                date:'06-21 18:00',
                img:'../../../../static/img/individual/2-16.png'
            },
            {
                id:3,
                title:'物流消息',
                text:'内容内容内容内容内容内容',
                date:'06-21 18:00',
                img:'../../../../static/img/individual/2-16.png'
            },
            {
                id:4,
                title:'物流消息',
                text:'内容内容内容内容内容内容',
                date:'06-21 18:00',
                img:'../../../../static/img/individual/2-16.png'
            },
            {
                id:5,
                title:'物流消息',
                text:'内容内容内容内容内容内容',
                date:'06-21 18:00',
                img:'../../../../static/img/individual/2-16.png'
            }
        ]
    }   
}

// 定义getters
var getters = {
    footerIndex(state) {
        return state.footerIndex
    }
}

// // mutations,数据改变在此执行
// const mutations = {
//     INDEX_CHANGE(state, e) {
//         state.footerIndex = e;
//     },
//     SET_SHOPPING_CART(state, data) {
//         state.cart_data = data
//     },
//     SET_TOTAL_PRICE(state, data) {
//         state.totalPrice = data
//     }
// }

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})