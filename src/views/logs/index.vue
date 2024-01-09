<template>
    <list-layout name="操作日志">
      <template #header-right>
          <el-button type="primary" @click="saveToFile">导出</el-button>
      </template>
    <el-table 
      :data="list" 
      size="small" 
      empty-text="暂无数据" 
      height="calc(100vh - 120px)" 
      stripe
      class="customer-table"
      style="width: 100%; margin-top: 10px;">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="changedata" label="登录时间" show-overflow-tooltip width="180">
        <template #default="{ row }">
          {{ formatDate(row.createdon) }}
        </template>
      </el-table-column>
      <el-table-column prop="operation@OData.Community.Display.V1.FormattedValue" label="操作" min-width="100" />
      <el-table-column prop="action@OData.Community.Display.V1.FormattedValue" label="行为" min-width="120" />
      <el-table-column prop="changedata" label="变化" width="320">
        <template #default="{ row }">
          {{ overHide(row.changedata) }}
        </template>
      </el-table-column>
      <el-table-column prop="objecttypecode@OData.Community.Display.V1.FormattedValue" label="操作实体" min-width="120"
        show-overflow-tooltip /><el-table-column prop="_objectid_value@OData.Community.Display.V1.FormattedValue"
        label="操作对象" min-width="120" show-overflow-tooltip />
      <el-table-column prop="_userid_value@OData.Community.Display.V1.FormattedValue" min-width="120"
        show-overflow-tooltip label="用户" />
    </el-table>
     <lt-pagination :page="page" :size="pageSize" :total="total" :row="list.length" @page-change="pageChange" @size-change="sizeChange"/>
    </list-layout>
</template>
<script setup lang="ts">
import { changeLog } from '@/api/modules/log'
import dayjs from 'dayjs'
import { ipcRenderer } from 'electron'
import { ref } from 'vue'

defineOptions({
  name: 'log-page'
})

//
const page = ref(1)
const pageSize = ref(50)
const total = ref(0)


//
const list = ref<any[]>([])
//
const setList = () => {
  changeLog(page.value, pageSize.value).then(res => {
    list.value = res.value
    total.value = res['@odata.count']
  })
}

//
const formatDate = (str: string) => {
  return dayjs(str).format('YYYY-MM-DD HH:mm:ss')
}

/**
 * 多余隐藏
 * @param str 
 */
const overHide = (str: string) => {
  if (str.length > 48) {
    return str.substring(0, 42) + ' ...'
  } else {
    return str
  }
}
const pageChange = (val: number) => {
  page.value = val
  setList()
}
const sizeChange = (val: number) => {
  page.value = 1
  pageSize.value = val
  setList()
}
//
const saveToFile = () => {
  ipcRenderer.send('save-file',JSON.stringify(list.value, null, 4))
}

//
setList()
</script>