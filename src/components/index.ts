import { App } from 'vue'
import  EditorLayout from './EditorLayout/index.vue'
import  HeaderItem  from './HeaderItem/index.vue'
import  ToolBar from './ToolBar/index.vue'
import  ListLayout from './ListLayout/index.vue'
import  PageLayout from './PageLayout/index.vue'
import  AttrFilter from './AttrFilter/index.vue'
import  PagePagination from './PagePagination/index.vue'
import  FormTab from './FormTab/index.vue'



export function loadComponent(app: App) {
    app.component('editor-layout', EditorLayout)
    app.component('header-item', HeaderItem)
    app.component('tool-bar', ToolBar)
    app.component('page-layout', PageLayout)
    app.component('list-layout', ListLayout)
    app.component('lt-pagination', PagePagination)
    app.component('attr-filter', AttrFilter)
    app.component('form-tab', FormTab)
}

export { default as MoveBar} from './MoveBar/index.vue'
export { default as SvgIcon} from './SvgIcon/index.vue'
export default {
  'editor-layout': EditorLayout,
  'header-item': HeaderItem,
  'tool-bar': ToolBar,
  'page-layout': PageLayout,
  'list-layout': ListLayout,
  'form-tab': FormTab,
  'attr-filter': AttrFilter
}