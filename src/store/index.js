import Vue from 'vue'
import Vuex from 'vuex'

// 安装插件
Vue.use(Vuex)

// 创建Store对象，导出并挂载在Vue实例上
export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    // mutations惟一的目的就是修改state中的状态
    // 每个方法的功能尽可能单一，具有多个功能的方法建议放到actions里面
    addCounter(state, payLoad) {
      payLoad.count++
    },
    addToCart(state, payLoad) {
      payLoad.checked = true
      state.cartList.push(payLoad)
    }
  },
  actions: {
    addCart(context, payLoad) {
      return new Promise((resolve, reject) => {
         // payload为添加进去的商品
      // 查找商品是否已存在购物车
      let oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid)
      if (oldProduct) {
        // 如果存在，counter+1
        // oldProduct.count += 1
        context.commit('addCounter', oldProduct)
        resolve('当前的商品数量+1')
      } else {
        // 如果不存在，添加到购物车
        payLoad.count = 1
        // context.state.cartList.push(payLoad)
        context.commit('addToCart', payLoad)
        resolve('已加入购物车')
      }
      })
    }
  },
  modules: {}
})
