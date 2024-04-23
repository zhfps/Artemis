import localforage from 'localforage'

const localStore = localforage.createInstance({
  driver      : localforage.INDEXEDDB,
  name        : '_gb_app',
  version     : 1.0,
  size        : 4980736,
  storeName   : 'ltc'
})

export default localStore
