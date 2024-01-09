<template>
    <list-layout name="锁货情况">
      <template #header-right>
        <el-button type="primary" icon="refresh" @click="setList">刷新</el-button>
        <el-button type="primary" icon="share" @click="saveToFile">导出</el-button>
      </template>
    <el-table 
      :data="list" 
      size="small" 
      empty-text="暂无数据" 
      height="calc(100vh - 120px)" 
      class="customer-table"
      :row-class-name="tableRowClassName"
      style="width: 100%; margin-top: 10px;">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="cr2f3_concentratno" label="合同" show-overflow-tooltip min-width="180" />
      <el-table-column prop="cr2f3_pn" label="产品" show-overflow-tooltip min-width="180" />
      <el-table-column prop="cr2f3_model" label="型号" show-overflow-tooltip min-width="180" />
      <el-table-column prop="cr2f3_qty" label="数量" show-overflow-tooltip min-width="180" />
      <el-table-column prop="cr2f3_reservenumber" label="锁定数量" show-overflow-tooltip min-width="180" />
      <el-table-column prop="cr2f3_picknumber" label="出货数量" show-overflow-tooltip min-width="180" />
    </el-table>
     <lt-pagination :page="page" :size="pageSize" :total="total" :row="list.length" @page-change="pageChange" @size-change="sizeChange"/>
    </list-layout>
</template>
<script setup lang="ts">
import { lockList } from '@/api/modules/quotation'
import { ipcRenderer } from 'electron'
import { ref } from 'vue'

defineOptions({
  name: 'lock-detail'
})

//
const page = ref(1)
const pageSize = ref(50)
const total = ref(0)

const tableRowClassName = ({
  row
}: {
  row: any
}) => {
  if (row['cr2f3_picknumber'] === row['cr2f3_qty']) {
    return 'warning-row'
  }
  return ''
}
//
const list = ref<any[]>([])
//
const setList = () => {
  lockList(page.value, pageSize.value).then(res => {
    list.value = res.value
    total.value = res['@odata.count']
  })
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