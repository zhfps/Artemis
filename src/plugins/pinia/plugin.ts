import type {
  PiniaPlugin,
  PiniaPluginContext,
  StateTree,
  Store,
  SubscriptionCallbackMutation,
} from 'pinia'

import { normalizeOptions } from './normalize'
import { pick } from './pick'
import {
  type PersistedStateFactoryOptions,
  type PersistedStateOptions,
  type Serializer,
  type StorageLike,
} from './types'

interface Persistence {
  storage?: StorageLike
  serializer: Serializer
  key: string
  paths: string[] | null
  debug: boolean
  beforeRestore?: (c: PiniaPluginContext) => void
  afterRestore?: (c: PiniaPluginContext) => void
}

function parsePersistence(factoryOptions: PersistedStateFactoryOptions, store: Store) {
  return (o: PersistedStateOptions): Persistence | null => {
    try {
      const {
        storage = localStorage,
        beforeRestore = undefined,
        afterRestore = undefined,
        serializer = {
          serialize: JSON.stringify,
          deserialize: JSON.parse,
        },
        key = store.$id,
        paths = null,
        debug = false,
      } = o

      return {
        storage,
        beforeRestore,
        afterRestore,
        serializer,
        key: (factoryOptions.key ?? (k => k))(typeof key == 'string' ? key : key(store.$id)),
        paths,
        debug,
      }
    }
    catch (e) {
      if (o.debug)
        console.error('[pinia-plugin-persistedstate]', e)
      return null
    }
  }
}

function hydrateStore(
  store: Store,
  { storage, serializer, key, debug }: Persistence,
) {
  try {
    // 获取缓存
    const fromStorage = storage?.getItem(key)
    // 是否异步
    if(fromStorage instanceof Promise){
      fromStorage.then((value: any) => {
        if(typeof value == 'string'){
          store.$patch(serializer?.deserialize(value))
        }else{
          store.$patch(value)
        }
      })
    }
    // 同步函数
    else if (fromStorage){
      if(typeof fromStorage == 'string'){
        store.$patch(serializer?.deserialize(fromStorage))
      }else{
        store.$patch(fromStorage)
      }

    }

  }
  catch (e) {
    if (debug)
      console.error('[pinia-plugin-persistedstate]', e)
  }
}

function persistState(
  state: StateTree,
  { storage, serializer, key, paths, debug }: Persistence,
) {
  try {
    //
    const toStore = Array.isArray(paths) ? pick(state, paths) : state
     const data = serializer!.deserialize(serializer!.serialize(toStore as StateTree))
    //
    storage!.setItem(key!, data)
  }
  catch (e) {
    if (debug)
      console.error('[pinia-plugin-persistedstate]', e)
  }
}

/**
 * Creates a pinia persistence plugin
 * @param factoryOptions global persistence options
 * @returns pinia plugin
 */
export function createPersistedState(
  factoryOptions: PersistedStateFactoryOptions = {},
): PiniaPlugin {
  return (context: PiniaPluginContext) => {
    const { auto = false } = factoryOptions
    const {
      options: { persist = auto },
      store,
      pinia,
    } = context

    if (!persist)
      return

    // HMR handling, ignores stores created as "hot" stores
    /* c8 ignore start */
    if (!(store.$id in pinia.state.value)) {
      // @ts-expect-error `_s is a stripped @internal`
      const original_store = pinia._s.get(store.$id.replace('__hot:', ''))
      if (original_store)
        Promise.resolve().then(() => original_store.$persist())
      return
    }
    /* c8 ignore stop */

    const persistences = (
      Array.isArray(persist)
        ? persist.map(p => normalizeOptions(p, factoryOptions))
        : [normalizeOptions(persist, factoryOptions)]
    ).map(parsePersistence(factoryOptions, store)).filter(Boolean) as Persistence[]

    store.$persist = () => {
      persistences.forEach((persistence) => {
        persistState(store.$state, persistence)
      })
    }

    store.$hydrate = ({ runHooks = true } = {}) => {
      persistences.forEach((persistence) => {
        const { beforeRestore, afterRestore } = persistence

        if (runHooks)
          beforeRestore?.(context)

        hydrateStore(store, persistence)

        if (runHooks)
          afterRestore?.(context)
      })
    }

    persistences.forEach((persistence) => {
      const { beforeRestore, afterRestore } = persistence

      beforeRestore?.(context)

      hydrateStore(store, persistence)

      afterRestore?.(context)

      store.$subscribe(
        (
          _mutation: SubscriptionCallbackMutation<StateTree>,
          state: StateTree,
        ) => {
          persistState(state, persistence)
        },
        {
          detached: true,
        },
      )
    })
  }
}
