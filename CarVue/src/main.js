// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'

import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(ElementUI);
//Vue.use(Element, { size: 'small', zIndex: 3000 });

//import "./lib/layui/layui-v2.3.0/css/layui.css"
import "./lib/leaflet/leaflet.css"
import 'element-ui/lib/theme-chalk/index.css';

import "./lib/squall/css/squall_basic.css"
import squall_basic from './lib/squall/js/squall_basic'
import squall_global from './lib/squall/js/squall_global'
import squall_show from './lib/squall/js/squall_show'



Vue.config.productionTip = false
Vue.prototype.basic = squall_basic
Vue.prototype.Global = squall_global
Vue.prototype.Show = squall_show

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render:h=>h(App)
})
