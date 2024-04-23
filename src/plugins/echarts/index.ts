import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'

use([
    CanvasRenderer,
    GridComponent,
    BarChart,
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    LegendComponent
  ])