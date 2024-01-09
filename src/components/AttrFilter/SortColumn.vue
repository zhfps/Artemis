<script setup lang="ts">
import { watch, ref } from 'vue'

defineOptions({
  name: 'SortColumn'
})
const emit = defineEmits([
  'sort-change',
  'clear-filter',
  'show-filter'
])
//descending 降序
const prop = defineProps<{
  column: IColumn
}>()
//控制显示
const visible = ref(false)
/**
 * 清除filter
 * @param name
 */
const celarFilter = (name: string) => {
  visible.value = false
  emit('clear-filter', {
    name: name,
    filter: false,
    condition: {
      operator: '',
      value: ''
    }
  })
}
/**
 * 显示sort
 * @param sort
 * @param name
 */
const sortChange = (sort: boolean, name: string) => {
  visible.value = false
  emit('sort-change', {
    name,
    sort: sort == prop.column.descending ? false : true,
    descending: sort
  })
}
/**
 * 显示filter
 */
const showFilter = () => {
  visible.value = false
  emit('show-filter')
}

//监听上下文之外的点击事件
const listener = (event: MouseEvent) => {
  const clickedElement = event.target as HTMLElement
  if (!clickedElement.closest(`[data-name="${prop.column.name}"]`)) {
    visible.value = false
  }
}
//弹出
const show = () => {
  if(visible.value){
    visible.value = false
  }else{
    visible.value = true
  }

}
//关闭
const close = () => {
  visible.value = false
}
//监听修改
watch(visible, (newVisible) => {
  if(newVisible){
    document.addEventListener('click', listener)
  }else{
    document.removeEventListener('click', listener)
  }
})
//回调函数
defineExpose({
  show,
  close
})
</script>
<template>
  <div v-data-name="column.name">
    <el-popover trigger="click" :visible="visible" placement="bottom" :width="200">
      <template #reference>
        <div>
          <el-icon v-if="column.filter" :size="14" :color="'#62605e'">
            <Filter />
          </el-icon>
          <el-icon v-else :size="16" :color="'#62605e'">
            <ArrowDown />
          </el-icon>
        </div>
      </template>
      <div class="filter-content">
        <div v-data-name="column.name" class="sort-item" @click="sortChange(false, column.name)">
          <el-icon :size="16" :color="column.descending != null && !column.descending ? '#62605e' : 'rgba(0,0,0,0)'">
            <Check />
          </el-icon>
          <el-icon class="icon" style="margin-left: 5px" :size="16" color="#73a7d4">
            <Top />
          </el-icon>
          <span>Sort&nbsp;&nbsp;A&nbsp;&nbsp;to&nbsp;&nbsp;Z</span>
        </div>
        <div class="sort-item" @click="sortChange(true, column.name)">
          <el-icon :size="16" :color="column.descending != null && column.descending ? '#62605e' : 'rgba(0,0,0,0)'">
            <Check />
          </el-icon>
          <el-icon class="icon" style="margin-left: 5px" :size="16" color="#73a7d4">
            <Bottom />
          </el-icon>
          <span>Sort&nbsp;&nbsp;Z&nbsp;&nbsp;to&nbsp;&nbsp;A</span>
        </div>
        <el-divider class="el-divider" />
        <div v-data-name="column.name" class="filter-item" @click="showFilter">
          <el-icon :size="16" color="rgba(0,0,0,0)">
            <Check />
          </el-icon>
          <el-icon class="icon" style="margin-left: 5px" color="#73a7d4">
            <Filter />
          </el-icon>
          <span>Filter By</span>
        </div>
        <div v-data-name="column.name" v-if="column.filter" class="filter-item" @click="celarFilter(column.name)">
          <el-icon :size="16" color="rgba(0,0,0,0)">
            <Check />
          </el-icon>
          <el-icon class="icon" style="margin-left: 5px" color="#73a7d4">
            <Close />
          </el-icon>
          <span>Clear Filter</span>
        </div>
      </div>
    </el-popover>
  </div>
</template>
<style lang="scss" scoped>
.el-divider {
  margin: 5px !important;
}
.filter-content {
  .sort-item {
    display: flex;
    justify-items: center;
    align-items: center;
    padding: 5px;
    .iocn {
      margin-left: 10px;
    }
    span {
      margin-left: 10px;
    }
  }
  .filter-item {
    display: flex;
    justify-items: center;
    align-items: center;
    padding: 5px;
    .iocn {
      margin-left: 10px;
    }
    span {
      margin-left: 10px;
    }
  }
  .sort-item:hover {
    background-color: #f3f2f1;
  }
  .filter-item:hover {
    background-color: #f3f2f1;
  }
  .filter-footer {
    margin-top: 10px;
    display: flex;
    .left {
      flex: 1;
    }
    .right {
      flex: 1;
      display: flex;
      flex-direction: row-reverse;
    }
  }
}
</style>
