<template>
  <div class="tool">
    <ul>
      <ToolItem
        key="-1"
        name="返回"
        icon="back"
        :runing="false"
        @click="change('back')"
      />
      <ToolItem
        v-for="(item,index) in (list || []).filter(item => item.show)"
        :key="index"
        :name="item.name"
        :icon="item.icon"
        :runing="item.runing"
        @click="change(item.name)"
      />
      <slot name="default"/>
    </ul>
  </div>
</template>
<script lang="ts" setup>
//
import ToolItem from './Item.vue'
//
defineOptions({
  name: 'ToolBar'
})

//属性
defineProps<{
  list: any[]
}>()

//定义回调
const emit = defineEmits(['change'])


//回调钩子
const change =(name: string) => {
  emit('change',name)
}
//
</script>
<style lang="scss" scoped>
.tool {
  border-bottom: 1px solid #eee;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 42px;
    display: flex;

    li {
      position: relative;
      display: flex;
      height: 42px;
      align-items: center;

      span {
        font-size: 14px;
        margin-left: 5px;
      }
    }



    .line-item:nth-child(n+2) {
      &::before {
        content: "";
        border-left: 1.5px solid rgb(214, 214, 214);
        height: 50%;
        position: relative;
        left: 5px;
        width: 10px;

      }
    }

  }
}
</style>
