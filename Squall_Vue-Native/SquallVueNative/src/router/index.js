import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import err from '@/components/err'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      name: 'err',
      component: err
    },
  ]
})
