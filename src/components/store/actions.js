const actions = {
    // footer下标改变
    IndexChange({
        commit,
        state
    }, index) {
        commit('INDEX_CHANGE', index)
    },
    // 消息
    // 添加消息记录
    addChat({ commit, state }, data) {
        let id = data.id
        let text = data.text
        let chatArr = null
        let _data = null
        let date = data.date
        state.news.data.forEach(item => {
            if (item.id == id) {
                chatArr = item
            }
        })
        _data = {
            text,
            chatArr,
            date
        }
        commit('ADD_CHAT', _data)
    },
    // 商品加入购物车
    addShoppingCart({ commit }, data) {
        commit('ADD_SHOPPING_CART', data.data)
    },
    // 加载购物车
    loadShoppingCart({
        commit,
        state
    }) {
        if (state.cart_data.length > 0) {
            return;
        } else {

            // 仿ajax请求，拿到数据填充到仓库
            const data = [
                {
                    seller: {
                        name: 'aaa旗舰店',
                    },
                    goods: [
                        {
                            imgUrl: '../../../static/img/goodsList/item-show-1.jpg',
                            goodsName: '商品名称1',
                            goodsPrice: 4999,
                            tag: ['全网通', '8G+256G'],
                            selectNum: 1,                    //购买数量
                            isSelect: false,                  //是否选中
                        },
                        {
                            imgUrl: '../../../static/img/goodsList/item-show-2.jpg',
                            goodsName: '商品名称2',
                            goodsPrice: 3999,
                            tag: ['全网通', '8G+256G'],
                            selectNum: 2,                    //购买数量
                            isSelect: false,                  //是否选中
                        },
                        {
                            imgUrl: '../../../static/img/goodsList/item-show-3.jpg',
                            goodsName: '商品名称3',
                            goodsPrice: 5499,
                            tag: ['全网通', '8G+256G'],
                            selectNum: 1,                    //购买数量
                            isSelect: false,                  //是否选中
                        }
                    ]
                },
                {
                    seller: {
                        name: 'bbb旗舰店',
                    },
                    goods: [
                        {
                            imgUrl: '../../../static/img/goodsList/item-show-4.jpg',
                            goodsName: '商品名称4',
                            goodsPrice: 4999,
                            tag: ['全网通', '8G+256G'],
                            selectNum: 1,                    //购买数量
                            isSelect: false,                  //是否选中
                        }
                    ]
                }
            ]
            commit('SET_SHOPPING_CART', data)
        }
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
    // 购物车商品选择
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
            dispatch('btnShow', param)
        } else {
            let param = {
                type: 1,
                e,
                display: 'none'
            }
            dispatch('btnShow', param)
        }
        // 计算总额
        dispatch('handleChange')
    },
    // 购物车商品全选
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

                    // return dispatch('btnShow', param)
                    dispatch('btnShow', param)
                    dispatch('handleChange')
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

                    // return dispatch('btnShow', param)
                    dispatch('btnShow', param)
                    dispatch('handleChange')
                })

            }
            // arr.goods.forEach(item => {
            //     item.isSelect = allInSelect
            // })
        } else {
            let allInSelect = null             //是否全选
            let arrNum = arr.goods.length
            let icon = e.currentTarget.querySelector('i')
            let num = 0                        //商品计数
            arr.goods.forEach(item => {
                if (item.isSelect == true) {
                    num++
                }
            });
            // 根据计数结果与总数对比判断是否全选
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
    del_goods({commit,state},data){
        // let {i,j} = data
        commit('DEL_GOODS',data)
    },
    // 添加订单信息
    addOrder({ commit, state }, data = null) {
        let _data = []
        // console.log(data);
        if (data) {
            _data.push(data.data)
        } else {
            // cart_data 数组
            state.cart_data.forEach(item => {
                let temp = {
                    seller: {name:null},
                    goods: []
                }       //当前选中商品及其卖家
                let seller = item.seller.name
                item.goods.forEach(goods => {
                    // 如果有商品被选中，则seller不为空
                    if (goods.isSelect) {
                        temp.seller.name = seller
                        temp.goods.push(goods)
                    }
                })
                // 有seller说明有商品被选中
                if (temp.seller.name) {
                    _data.push(temp)
                }
            })
            // console.log(data);
        }
        commit('ADD_ORDER', _data)

    },
    // 加载用户信息
    loadInformation({ commit, state }, data) {
        // let { username, password, state } = data
        let username = data.username
        let password = data.password
        let _state = data.state
        let findUser = false


        if (_state == 'register') {
            //判断新用户重名
            state.password.forEach(item => {
                if (item.username == username) {
                    findUser = true
                    alert('用户名已存在')
                }
            })
            if (findUser) {
                return;
            }
            //注册，添加用户信息
            let information = {
                username,
                headImgUrl: '../../../../static/img/logo.png',               //头像
                name: username,                                              //昵称
                phoneNum: null,                                              //手机号
                money: 0.00,                                                 //余额
                redPaper: 0,                                              //红包
                coupon: 0,                                                //优惠券
                integral: 0,                                               //积分
                address: []
            }
            let u_password = {
                username,
                password
            }
            commit('ADD_INFORMATION', information);
            commit('ADD_PASSWORD', u_password);
            alert('注册成功')

        } else if (_state == 'login') {
            console.log("登录");

            //登录，根据用户名添加用户信息
            state.password.forEach(item => {
                if (item.username == username) {
                    findUser = true
                    if (item.password == password) {
                        let _data = {}
                        // 在所有用户中查找对应用户
                        state.allUser.forEach(item => {
                            if (item.username = username) {
                                _data = item
                                console.log('登录成功');
                                commit('SET_INFORMATION', _data)
                                return false;
                            }
                        })
                    } else {
                        alert('用户名密码不一致')
                        return false;
                    }
                }
            })
            if (!findUser) {
                console.log('用户名不存在');
            }
        }



    },
    // 登出
    logout({ commit }) {
        commit('LOGOUT')
    },
    reset({ commit }) {
        commit('RESET_LOGIN_REGISTER')
    },
    // ========================测试=========================
    test1({ commit, state, dispatch }, param1) {
        console.log(param1);
    },
    test2() {

    }
}
export default actions