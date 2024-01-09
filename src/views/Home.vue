<template>
  <div class="home-page">
    <div class="logo-public">
      <div>
        <el-button @click.prevent="getPath">测试</el-button>
        <img :src="iconUrl" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useApp } from '@/store/modules/app'

const app = useApp()
const iconUrl = ref('')

const getPath = () => {
   const  baseURL = 'https://graph.microsoft.com/v1.0/me/photo/$value' // 根据你的实际情况配置
  fetch(baseURL, {
  headers: {
    'Authorization': 'Bearer ' + app.token
  }
})
.then(response => response.blob())
.then(blob => {
  iconUrl.value= URL.createObjectURL(blob)
})

}
</script>
