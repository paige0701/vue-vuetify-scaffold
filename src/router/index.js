import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Index'),
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard')
      },
      {
        path: 'best-sellers',
        name: 'BestSellers',
        component: () => import('@/views/books/BestSellers'),
      },
      {
        path: 'best-sellers/:id',
        name: 'BestSellerDetail',
        component: () => import('@/views/books/BestSellerDetail'),
        props: true,
      },
      {
        path: '/helper-classes',
        name: 'HelperClasses',
        component: () => import('../views/HelperClasses.vue')
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
    ]
  },
  {
    path: '/authentication',
    component: () => import(/* webpackChunkName: "views-authentication" */ '@/layouts/authentication/Index'),
    children: [
      {
        path: 'sign-up',
        name: 'SignUp',
        component: () => import(/* webpackChunkName: "views-authentication" */ '@/views/authentication/SignUp')
      },
      {
        path: 'sign-in',
        name: 'SignInMethods',
        component: () => import(/* webpackChunkName: "views-authentication" */ '@/views/authentication/SignInMethods')
      },
    ]
  },
  {
    path: '/page',
    component: () => import(/* webpackChunkName: "views-page" */ '@/layouts/page/Index'),
    children: [
      {
        path: 'product-list',
        name: 'ProductList',
        component: () => import(/* webpackChunkName: "views-product-list" */ '@/views/ProductList')
      },
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
