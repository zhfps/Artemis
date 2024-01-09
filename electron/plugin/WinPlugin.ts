/**
 *
 * @param data
 * @returns
 */

import Store from 'electron-store'

export async function cacheSize(
  store: Store|null,
  size: { height: number; width: number }
) {
  if(store){
  const config = store.get('config') as string
  const jsonData = config
    ? JSON.parse(config)
    : { size: { height: 600, width: 800 } }
  if (
    jsonData['size'] &&
    jsonData['size'].width == size.width &&
    jsonData['size'].height == size.height
  ) {
    // do nothing
  } else {
    jsonData['size'] = size
    store.set('config', JSON.stringify(jsonData, null, 4))
  }
 }
}
//
export async function cachePosition(
  store: Store|null,
  position: { x: number; y: number }
) {
  if(store){


  const config = store.get('config') as string
  const jsonData = config ? JSON.parse(config) : { position: { x: 0, y: 0 } }
  if (
    jsonData['position'] &&
    jsonData['position'].x == position.x &&
    jsonData['position'].y == position.y
  ) {
    // do nothing
  } else {
    jsonData['position'] = position
    store.set('config', JSON.stringify(jsonData, null, 4))
  }
}
}

/**
 * 读取配置
 * @returns
 */
export function readBound(store: Store|null) {
  const data = store?.get('config') as string
  if (data) {
    return JSON.parse(data)
  }
  return null
}
