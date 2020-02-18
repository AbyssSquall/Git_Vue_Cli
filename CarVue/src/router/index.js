import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Web from '@/components/Web'
import OfficialCar from '@/components/OfficialCar'
import ProductCar from '@/components/ProductCar'
import HandleApplication from '@/components/HandleApplication'
import History from '@/components/History'
import Return from '@/components/Return'
import Regist from '@/components/regist'
import Output from '@/components/Output'
import Tips from '@/components/Tips'
import Err from '@/components/Error'
import Form from '@/components/ApplicationForm'
import Search from '@/components/Search'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: { title: '借车首页' },
      component: Home
    },
    {
      path: '/web',
      name: 'Web',
      meta: { title: '网页' },
      component: Web
    },
    {
      path: '/map',
      name: 'Map',
      meta: { title: '底图' },
      component: Map
    },
    {
      path: '/OfficialCar',
      name: 'OfficialCar',
      meta: { title: '经营用车' },
      component: OfficialCar
    },
    {
      path: '/ProductCar',
      name: 'ProductCar',
      meta: { title: '生产用车' },
      component: ProductCar
    },
    {
      path: '/HandleApplication',
      name: 'HandleApplication',
      meta: { title: '申请审核' },
      component: HandleApplication
    },
    {
      path: '/History',
      name: 'History',
      meta: { title: '历史记录' },
      component: History
    },
    {
      path: '/Return',
      name: 'Return',
      meta: { title: '用车归还' },
      component: Return
    },
    {
      path: '/Regist',
      name: 'Regist',
      meta: { title: '注册' },
      component: Regist
    },
    {
      path: '/Output',
      name: 'Output',
      meta: { title: '导出' },
      component: Output
    },
    {
      path: '/Tips',
      name: 'Tips',
      meta: { title: '用车派遣' },
      component: Tips
    },
    {
      path: '/form',
      name: 'Form',
      meta: { title: '表格' },
      component: Form
    },
    // {
    //   path: '/search',
    //   name: 'Search',
    //   component: Search
    // },
    {
      path: '*',
      name: 'Error',
      meta: { title: '404' },
      component: Err
    },
    {
        path: '/search',
        redirect: '/dashboard'
    },
    {
        path: '/webpage',
        component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
        meta: { title: '自述文件' },
        children: [
            {
                path: '/dashboard',
                component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                meta: { title: '系统首页', tag:"web" }
            },
            {
                path: '/searchtable_product',
                component: () => import(/* webpackChunkName: "searchtable" */ '../components/page/SearchTableProduct.vue'),
                meta: { title: '生产车辆查询', tag:"web" }
            },
            {
                path: '/searchtable_official',
                component: () => import(/* webpackChunkName: "searchtable" */ '../components/page/SearchTableOfficial.vue'),
                meta: { title: '经营车辆查询', tag:"web" }
            },
            {
                path: '/table',
                component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                meta: { title: '基础表格', tag:"web" }
            },
            {
                path: '/tabs',
                component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                meta: { title: 'tab选项卡', tag:"web" }
            },
            {
                path: '/form',
                component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                meta: { title: '基本表单', tag:"web" }
            },
            {
                // 富文本编辑器组件
                path: '/editor',
                component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                meta: { title: '富文本编辑器', tag:"web" }
            },
            {
                // markdown组件
                path: '/markdown',
                component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                meta: { title: 'markdown编辑器', tag:"web" }
            },
            {
                // 图片上传组件
                path: '/upload',
                component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                meta: { title: '文件上传', tag:"web" }
            },
            {
                // vue-schart组件
                path: '/charts',
                component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                meta: { title: 'schart图表', tag:"web" }
            },
            {
                // 拖拽列表组件
                path: '/drag',
                component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                meta: { title: '拖拽列表', tag:"web" }
            },
            {
                // 拖拽Dialog组件
                path: '/dialog',
                component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                meta: { title: '拖拽弹框', tag:"web" }
            },
            {
                // 国际化组件
                path: '/i18n',
                component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                meta: { title: '国际化', tag:"web" }
            },
            {
                // 权限页面
                path: '/permission',
                component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                meta: { title: '权限测试', permission: true, tag:"web" }
            },
            {
                path: '/404',
                component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                meta: { title: '404', tag:"web" }
            },
            {
                path: '/403',
                component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                meta: { title: '403', tag:"web" }
            },
            {
                path: '/donate',
                component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                meta: { title: '支持作者', tag:"web" }
            }
        ]
    },
    {
        path: '/login',
        component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
        meta: { title: '登录', tag:"web" }
    },
    {
        path: '*',
        redirect: '/404'
    }
  ]
})
