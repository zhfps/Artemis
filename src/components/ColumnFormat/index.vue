<script setup lang="ts">
//
defineOptions({
  name: 'ColumnFormat'
})
//
defineProps<{
  column: IColumn
  row: any
}>()
</script>
<template>
  <div>
    <el-link style="font-size: 14px; font-weight: normal;" v-if="column.primary || column.type == 'Lookup'" type="primary">
      {{ row[column.name] }}
    </el-link>
    <div v-else>
      {{ row[column.name] }}
    </div>
  </div>
</template>
<style lang="scss" scoped>
.myself-tag {
  padding: 0 5px;
  // border-radius: 5px;
}
</style>
