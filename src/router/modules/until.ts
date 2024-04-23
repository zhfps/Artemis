import { RouteRecordRaw } from 'vue-router'
//
const Layout = () => import('@/layout/index.vue')
//
const utilRoutes: RouteRecordRaw[] = [
    {
        path: '/util',
        redirect: '/util/index',
        name: 'FetchXml',
        component: Layout,
        children: [
          {
            path: 'index',
            name: 'FetchXmlPage',
            meta: {
              title: 'XML Parse',
              svgIcon: 'ContentPasteSearchRound'
            },
            component: () => import('@/views/utils/FetchXml.vue'),
          }
        ]
      },
]

export default utilRoutes