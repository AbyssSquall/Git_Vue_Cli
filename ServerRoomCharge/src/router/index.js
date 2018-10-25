import Vue from 'vue'
import Router from 'vue-router'
import StartPage from '@/components/StartPage'
import IOCheck from '@/components/IOCheck'
import Round from '@/components/Round'
import Air from '@/components/Air'
import Search from '@/components/Search'
import Login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/io',
      name: 'IOCheck',
      component: IOCheck
    },
    {
      path: '/ups',
      name: 'StartPage',
      //component: HelloWorld
      component: StartPage
    },
    {
      path: '/round',
      name: 'round',
      //component: HelloWorld
      component: Round
    },
    {
      path: '/air',
      name: 'air',
      //component: HelloWorld
      component: Air
    },
    {
      path: '/search',
      name: 'search',
      //component: HelloWorld
      component: Search
    },
    {
      path: '/',
      name: 'login',
      //component: HelloWorld
      component: Login
    },
  ]
})
