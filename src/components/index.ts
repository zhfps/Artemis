import { App } from 'vue'
import  EditorLayout from './EditorLayout/index.vue'
import  HeaderItem  from './HeaderItem/index.vue'
import  ToolBar from './ToolBar/index.vue'
import  ListLayout from './ListLayout/index.vue'
import  PageLayout from './PageLayout/index.vue'
import  AttrFilter from './AttrFilter/index.vue'
import  PagePagination from './PagePagination/index.vue'
import  FormTab from './FormTab/index.vue'
import  SvgIcon from './SvgIcon/index.vue'
import  SingleTag from './SingleTag/index.vue'
import  MoveBar from './MoveBar/index.vue'
import  TopBar from './TopBar/index.vue'

export function loadComponent(app: App) {
    app.component('editor-layout', EditorLayout)
    app.component('header-item', HeaderItem)
    app.component('top-bar', ToolBar)
    app.component('page-layout', PageLayout)
    app.component('list-layout', ListLayout)
    app.component('lt-pagination', PagePagination)
    app.component('attr-filter', AttrFilter)
    app.component('form-tab', FormTab)
    app.component('single-tag', SingleTag)
    app.component('svg-icon', SvgIcon)
    app.component('move-bar', MoveBar)
    app.component('top-bar', TopBar)
}

export { default as SvgIcon} from './SvgIcon/index.vue'
