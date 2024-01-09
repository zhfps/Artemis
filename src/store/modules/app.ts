import { ref } from 'vue'
import { defineStore } from 'pinia'
import store from '@/store'

export const useApp = defineStore('app', () => {
    
  const token = ref('')
  const name = ref('')
  const setToken = (value: string) => {
    token.value = value
    sessionStorage.setItem('token',value)
  }  
  const setName = (value: string) => {
    name.value = value
  }
  return { token,name,setToken,setName }
})

/** 在 setup 外使用 */
export function useStoreApp() {
  return useApp(store)
}