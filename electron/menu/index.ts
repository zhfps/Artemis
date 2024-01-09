import { MenuItemConstructorOptions } from 'electron'

// 菜单栏模板
const menus: MenuItemConstructorOptions[] = [
    {
        label: '选择(V)',
        submenu: [
          {
              label: '全屏',
              role: 'togglefullscreen'
          },
          {
            label: '开发者工具',
            role: 'toggleDevTools'
          },
       
          {
            label: '重新加载',
            role: 'reload'
          },
          {
            label: '退出',
            role: 'quit'
          }
        ]
      },
    {
      label: '帮助(H)',
      submenu: [
        {
            label: '全屏',
            role: 'togglefullscreen'
        },
        {
          label: '开发者工具',
          role: 'toggleDevTools'
        },
     
        {
          label: '重新加载',
          role: 'reload'
        },
        {
          label: '退出',
          role: 'quit'
        }
      ]
    }
  ]

 export default menus