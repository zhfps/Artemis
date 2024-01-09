<script setup lang="ts">
import { ref } from 'vue'
import SortColumn from './SortColumn.vue'
import FilterColumn from './FilterColumn.vue'
defineOptions({
  name: 'AttrFilter'
})
//
defineProps<{
  column: IColumn
}>()
//回调函数
const emit = defineEmits(['filter-change', 'sort-change'])
//排序
const sortColumn = ref(null)
//过滤
const filterColumn = ref(null)
//显示排序
const show = () => {
  //@ts-ignore
  sortColumn.value!.show()
  //@ts-ignore
  filterColumn.value!.close()
}
//显示过滤
const showFilter = () => {
  //@ts-ignore
  filterColumn.value!.show()
}
/**
 * 过滤修改
 * @param value
 */
const filterChange = (value: any) => {
  emit('filter-change', value)
}
/**
 * 排序修改
 * @param value
 */
const sortChange = (value: any) => {
  emit('sort-change', value)
}
</script>
<template>
  <div class="text-fliter" v-data-name="column.name" @click="show">
    <span>{{ column.label }}&nbsp;&nbsp;</span>
    <el-icon v-if="column.sort && column.descending != null && !column.descending" :size="16" color="#62605e">
      <SortDown/>
    </el-icon>
    <el-icon v-if="column.sort && column.descending" :size="16" color="#62605e">
      <SortUp/>
    </el-icon>
    <SortColumn
      v-data-name="column.name"
      ref="sortColumn"
      :column="column"
      @show-filter="showFilter"
      @clear-filter="filterChange"
      @sort-change="sortChange"
    />
    <FilterColumn
      v-data-name="column.name"
      ref="filterColumn"
      :column="column"
      @apply-filter="filterChange"
      @cancel-filter="filterChange"
    />
  </div>
</template>
<style lang="scss" scoped>
.text-fliter {
  display: flex;
  align-items: center;
  width: 100%;
}
</style>
