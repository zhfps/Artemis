/**
 *
 * cache
 * @returns
 */

import Store from 'electron-store'
//
export default class Cache {
    //
    private static instance: Cache
    //
    private store: Store | null
  
    private constructor() {
      this.store = new Store()
    }
  
    static getInstance(): Cache {
      if (!Cache.instance) {
        Cache.instance = new Cache()
      }
      return Cache.instance
    }
    getValue(key: string) {
        return this.store?.get(key)
    }
    setValue<T>(key: string, value: T) {
       this.store?.set(key, value)
    }
    has(key: string) {
        return this.store?.has(key)
    }
    clear() {
        this.store?.clear()
    }
    remove(key: string) {
        this.store?.delete(key)
    }
}
