// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import squall_basic from './lib/squall/js/squall_basic'
import "./lib/squall/css/squall_basic.css"

import 'leaflet.locatecontrol/dist/L.Control.Locate.css'
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css'
import "./lib/leaflet/leaflet.css"
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.basic = squall_basic;
Vue.prototype.global = {};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
