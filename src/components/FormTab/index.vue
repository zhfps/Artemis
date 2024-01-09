<template>
  <div class="tabs">
    <ul>
      <li v-for="item in tabs" :key="item" @click="change(item)">
        <div class="label" :class="item == modelValue?'tab-active':'tab-default'">
          {{ item }}
        </div>
        <div v-if="item == modelValue" class="line"/>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">

defineOptions({
    name: 'FormTab'
})
const props = defineProps<{
  modelValue: string
  tabs: string[]
}>()
//切换tab
const change = (tab: string) => {
  if(tab!= props.modelValue){
    emit('update:modelValue',tab)
  }
}
const emit = defineEmits(['update:modelValue'])
</script>
<style lang="scss" scoped>
  .tabs{
    display: flex;
    padding: 15px 15px 15px 15px;
    ul{
      list-style: none;
      position: relative;
      bottom: 0;
      display: flex;
      justify-items: center;
      align-items: center;
      margin: 0;
      padding: 0;
      li{
        font-size: 14px;
        height: 40px;
        line-height: 30px;
        .label{
          font-weight: 500;
        }
        .tab-active{
          font-weight: 800;
        }
        .line{
          position: relative;
          top: 10px;
          height: 2px;
          background-color: rgb(34, 102, 227);
        }
      }
      li:nth-child(n+2) {
        margin-left: 10px;
      }
    }
}
</style>
