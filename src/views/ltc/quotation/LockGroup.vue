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
      height="calc(100vh - 100px)" 
      class="customer-table"
      :row-class-name="tableRowClassName"
      style="width: 100%; margin-top: 10px;">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="pn" label="产品" show-overflow-tooltip min-width="180" />
      <el-table-column prop="model" label="型号" show-overflow-tooltip min-width="180" />
      <el-table-column prop="lockqty" label="销售端锁定数量" show-overflow-tooltip min-width="180" />
      <el-table-column prop="locknum" label="库存端锁定数量" show-overflow-tooltip min-width="180" />
      <el-table-column prop="noarrivalqty" label="在途数量" show-overflow-tooltip min-width="180" />
    </el-table>
    </list-layout>
</template>
<script setup lang="ts">
import { mainLock } from '@/api/modules/inventory'
import { enRouteGroup } from '@/api/modules/order'
import { lockGroup } from '@/api/modules/quotation'
import { ipcRenderer } from 'electron'
import { ref } from 'vue'

defineOptions({
  name: 'LockGroup'
})



const tableRowClassName = ({
  row
}: {
  row: any
}) => {
  if (row['lockqty'] > (row['locknum'] ||0 + row['noarrivalqty'] ||0 ) || (row['lockqty'] == 0 && row['locknum'] !=0)) {
    return 'warning-waring-9'
  }
  return ''
}
//
const list = ref<any[]>([])
//
const setList = () => {
  Promise.all([lockGroup(),mainLock(),enRouteGroup()]).then((values) => {
    const _list = values[0].value
    //
    const inventoryList = values[1].value 
    const roadList = values[2].value 
    for (let index = 0; index < inventoryList.length; index++) {
      const item = inventoryList[index]
      //库存端锁定
      const _index = _list.findIndex( row => row.pn == item.cr2f3_pn)
      if(_index != -1){
        _list[_index]['locknum'] = item.cr2f3_locknum || 0
      }else {
        _list.push({
          pn: item.cr2f3_pn,
          model: item.cr2f3_model,
          lockqty: 0,
          locknum: item.cr2f3_locknum || 0,
          noarrivalqty: 0
        })
      }
      
    }
    for (let index = 0; index < roadList.length; index++) {
      const item = roadList[index]
      //库存端锁定
      const _index = _list.findIndex( row => row.pn == item.pn)
      if(_index != -1){
        _list[_index]['noarrivalqty'] = item.noarrivalqty || 0
      }else {
        _list.push({
          pn: item.pn,
          model: item.model,
          lockqty: 0,
          locknum: 0,
          noarrivalqty: item.noarrivalqty
        })
      }
      
    }
    list.value = _list
  })
}

//
const saveToFile = () => {
  ipcRenderer.send('save-file',JSON.stringify(list.value, null, 4))
}

//
setList()
</script>