import { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layout/index.vue')

const ltcRoutes: RouteRecordRaw[]  = [
    {
        path: '/ltc',
        name: 'LTC',
        meta: {
          title: '订单',
          svgIcon: 'icon-MenuOutlined'
        },
        redirect: '/ltc/lock',
        component: Layout,
        children: [
          {
            path: '/lock',
            name: 'QuotationLock',
            meta: {
              title: '锁货详情',
              hidden: false,
              svgIcon: 'icon-LockOutlined'
            },
            component: () => import('@/views/ltc/quotation/lock.vue'),
          },
          {
            path: '/lock_group',
            name: 'QuotationLockGroup',
            meta: {
              title: '产品锁货',
              hidden: false,
              svgIcon: 'icon-LockOutlined'
            },
            component: () => import('@/views/ltc/quotation/LockGroup.vue'),
          },
        ]
      }
]


export default ltcRoutes