import { type App } from 'vue'
import {
  MinimizeFilled,
  FullscreenExitSharp,
  FullscreenRound,
  CloseSharp,
  LockOutlined,
  MenuOutlined,
  ContentPasteSearchRound
} from '@vicons/material'
//
import {
  House
} from '@element-plus/icons-vue'

export function loadVIcons(app: App) { 
    // material
    app.component(`icon-${MinimizeFilled.name}`, MinimizeFilled)
    app.component(`icon-${FullscreenExitSharp.name}`, FullscreenExitSharp)
    app.component(`icon-${FullscreenRound.name}`, FullscreenRound)
    app.component(`icon-${CloseSharp.name}`, CloseSharp)
    app.component(`icon-${LockOutlined.name}`, LockOutlined)
    app.component(`icon-${MenuOutlined.name}`, MenuOutlined)
    app.component(`icon-${ContentPasteSearchRound.name}`, ContentPasteSearchRound)
    // element-plus
    app.component(House.name || House.displayName, House)
}