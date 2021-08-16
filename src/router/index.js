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
    path: '/typography',
    name: 'Typography',
    component: () => import('../views/Typography.vue')
  },
  {
    path: '/breakpoints',
    name: 'Breakpoints',
    component: () => import('../views/Breakpoints.vue')
  },
  {
    path: '/grid-list-page',
    name: 'GridListPage',
    component: () => import('../views/GridListPage.vue')
  },
  {
    path: '/grid-system',
    name: 'GridSystem',
    component: () => import('../views/GridSystem.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/profile/:id',
    name: 'ProfileDetail',
    component: () => import('../views/ProfileDetail.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
