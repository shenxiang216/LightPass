/*
 * @Author: Deep Lane
 * @Date: 2022-01-13 15:56:07
 * @LastEditors: Deep Lane
 * @LastEditTime: 2022-02-23 18:38:09
 * @Description: 
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Top.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "todos" */ '../views/About.vue'),
  },
 
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
