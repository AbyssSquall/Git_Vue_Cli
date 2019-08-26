// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import './components/common/directives';
import 'babel-polyfill';

import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(ElementUI);
Vue.use(VueI18n);
//Vue.use(Element, { size: 'small', zIndex: 3000 });

import "./lib/layui/layui-v2.3.0/css/layui.css"
//import "./lib/leaflet/leaflet.css"
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/icon.css';

import "./lib/squall/css/squall_basic.css"
import "./lib/squall/css/squall_web.css"
import squall_basic from './lib/squall/js/squall_basic'
import squall_global from './lib/squall/js/squall_global'
import squall_show from './lib/squall/js/squall_show'


Vue.use(ElementUI, {
  size: 'small'
});
const i18n = new VueI18n({
  locale: 'zh',
  messages
});

Vue.config.productionTip = false
Vue.prototype.basic = squall_basic
Vue.prototype.Global = squall_global
Vue.prototype.Show = squall_show

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | 借车管理系统`;
  const role = localStorage.getItem('ms_username');

  console.log(to.path);

  if (!role && (to.path == '/login' || to.path =="/webpage")) {
      next('/login');
  } else if (to.meta.permission) {
      // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
      role === 'admin' ? next() : next('/403');
  } else {
      // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
      if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
          Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
              confirmButtonText: '确定'
          });
      } else {
          next();
      }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>',
  render:h=>h(App)
})
