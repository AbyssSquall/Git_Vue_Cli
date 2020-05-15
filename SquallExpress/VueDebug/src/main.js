import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import qs from 'qs';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import '../static/css/icon.css';
import './components/common/directives';
import "babel-polyfill";
import VueResource from 'vue-resource';
import X2J from "fast-xml-parser";

import ms_http from './lib/squall/js/MS-http'
import tools from './lib/squall/js/tools'

//axios.defaults.withCredentials=true;
axios.defaults.crossDomain=true;

Vue.use(VueResource)
Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.prototype.xml = X2J;

Vue.prototype.mshttp = ms_http.squall_basic_http;
Vue.prototype.msdburl = ms_http.ms_DatabaseUrl;
Vue.prototype.mstools = tools;

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('ms_username');
    if(!role && to.path !== '/login'){
        next('/login');
    }else if(to.meta.permission){
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    }else{
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        }else{
            next();
        }
    }
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');