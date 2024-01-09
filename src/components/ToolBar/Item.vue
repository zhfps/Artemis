<template>
  <li class="line-item">
    <div class="item-content" :class="runing ? 'active' : ''">
      <div class="tool-icon">
        <svg class="svg-icon" aria-hidden="true">
          <use :href="symbolId" />
        </svg>
      </div>
      <span class="tool-title">{{ name }}</span>
    </div>

  </li>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

//
defineOptions({
  name: 'ToolBarItem'
})

const props = defineProps<{
  icon: string
  name: string
  runing: boolean
}>()
const symbolId = computed(() => `#icon-${props.icon}`)
</script>
<style lang="scss" scoped>
.line-item{
  min-width: 60px;
}
.item-content{
  display: flex;
  align-self: center;
  padding-left: 5px;
  padding-right: 5px;
  .tool-icon{
    line-height: 42px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    .svg-icon{
      line-height: 42px;
      text-align: center;
      width: 16px;
      height: 16px;
    }
  }
  .tool-title{
    line-height: 42px;
    text-align: center;
    font-size: 12px;
    margin-left: 5px;
    font-weight: 400;

  }
  span{
    line-height: 1.5rem;
    font-family: "Segoe UI Regular", SegoeUI, "Segoe UI";
    color: rgb(51, 51, 51);
    text-overflow: ellipsis;
    font-size: 14px;
  }
}
.active{
  background-color: rgba(204, 200, 200, 0.2);
  cursor: not-allowed;
}
.item-content:hover {
      background-color: rgba(94, 89, 89, 0.2);
}
</style>
