
<template>
    <el-row>
        <el-input size="small" v-model="query" placeholder="请输入PN号" style="width: 220px;">
            <template #append>
                <el-button :loading="loading" type="primary" @click="queryPrice(query)"
                    :icon="Search">查询</el-button>

            </template>
        </el-input>
        <el-button type="default" style="margin-left: 15px;" @click="exportExcelFile()">导出</el-button>
        <el-table size="small" :data="tableData" style="margin-top: 10px;" height="calc(100vh - 80px)" max-height="calc(100vh - 80px)">
            <el-table-column prop="partNumber" label="产品号" width="160" />
            <el-table-column prop="listPrice" label="单价" width="160" />
            <el-table-column prop="formattedListPrice" label="单价(RMB)"  />
        </el-table>
    </el-row>
</template>
<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import axios from 'axios'
const query = ref('')
const loading = ref(false)
const tableData = reactive<any[]>([])

//查询产品单价
const queryPrice = (PN: string) => {
    loading.value = true
    axios.get(`https://www.ni.com/nicom-pricing/1/prices/zh-CN?partNumber=${PN}&quantity=1`).then(res => {
        const items = res.data.priceData.items
        tableData.splice(0, 0, ...items)

    }).finally(() => {
        loading.value = false
    })


}
//导出为josn文件
const exportExcelFile = () => {
    const jsonStr = JSON.stringify(tableData, null, 4)
    const url = window.URL || window.webkitURL || window
    const blob = new Blob([jsonStr])
    const saveLink: HTMLAnchorElement = document.createElementNS('http://www.w3.org/1999/xhtml', 'a') as HTMLAnchorElement
    saveLink.href = url.createObjectURL(blob)
    saveLink.download = 'table.json'
    saveLink.click()
}
</script>