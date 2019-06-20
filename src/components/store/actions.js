const actions = {
    // footer下标改变
    IndexChange({
        commit,
        state
    }) {
        commit('INDEX_CHANGE')
    },
    // 加载购物车
    loadShoppingCart({
        commit
    }) {
        // 仿ajax请求，拿到数据填充到仓库
        const data = [
            {
                seller: {
                    name: 'xxxx旗舰店',
                },
                goods: [
                    {
                        imgUrl: '../../../static/img/goodsList/item-show-1.jpg',
                        goodsName: '商品名称名称名称名称',
                        goodsPrice: 4999,
                        tag: ['全网通', '8G+256G'],
                        selectNum: 1,                    //购买数量
                        isSelect: false,                  //是否选中
                    },
                    {
                        imgUrl: '../../../static/img/goodsList/item-show-2.jpg',
                        goodsName: '商品名称名称名称名称',
                        goodsPrice: 3999,
                        tag: ['全网通', '8G+256G'],
                        selectNum: 2,                    //购买数量
                        isSelect: false,                  //是否选中
                    },
                    {
                        imgUrl: '../../../static/img/goodsList/item-show-3.jpg',
                        goodsName: '商品名称名称名称名称',
                        goodsPrice: 5499,
                        tag: ['全网通', '8G+256G'],
                        selectNum: 1,                    //购买数量
                        isSelect: false,                  //是否选中
                    }
                ]
            },
            {
                seller: {
                    name: 'xxxx旗舰店',
                },
                goods: [
                    {
                        imgUrl: '../../../static/img/goodsList/item-show-4.jpg',
                        goodsName: '商品名称名称名称名称',
                        goodsPrice: 4999,
                        tag: ['全网通', '8G+256G'],
                        selectNum: 1,                    //购买数量
                        isSelect: false,                  //是否选中
                    }
                ]
            }
        ]
        commit('SET_SHOPPING_CART', data)
    },
    handleChange({ commit, state }) {
        let temp = 0
        // 遍历data
        state.cart_data.forEach(item => {
            item.goods.forEach(item => {
                // 单价与数量积的相加
                if (item.isSelect) {
                    temp += item.selectNum * item.goodsPrice
                }
            })
        })
        commit('SET_TOTAL_PRICE', temp)

    },
    selectChange({ commit, state, dispatch }, data) {
        let isAllInSelect = true                    //当前组的全选按钮是否显示
        let e = data.e
        let index = data.index
        let item = data.item

        item.goods[index].isSelect = !item.goods[index].isSelect
        item.goods.forEach(item => {
            if (!item.isSelect) {
                isAllInSelect = false
            }
        })
        if (isAllInSelect) {
            let param = {
                type: 1,
                e,
                display: 'block'
            }
            return dispatch('btnShow', param).then(() => {
                return dispatch('handleChange')
            })
        } else {
            let param = {
                type: 1,
                e,
                display: 'none'
            }
            return dispatch('btnShow', param).then(() => {
                // 计算总额
                return dispatch('handleChange')
            })
        }
    },
    selectChangeAll({ commit, state, dispatch }, data) {
        let arr = data.arr
        let e = data.e
        let all = data.all

        if (all) {
            console.log('全选');
            let btnArr = document.querySelectorAll('.select-btn')
            let btnTitle = document.querySelectorAll('.title-select')
            let isSelect = false
            btnArr.forEach(item => {
                if (item.querySelector('i').style.display == 'none') {
                    isSelect = true
                }
            })
            if (isSelect) {
                btnTitle.forEach(item => {
                    item.querySelector('i').style.display = 'block'
                })
                // 全选按钮勾选
                let param = {
                    type: 3,
                    e: null,
                    display: 'block'
                }
                return dispatch('btnShow', param).then(() => {
                    // 所有按钮显示
                    // this.btnShow(2,null,true)
                    let param = {
                        type: 2,
                        e: null,
                        display: true
                    }
                    return dispatch('btnShow', param)
                })
            } else {
                btnTitle.forEach(item => {
                    item.querySelector('i').style.display = 'none'
                })
                // 全选按钮取消勾选
                let param = {
                    type: 3,
                    e: null,
                    display: 'none'
                }
                return dispatch('btnShow', param).then(() => {
                    // 所有按钮隐藏                    
                    let param = {
                        type: 2,
                        e: null,
                        display: false
                    }
                    return dispatch('btnShow', param)
                })

            }
        } else {
            let allInSelect = null             //是否全选
            let arrNum = arr.goods.length
            let icon = e.currentTarget.querySelector('i')
            let num = 0
            arr.goods.forEach(item => {
                if (item.isSelect == true) {
                    num++
                }
            });
            if (num == arrNum) {
                allInSelect = false
                icon.style.display = 'none'
            } else {
                allInSelect = true
                icon.style.display = 'block'

            }
            arr.goods.forEach(item => {
                item.isSelect = allInSelect
            })
        }
        // 计算总额
        return dispatch('handleChange')
    },
    // 控制显示
    btnShow({ commit, state }, param) {
        let i = param.type
        let e = param.e
        let display = param.display
        switch (i) {
            // 改变当前按钮的title按钮的显隐
            case 1:
                let selectAllBtn = e.currentTarget.parentNode.parentNode.parentNode.parentNode.querySelector('.title i')
                selectAllBtn.style.display = display
                break;
            // 改变所有按钮的显隐
            case 2:
                let itemArr = state.cart_data
                itemArr.forEach(item => {
                    item.goods.forEach(item => {
                        item.isSelect = display
                    })
                })
                break;
            // 改变selectall按钮的显隐
            case 3:
                let btnAll = document.querySelector('.all-select i')
                btnAll.style.display = display

                break;
            default:
                break;
        }
    },
    loadInformation({ commit, state }, data) {
        // let { username, password, state } = data
        let username = data.username
        let password = data.password
        let _state = data.state

        if (_state == 'register') {
            //注册，添加用户信息
            let information = {
                username,
                headImgUrl: '../../../../static/img/logo.png',               //头像
                name: '新用户',                                              //昵称
                phoneNum: null,                                              //手机号
                money: null,                                                 //余额
                redPaper: null,                                              //红包
                coupon: null,                                                //优惠券
                integral: null                                               //积分
            }
            let u_password = {
                username,
                password
            }
            commit('ADD_INFORMATION', information);
            commit('ADD_PASSWORD', u_password);
        } else if (_state == 'login') {
            console.log("登录");
            
            //登录，根据用户名添加用户信息
            state.password.forEach(item => {
                if(item.username == username){
                    if(item.password == password){
                        let _data = {}
                        // 在所有用户中查找对应用户
                        state.allUser.forEach(item => {
                            if(item.username = username){
                                _data = item
                                console.log('登录成功');
                                commit('SET_INFORMATION',_data)
                                
                            }
                        })
                        return;
                    }else{
                        alert('用户名密码不一致')
                    }
                }else{
                    alert('用户名不存在')
                }
            })
        }



    },
    // ========================测试=========================
    test1({ commit, state, dispatch }, param1) {
        console.log(param1);
    },
    test2() {

    }
}
export default actions