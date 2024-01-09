import { type App } from 'vue'
import * as vicons from '@vicons/material'

export function loadVIcons(app: App) {
  for (const [key, component] of Object.entries(vicons)) {
    app.component(`icon-${key}`, component)
  }
}