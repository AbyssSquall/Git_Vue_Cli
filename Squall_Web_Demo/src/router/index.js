import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Car from '@/components/Car'
import Map from '@/components/Map'
import Personal from '@/components/Personal'
import err from '@/components/err'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/car',
      name: 'Car',
      component: Car
    },
    {
      path: '/map',
      name: 'Map',
      component: Map
    },
    {
      path: '/personal',
      name: 'Personal',
      component: Personal
    },
    {
      path: '*',
      name: 'err',
      component: err
    },
  ]
})
