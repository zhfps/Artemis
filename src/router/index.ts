import { RouteRecordRaw, createWebHashHistory, createRouter } from 'vue-router'
import utilRoutes from './modules/until'
//
const Layout = () => import('@/layout/index.vue')
//
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    name: 'Root',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: {
          title: '首页',
          elIcon: 'House'
        },
        component: () => import('@/views/Home.vue'),
      }
    ]
  },
  ...utilRoutes
]
//
const router = createRouter({
  scrollBehavior() {
    return { top: 0 }
  },
  history: createWebHashHistory('/'),
  routes
})

export default router