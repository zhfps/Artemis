import { createApp } from 'vue'
//
import { ipcRenderer } from 'electron'
//
import ElementPlus from 'element-plus'
//
import 'element-plus/dist/index.css'
//
import './styles/index.scss'
//
import App from './App.vue'
//
import { userRouter } from './router'

//
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//
import store from './store'

import '@/router/permission'
import { loadComponent } from './components'
import { loadVIcons } from './icons'
//
const app  = createApp(App)
//
const router = userRouter(app)
//
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
//
loadComponent(app)
loadVIcons(app)
//
app.use(store).mount('#app').$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
})
//根据菜单切换页面
if(window && window.process && window.process.type === 'renderer'){
  ipcRenderer.on('change-view',(el, url) =>{
    router.replace(url)
  })
}
