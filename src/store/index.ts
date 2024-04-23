import { createPersistedState } from '@/plugins/pinia'
import { createPinia } from 'pinia'
import localStore from './db'

const store = createPinia()
store.use(createPersistedState({
    key: id => `$_gb_${id}`,
    storage: {
      getItem: (key: string) => localStore.getItem(key),
      setItem: (key: string, value: string) => localStore.setItem(key,value)
    },
    debug: true
  }))
export default store
