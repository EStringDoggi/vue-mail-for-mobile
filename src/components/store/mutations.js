// mutations,数据改变在此执行
const mutations = {
    INDEX_CHANGE(state, index) {
        state.footerIndex = index;
    },
    SET_SHOPPING_CART(state, data) {
        state.cart_data = data
        state.totalPrice = 0            //重置总额
    },
    SET_TOTAL_PRICE(state, data) {
        state.totalPrice = data
    }
}

export default mutations