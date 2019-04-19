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
      path: '/web',
      name: 'Web',
      component: Web
    },
    {
      path: '/map',
      name: 'Map',
      component: Map
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
    {
      path: '/Regist',
      name: 'Regist',
      component: Regist
    },
    {
      path: '/Output',
      name: 'Output',
      component: Output
    },
    {
      path: '/Tips',
      name: 'Tips',
      component: Tips
    },
    {
      path: '/form',
      name: 'Form',
      component: Form
    },
    {
      path: '*',
      name: 'Error',
      component: Err
    },
  ]
})
