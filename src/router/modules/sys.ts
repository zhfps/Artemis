import { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layout/index.vue')

const sysRoutes: RouteRecordRaw[]  = [
    {
        path: '/sys',
        name: 'Util',
        meta: {
          title: '工具',
          elIcon: 'icon-ContentPasteSearchRound'
        },
        redirect: '/s/ni',
        component: Layout,
        children: [
          {
            path: '/excel',
            name: 'excel',
            meta: {
              title: 'excel解析',
              hidden: true,
              elIcon: 'Files'
            },
            component: () => import('@/views/Excel.vue'),
          },
          {
            path: '/ni',
            name: 'ni',
            meta: {
              title: '价格查询',
              elIcon: 'icon-ContentPasteSearchRound'
            },
            component: () => import('@/views/Ni.vue'),
          },
          {
            path: '/license',
            name: 'License',
            meta: {
              title: 'license导入',
              hidden: true,
              elIcon: 'icon-ContentPasteSearchRound'
            },
            component: () => import('@/views/license/index.vue'),
          },
          {
            path: '/product',
            name: 'product',
            meta: {
              title: '产品折扣更新',
              hidden: true,
              elIcon: 'icon-ContentPasteSearchRound'
            },
            component: () => import('@/views/product/index.vue'),
          },
          {
            path: '/log',
            name: 'ChangeLog',
            meta: {
              title: '操作日志',
              elIcon: 'icon-DocumentScannerOutlined'
            },
            component: () => import('@/views/logs/index.vue'),
          }
        ]
      }
]


export default sysRoutes