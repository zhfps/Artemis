<script lang="ts" setup>
import { Back } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
//
defineOptions({
  name: 'PageHeader'
})
//router
const router = useRouter()

//返回上一页面
const back = () => {
  router.go(-1)
}

</script>
<template>
  <div class="page-header">
    <div class="mysef-tool">
      <div class="back-item">
        <div class="left-icon">
          <el-icon @click="back"
                   color="rgba(211, 211, 211, 1)"
                   size="20">
            <Back />
          </el-icon>
        </div>
      </div>
      <div class="tools">
        <slot name="default" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page-header {
  height: 42px;
  position: sticky;
  top: 0;
  padding: 0 5px;
  display: flex;
  align-items: center;
  background-color: #fff;
  overflow: hidden;
  // box-shadow: 0.5px 1px 1px 1px rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(216, 216, 216, 1);
  .mysef-tool {
    width: 100%;
    display: flex;
    align-items: center;
    .back-item {
      display: flex;
      height: 42px;
      // margin-right: 10px;
      align-items: center;
      .left-icon {
        padding: 0 5px;
        display: flex;
        justify-content: center;
      }
      .title {
        margin-left: -5px;
        font-size: 15px;
      }
    }
    .back-item::after {
      content: "";
      border-left: 1px solid rgb(223, 223, 223); /* 设置竖线的样式，可以根据需要修改颜色、宽度等 */
      height: 100%; /* 竖线的高度，这里设置为与 <li> 元素一样高 */
      position: relative; /* 使用绝对定位相对于 <li> 元素 */
      top: 0; /* 竖线与 <li> 元素上边缘对齐，可以根据需要调整 */
      right: 0; /* 竖线与 <li> 元素右边缘对齐，可以根据需要调整 */
      margin-left: 10px;
    }
    .tools {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .back-item-other:hover {
      background-color: #e1dfdd;
    }
  }
}
</style>
