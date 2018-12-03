import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Map from '@/components/Map'
import Personal from '@/components/Personal'
import OfficialCar from '@/components/OfficialCar'
import ProductCar from '@/components/ProductCar'
import HandleApplication from '@/components/HandleApplication'
import History from '@/components/History'
import Return from '@/components/Return'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
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
      path: '/OfficialCar',
      name: 'OfficialCar',
      component: OfficialCar
    },
    {
      path: '/ProductCar',
      name: 'ProductCar',
      component: ProductCar
    },
    {
      path: '/HandleApplication',
      name: 'HandleApplication',
      component: HandleApplication
    },
    {
      path: '/History',
      name: 'History',
      component: History
    },
    {
      path: '/Return',
      name: 'Return',
      component: Return
    },
  ]
})
