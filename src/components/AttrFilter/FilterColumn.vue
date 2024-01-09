<script setup lang="ts">
import { FormInstance, FormRules } from 'element-plus'
import { watch, ref, reactive } from 'vue'

defineOptions({
  name: 'SortColumn'
})
const emit = defineEmits([
  'apply-filter',
  'cancel-filter'
])
const prop = defineProps<{
  column: IColumn
}>()
//控制显示
const visible = ref(false)
//
const ruleFormRef = ref<FormInstance>()
//
const condition = ref({
  value:prop.column.condition?.value || '',
  operator: prop.column.condition?.operator || 'eq'
})
const validator = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入'))
  } else {
    callback()
  }
}
//
const rules = reactive<FormRules>({
  value: [{ validator: validator, trigger: 'blur' }]
})

const options = [
  {
    label: 'Equals',
    value: 'eq'
  },
  {
    label: 'Does not equal',
    value: 'ne'
  },
  {
    label: 'Contains data',
    value: 'not-null'
  },
  {
    label: 'Does not contain data',
    value: 'null'
  },
  {
    label: 'Contains',
    value: 'like'
  },
  {
    label: 'Does not contain',
    value: 'not-like'
  },
  {
    label: 'Begins with',
    value: 'begins-with'
  },
  {
    label: 'Does not begin with',
    value: 'not-begin-with'
  },
  {
    label: 'Ends with',
    value: 'ends-with'
  },
  {
    label: 'Does not end with',
    value: 'not-ends-with'
  }
]
/**
 * 过滤
 * @param formEl
 */
const applyFilter = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      visible.value = false
      emit('apply-filter',{
        name: prop.column.name,
        filter: true,
        condition
      })
    } else {
      return false
    }
  })
}
/**
 * 取消过滤
 */
const cancelFilter = () => {
  visible.value = false
  if(prop.column.condition?.value){
    condition.value.value = ''
    condition.value.operator = ''
    emit('cancel-filter', {
          name: prop.column.name,
          filter: false,
          condition
    })
  }
}



const listener = (event: MouseEvent) => {
  const clickedElement = event.target as HTMLElement
  //console.log(clickedElement)
  //console.log(clickedElement.closest(`[data-name="${prop.column.name}"]`))
  if (!clickedElement.closest(`[data-name="${prop.column.name}"]`)) {
    visible.value = false
  }
}

const show = () => {
  visible.value = true
}

const close = () => {
  visible.value = false
}

watch(visible, (newVisible) => {
  if(newVisible){
    document.addEventListener('click', listener)
  }else{
    document.removeEventListener('click', listener)
  }
})
//
defineExpose({
  show,
  close
})
</script>
<template>
  <div v-data-name="column.name">
    <el-popover trigger="click" :visible="visible" placement="bottom" :show-arrow="false" :width="200">
      <template #reference>
        <el-icon :size="16" color="rgba(0,0,0,0)">
          <Filter />
        </el-icon>
      </template>
      <div v-data-name="column.name" class="filter-content">
        <el-form
          ref="ruleFormRef"
          :rules="rules"
          :model="condition"
          status-icon
        >
          <el-form-item prop="operator" style="margin-bottom: 5px;">
            <el-select v-model="condition.operator" placeholder="请选择" size="small">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="condition.operator != 'not-null' && condition.operator != 'null'" prop="value">
            <el-input v-model="condition.value" style="margin-top: 10px" />
          </el-form-item>
        </el-form>
        <div class="filter-footer">
          <div class="left">
            <el-button @click="cancelFilter">
              取消
            </el-button>
          </div>
          <div class="right">
            <el-button @click="applyFilter(ruleFormRef)" type="primary">
              确定
            </el-button>
          </div>
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
