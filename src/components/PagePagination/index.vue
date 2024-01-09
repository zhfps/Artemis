<script lang="ts" setup>
import { computed } from 'vue'

// 分页组件
defineOptions({
  name: 'PagePagination'
})
//属性
const prop = defineProps<{
  page: number
  size?: number
  total: number
  row: number
}>()
//回调函数
const emit = defineEmits(['page-change', 'size-change'])
//page
const changePage = (page: number) => {
  emit('page-change', page)
}
//pageSize
const sizeChange = (value: number) => {
  emit('size-change', value)
}
//起始编号
const start = computed(() => (prop.page - 1) * 50 + 1)
//结束编号
const end = computed(() => (prop.page - 1) * 50 + prop.row)
</script>
<template>
  <div class="myself-pagination-container">
    <div class="page-left">
      {{ total == 0 ? 0 : start}} - {{ end }} of {{ total }}
    </div>
    <el-pagination
      class="page-right"
      small
      :current-page="page"
      :page-size="size"
      :page-sizes="[50, 100, 200, 500]"
      @current-change="changePage"
      @size-change="sizeChange"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    />
  </div>
</template>
<style lang="scss" scoped>
.myself-pagination-container {
  margin-top: 1px;
  height: 40px;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #fff;
  .page-left {
    flex: 1;
    font-size: 12px;
    padding-left: 15px;
  }
  .page-right {
    right: 35px;
    margin-right: 25px;
  }
}
</style>
