<template>
    <list-layout name="操作日志">
      <template #header-right>
        <el-button type="primary" @click="openFile">选择文件</el-button>
        <el-button type="primary" @click="downloadFile">导出</el-button>
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
      <el-table-column prop="crateon" label="申请时间" show-overflow-tooltip width="180" />
      <el-table-column prop="user" label="申请人" show-overflow-tooltip width="180" />
      <el-table-column prop="user_email" label="申请人邮箱" show-overflow-tooltip width="180" />
      <el-table-column prop="product" label="产品" show-overflow-tooltip width="180" />
      <el-table-column prop="producttype" label="产品(code)" show-overflow-tooltip width="180" />
      <el-table-column prop="account" label="联系人" show-overflow-tooltip width="180" />
      <el-table-column prop="account_id" label="联系人(code)" show-overflow-tooltip width="180" />
      <el-table-column prop="email" label="邮箱" show-overflow-tooltip width="180" />
      <el-table-column prop="company" label="公司" show-overflow-tooltip width="180" />
      <el-table-column prop="company_id" label="公司(ID)" show-overflow-tooltip width="180" />
      <el-table-column prop="days" label="天数" show-overflow-tooltip width="180" />
      <el-table-column prop="enddate" label="截止日期" show-overflow-tooltip width="180" />
      <el-table-column prop="reson" label="申请原因" show-overflow-tooltip width="180" />
    </el-table>
    </list-layout>
</template>
<script setup lang="ts">
import { contractList } from '@/api/modules/contact'
import { companyList } from '@/api/modules/custmoer'
import { createRows } from '@/api/modules/license'
import { downloadExcel } from '@/utils'
import dayjs from 'dayjs'
import { ipcRenderer } from 'electron'
import { ref } from 'vue'

defineOptions({
    name: 'license-import'
})

const list = ref<any>([])
/**
 * 格式化数据
 * @param data 
 */
const formaData = (data: any[]) => {
    // 获取表头
    const headers = [
        'index',
        'crateon',
        'user',
        'product',
        'account',
        'email',
        'company',
        'days',
        'seals',
        'enddate',
        'status',
        'reson',
        'user_email',
        'account_id',
        'company_id',
        'phone',
        'stage',
        'status',
        'producttype'
    ]
    const _list: any[] = []

    for (let index = 1; index < data.length; index++) {
        const cols = data[index] as any[]
        const row: any = {
            status: 165990001,
            stage: 165990003
        }
        for (let j = 0; j < cols.length; j++) {
            row[headers[j]] = cols[j]
        }
        _list.push(row)
    }
    const companys = new Set<string>()
    for (let index = 0; index < _list.length; index++) {
       if(_list[index]['crateon']){
        _list[index]['crateon'] = dayjs(_list[index]['crateon']).format('YYYY-MM-DD')
        _list[index]['enddate'] = dayjs(_list[index]['enddate']).format('YYYY-MM-DD')
       }else {
        _list[index]['crateon'] = dayjs().format('YYYY-MM-DD')
        _list[index]['enddate'] = dayjs().format('YYYY-MM-DD')
       }
       if(_list[index]['product'] == 'OneTest'){
        _list[index]['producttype']  = 165990000
       }
       else if(_list[index]['product'] == 'OneData'){
        _list[index]['producttype']  = 165990001
       }
       else if(_list[index]['product'] == 'STDF Viewer'){
        _list[index]['producttype']  = 165990005
       }
       else if(_list[index]['product'] == 'OneFlow'){
        _list[index]['producttype']  = 165990002
       }
       else if(_list[index]['product'] == 'Pattern Converter'){
        _list[index]['producttype']  = 165990006
       }

       companys.add( _list[index]['company'] )
    }
    Promise.all([companyList(Array.from(companys)),contractList(Array.from(companys))]).then(values => {
        
        const companyList = values[0].value
        const contractList = values[1].value
        for (let index = 0; index < _list.length; index++) {
            const item = companyList.find(item => item.cr2f3_account == _list[index]['company'])
            const item1 = contractList.find(item => item['B.cr2f3_account'] == _list[index]['company'] && item['cr2f3_name'] == _list[index]['account'] )
            console.log(item1)
            if(item){
                _list[index]['company_id'] = item.cr2f3_gubocrmcustomerbaseid
            }
            if(item1){
                _list[index]['account_id'] = item1.cr2f3_crmcontactid
            }
        }
        list.value = _list
    })

    return _list
}
ipcRenderer.on('excel-data', (e, data) => {
  formaData(data)
})

const openFile = () => {
    ipcRenderer.send('open-excel')
}

const downloadFile = () => {
    const data:any[] = [[
        '申请时间',
        '申请人',
        '申请人邮箱',
        '产品',
        '产品(code)',
        '联系人',
        '联系人(code)',
        '邮箱',
        '公司',
        '公司(ID)',
        '天数',
        '截止日期',
        '申请原因'

    ]]
    for (let index = 0; index < list.value.length; index++) {
           data.push([
           list.value[index]['crateon'],
           list.value[index]['user'],
           list.value[index]['user_email'],
           list.value[index]['product'],
           list.value[index]['producttype'],
           list.value[index]['account'],
           list.value[index]['account_id'],
           list.value[index]['email'],
           list.value[index]['company'],
           list.value[index]['company_id'],
           list.value[index]['days'],
           list.value[index]['enddate'],
           list.value[index]['reson'],
           ])
    }
    downloadExcel('licens.xlsx', data)
}

const submit = () => {
    createRows(list.value)
}
</script>