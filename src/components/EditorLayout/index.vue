<template>
  <div>
    <div class="content-header">
      <div class="title-tool">
        <div class="left">
          <div class="titile">
            {{ title }}
          </div>
          <div class="sn">
            {{ name ? name: "" }}
          </div>
        </div>
        <div class="right">
          <slot name="header-right"/>
        </div>
      </div>
      <div class="midel">
        <slot name="midel"/>
      </div>
      <div class="tabs">
        <ul>
          <li>
            <div class="tab-name">
              基础信息
            </div>
            <div class="line"/>
          </li>
        </ul>
      </div>
    </div>
    <el-scrollbar :max-height="srollHeight">
      <div ref="content">
        <el-card class="content-body">
          <slot name="default"/>
        </el-card>
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
defineOptions({
    name: 'EditorLayout'
})

defineProps<{
  title: string
  name?: string
}>()




//默认高度
const srollHeight = ref('calc(100vh - 240px)')
//
const height = ref('calc(100vh - 250px)')
//内容
const content = ref<HTMLDivElement>()
//计算高度
onMounted(() => {
  if (content.value) {
    const domInfo = content.value!.getBoundingClientRect()
    const top = domInfo.top + 30
    srollHeight.value = `calc(100vh - ${top - 30}px)`
    height.value = `calc(100vh - ${top}px)`
  }
}
)
</script>
<style lang="scss" scoped>
.content-header{
  position: relative;
  height: 120px;
  background-color: rgb(255,255,255);
  border-bottom: 1px solid rgba(216, 216, 216, 1);
  .title-tool {
    display: flex;
    justify-items: center;
    align-items: center;
    padding: 15px 15px 0 15px;
    height: 56px;
    .left {
      font-size: 1.2rem;
      font-weight: 600;
      .sn{
        font-size: 0.9rem;
        font-weight: 300;
        margin-top: 5px;
      }
    }
    .right{
      flex: 1;
      display: flex;
      justify-content: right;
    }
  }
  .midel{
    position: absolute;
    bottom: 40px;
    width: 100%;
  }
  .tabs{
    display: flex;
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 10px 15px 5px 15px;
    ul{
      list-style: none;
      position: relative;
      top: 5px;
      bottom: 0;
      display: flex;
      justify-items: center;
      align-items: center;
      margin: 0;
      padding: 0;
      li{
        font-size: 14px;
        max-width: 120px;
        height: 40px;
        line-height: 40px;
        .tab-name{
          font-weight: 400;
          width: 100%;
          height: 16px;
          line-height: 40px;
        }
        .line{
          position: absolute;
          height: 2px;
          bottom: 2px;
          width: 100%;
          background-color: rgb(34, 102, 227);
        }
      }
      li:nth-child(n+2) {
        margin-left: 10px;
      }
    }
}
}
.content-body {
  margin: 7px;
  min-height: v-bind(height);
  // padding: 7px;
}
</style>
