<script setup lang="ts">
import { reactive, ref } from 'vue'
import Dayjs from 'dayjs'
import type { UploadInstance } from 'element-plus'
import { read, utils } from 'xlsx'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

const upload = ref<UploadInstance>()

const dataJson = reactive<any[]>([])

const handleReadFile = (uploadFile: any) => {
  upload.value!.clearFiles()
  const file = uploadFile
  const fileReader = new FileReader()
  fileReader.onload = (e) =>{
    const data = e.target?.result
    const excel = read(data,{type: 'binary', cellDates: true})
    excel.SheetNames.forEach(sheetName =>{
        const sheetJson = utils.sheet_to_json(excel.Sheets[sheetName])
        sheetJson.map((item:any) =>{
            for (const key in item) {
             //  console.log(key)
               if(item[key] instanceof Date){
                item[key] = Dayjs(item[key]).format('YYYY-MM-DD HH:mm:ss')
               }
            }
            return item
        })
        if(sheetJson.length>0){
          dataJson.splice(0, dataJson.length, ...sheetJson)
        }

       // console.log(dataJson)
    })
  }
  fileReader.readAsBinaryString(file.raw)
}

</script>
<template>
  <div>
    <div>
        <el-upload
        ref="upload"
        class="upload"
        action="#"
        :limit="1"
        :on-change="handleReadFile"
        :auto-upload="false"
        >
        <template #trigger>
            <el-button size="small" type="primary">选取文件</el-button>
        </template>
        </el-upload>
      </div>
    <el-row style="margin-top: 15px; margin-left: 15px；;">
        <el-scrollbar max-height="calc(100vh - 120px)">
        <VueJsonPretty  v-if="dataJson.length>0" :data="dataJson" />
        </el-scrollbar>
     </el-row>
    </div>
  </template>
  
