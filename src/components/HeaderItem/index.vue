<template>
  <div class="header-item">
    <span class="value">{{ value }}</span>
    <span class="label">{{ label }}</span>
  </div>
</template>
<script setup lang="ts">
 defineOptions({
  name: 'HeaderItem'
 })

 defineProps<{
  value: string | number
  label: string
 }>()
</script>
<style lang="scss" scope>
 .header-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 15px;
  .value{
    font-size: 12px;
    font-weight: 600;
  }
  .label{
    font-size: 10px;
    margin-top: 4px;
  }
 }
</style>
