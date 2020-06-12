import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '../../store/store.js'
import axios from '../../util/axios.js'
import  '../../util/rem.js'
import AppUi from '../../util/AppUi.js'
import   '../../util/mixin'
import "../../assets/base.css"
import 'url-search-params-polyfill';
import fastclick from 'fastclick'

import Vant from 'vant';
import 'vant/lib/index.css';
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import pushApp from "../../util/pushApp"
window.pushApp = pushApp

Vue.use(Vant);
Vue.use(AppUi)
fastclick.attach(document.body)
window.$backState = false
Vue.prototype.$back = window.$back =  () => {
  window.$backState = true
  window.history.go(-1)
}

Vue.prototype.Http = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
