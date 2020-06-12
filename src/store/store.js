import Vue from 'vue'
import Vuex from 'vuex'
import * as $storage from './localStorage.js'

const state = {
  // 用户信息
  app_user : $storage.getApp_user,
  // 菜单模块
  app_module : $storage.getApp_module,
  // 登录角色
  app_role : $storage.getApp_role,
  // token
  app_token : $storage.getApp_token
}

const getters = {
  app_user:state => state.app_user,
  app_module:state => state.app_module,
  app_role:state => state.app_role,
  app_token:state => state.app_token

}

const mutations = {
  ['SET_APP_USER'](state, data) {
    state.app_user = data 
  },
  ['SET_APP_MODULE'](state, data) {
    state.app_module = data 
  },
  ['SET_APP_ROLE'](state, data) {
    state.app_role = data 
  },
  ['SET_APP_TOKEN'](state, data) {
    state.app_token = data 
  }
}
const actions = {
 set_app_user: function ({commit}, data) {
   $storage.setApp_user(data)
   commit('SET_APP_USER', data)
 },

 set_app_module: function ({commit}, data) {
   $storage.setApp_module(data)
   commit('SET_APP_MODULE', data)
 },

 set_app_role: function ({commit}, data) {
   $storage.setApp_role(data)
   commit('SET_APP_ROLE', data)
 },

 set_app_token: function ({commit}, data) {
   $storage.setApp_token(data)
   commit('SET_APP_TOKEN', data)
 }
}
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: false,
  plugins: debug ? [createLogger()] : []
})