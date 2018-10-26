// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import squall_basic from './lib/squall/js/squall_basic'
import "./lib/squall/css/squall_basic.css"
import "./lib/layui/layui-v2.3.0/layui.all.js"
import "./lib/layui/layui-v2.3.0/css/layui.css"
import "./lib/layui/layui-v2.3.0/css/layui.mobile.css"
//require("http://192.168.10.144:8515/js?list=base,tilelayer,heat")
//import "http://192.168.10.144:8515/js?list=base,tilelayer,heat"

Vue.config.productionTip = false
Vue.prototype.basic = squall_basic

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
