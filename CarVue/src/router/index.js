import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Car from '@/components/Car'
import Map from '@/components/Map'
import Personal from '@/components/Personal'
import OfficialCar from '@/components/OfficialCar'
import ProductCar from '@/components/ProductCar'
import HandleApplication from '@/components/HandleApplication'

Vue.use(Router)

export default new Router({
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
  ]
})
