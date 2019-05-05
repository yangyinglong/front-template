import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
  // 全局变量
  state: {
    userId: '',
    userName: '登录',
    phone: '',
    loginStatus: 0,
    createTime: ''
  },
  getters: {
    userName (state) {
      return state.userName
    },
    phone (state) {
      return state.phone
    },
    loginStatus (state) {
      return state.loginStatus
    }
  },
  // 修改全局变量必须通过mutations中的方法
  // mutations只能采用同步方法
  mutations: {
    login (state, loginFormData) {
      state.userId = loginFormData.userId
      state.userName = loginFormData.userName
      state.phone = loginFormData.phone
      state.loginStatus = loginFormData.status
      state.createTime = loginFormData.createTime
    },
    logout (state) {
      state.userId = ''
      state.userName = '登录'
      state.phone = ''
      state.loginStatus = 0
      state.createTime = ''
    }
  },
  // 异步方法用actions
  // actions不能直接修改全局变量，需要调用commit方法来触发mutation中的方法
  actions: {
    login(context, payload) {
      context.commit('login', payload)
    },
    logout(context) {
      context.commit('logout')
    }
  }
})

export default store