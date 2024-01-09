<template>
    <list-layout name="操作日志">
      <template #header-right>
        <el-button type="primary" @click="openFile">选择文件</el-button>
        <el-button type="primary" @click="submit">导入</el-button>
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

      <el-table-column prop="id" label="主键" show-overflow-tooltip width="180" />
      <el-table-column prop="cr2f3_pn" label="产品号" show-overflow-tooltip width="180" />
      <el-table-column prop="cr2f3_discount" label="折扣" show-overflow-tooltip width="180" />
      <el-table-column prop="cr2f3_direction" label="应用方向" show-overflow-tooltip/>
    </el-table>
    </list-layout>
</template>
<script setup lang="ts">
import { productListByPns, upDateProduct } from '@/api/modules/product'
import { splitArrayByLength } from '@/utils'
import { ipcRenderer } from 'electron'
import { ref } from 'vue'

defineOptions({
    name: 'product-import'
})

const list = ref<any>([])
/**
 * 格式化数据
 * @param data 
 */
const formaData = (data: any[]) => {
    const _list: any[] = []
    for (let index = 1; index < data.length; index++) {
        const col = data[index] as any[]
        const row: any = {
            id: '',
            cr2f3_pn: col[2],
            cr2f3_discount: col[5] ? (1 - Number(col[5].replace('%off','')) /100) : (col[8] ? (1 - Number(col[8].replace('%off','')) /100) : (col[9] ? (1 - Number(col[9].replace('%off','')) /100) : null)),
            cr2f3_direction: col[6] ? 165990000 : (col[7] ? 165990001 : null)
        }
        _list.push(row)
    }

    const groupList = splitArrayByLength(_list,100)
    const requests: Promise<IResponse<any>>[] =[]

    for (let index = 0; index < groupList.length; index++) {
        requests.push(productListByPns(groupList[index]))
    }
    //
    Promise.all(requests).then(values => {
        for (let index = 0; index < values.length; index++) {
            const rows = values[index].value

            for (const row of rows) {
                const i = _list.findIndex(item => item.cr2f3_pn == row.cr2f3_pn)
                if(i> -1){
                    _list[i].id = row.cr2f3_guboproductshopid
                }
            }
            
        }
        list.value = _list
    })
   
}
/**
 * 格式化文件
 */
ipcRenderer.on('excel-data', (e, data) => {
  formaData(data)
})

const openFile = () => {
    ipcRenderer.send('open-excel')
}


const submit = () => {
 //
 const groupList = splitArrayByLength(list.value,500)
 for (let index = 0; index < groupList.length; index++) {
     upDateProduct(groupList[index])
}

}
</script>