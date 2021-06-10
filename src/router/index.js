import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/swiper',
    name: 'Swiper',
    component: () => import('../views/Swiper.vue')
  },
  {
    path: '/timePicker',
    name: 'timePicker',
    component: () => import('../views/timePicker.vue')
  },
  {
    path: '/weekTime',
    name: 'weekTime',
    component: () => import('../views/weekTime.vue')
  },
  {
    path: '/region',
    name: 'region',
    component: () => import('../views/region.vue')
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('../views/map.vue')
  },
  {
    path: '/tagCanvas',
    name: 'tagCanvas',
    component: () => import('../views/tagCanvas.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
