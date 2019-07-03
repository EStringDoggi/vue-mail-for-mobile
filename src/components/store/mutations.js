// mutations,数据改变在此执行
const mutations = {
    INDEX_CHANGE(state, index) {
        state.footerIndex = index;
    },
    // 添加聊天消息
    ADD_CHAT(state, data){
        let chat = {
            username:state.information.username,
            isSeller:false,
            text:data.text
        }
        data.chatArr.chat.push(chat)
        data.chatArr.text = data.text
        data.chatArr.date = data.date
        
        
    },
    // 更新消息栏的最新时间、消息显示
    // SET_NEW_CHAT(state, data){
    //     let date = data.date
    //     let text = data.text

    // },
    // 添加购物车
    ADD_SHOPPING_CART(state, data){
        state.cart_data.push(data)
        console.log('添加到购物车');
        console.log(state.cart_data);
        
        
    },
    // 加载购物车
    SET_SHOPPING_CART(state, data) {
        state.cart_data = data
        state.totalPrice = 0            //重置总额
    },
    // 总额
    SET_TOTAL_PRICE(state, data) {
        state.totalPrice = data
    },
    // 移除商品
    DEL_GOODS(state, data){
        let i = data.i
        let j = data.j
        state.cart_data[i].goods.splice(j,1)
        if(state.cart_data[i].goods.length <= 0){
            state.cart_data.splice(i,1)
        }
        console.log('del_goods');
    },
    // 添加订单
    ADD_ORDER(state, data){
        state.order = data
        console.log(state.order);
        
    },
    // 添加新用户
    ADD_INFORMATION(state, data){
        state.allUser.push(data)
        state.register.success = true
    },
    // 添加新用户密码
    ADD_PASSWORD(state, data){
        state.password.push(data)
    },
    // 登录
    SET_INFORMATION(state, data){
        state.information = data
        state.login.success = true
    },
    RESET_LOGIN_REGISTER(state){
        state.login.success = false
        state.register.success = false
    },
    // 登出
    LOGOUT(state){
        state.information = {
            username:'',                                //用户名
            headImgUrl:'',                              //头像
            name:'',                                    //昵称
            phoneNum:null,                              //手机号
            money:null,                                 //余额
            redPaper:null,                              //红包
            coupon:null,                                //优惠券
            integral:null,                              //积分
            address:[]
        }
        state.login.success = false
    }
}

export default mutations