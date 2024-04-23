import { createApp } from 'vue'
//
import ElementPlus from 'element-plus'
//
import './styles/index.scss'
//
import App from './App.vue'
//
import router from './router'
//
import store from './store'
//
import '@/router/permission'
//
import '@/plugins/echarts'
import { loadVIcons } from './icons'
//
const app  = createApp(App)
// element
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
// 导入图标
loadVIcons(app)
// pinia
app.use(store)
//
app.use(router)
// mount
.mount('#app')
// 移除loading
.$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
})

