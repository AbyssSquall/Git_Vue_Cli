import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
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
    // {
    //   path: '/basegraph',
    //   name: 'BaseGraph',
    //   component: BaseGraph
    // },
    // {
    //   path: '/heatmap',
    //   name: 'HeatMap',
    //   component: HeatMap
    // },
    // {
    //   path: '/map',
    //   name: 'Map',
    //   component: Map
    // },
    // {
    //   path: '/personal',
    //   name: 'Personal',
    //   component: Personal
    // },
    {
      path: '*',
      name: 'err',
      component: err
    },
  ]
})
