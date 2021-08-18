import Vue from 'vue'
import VueRouter from 'vue-router'
import DefaultLayout from '@/layouts/default/Index'
import AuthenticationLayout from '@/layouts/authentication/Index'
import PageLayout from '@/layouts/page/Index'
import Dashboard from '@/views/Dashboard'
import HelperClasses from "@/views/HelperClasses";
import Typography from "@/views/Typography";
import ProductList from "@/views/page/ProductList";
import SignUp from "@/views/Authentication/SignUp";
import SignIn from "@/views/Authentication/SignIn";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
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
  },
  {
    path: '/authentication',
    component: AuthenticationLayout,
    children: [
      {
        path: 'sign-up',
        name: 'SignUp',
        component: SignUp
      },
      {
        path: 'sign-in',
        name: 'SignIn',
        component: SignIn
      },
    ]
  },
  {
    path: '/page',
    component: PageLayout,
    children: [
      {
        path: 'product-list',
        name: 'ProductList',
        component: ProductList
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
