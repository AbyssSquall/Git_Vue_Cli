// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import squall_basic from './lib/squall/js/squall_basic'
import "./lib/squall/css/squall_basic.css"

//import './lib/leaflet/leaflet.js'
import "./lib/leaflet/leaflet.css"
//import './lib/proj4leaflet/proj4.js'
//import './lib/proj4leaflet/proj4leaflet.js'

Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.basic = squall_basic

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
