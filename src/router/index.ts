import { App } from 'vue'
import { RouteRecordRaw, createWebHashHistory, createRouter } from 'vue-router'
import sysRoutes from './modules/sys'
import ltcRoutes from './modules/ltc'
//

const Layout = () => import('@/layout/index.vue')
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
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      hidden: true
    },
    component: () => import('@/views/login/index.vue'),
  },
  ...ltcRoutes,
  ...sysRoutes
]
//
const router = createRouter({
  scrollBehavior() {
    return { top: 0 }
  },
  history: createWebHashHistory('/'),
  routes
})
//
export const userRouter = (app: App<Element>) => {
  app.use(router)
  return router
}


export default router