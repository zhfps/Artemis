<script lang="ts" setup>
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>
<template>
  <ElConfigProvider
    :locale="zhCn"
    size="small">
    <router-view />
  </ElConfigProvider>
</template>
<style lang="scss">
    *,
    html,
    body {
      margin: 0;
      padding: 0;
      /* 设置窗口的圆角 */
      background-color: inherit;
      border: 0;
    }

    #app {
      position: absolute;
      width: 100%;
      height: 100%;
      // width: calc(100% - 2px);
      // height: calc(100% - 3px);
      z-index: 0;
      position: absolute;
      // background-color: #ffffff40;
      backdrop-filter: blur(15.5px);
      -webkit-backdrop-filter: blur(15.5px);
      // border: 1px solid rgba(58, 59, 59, 0.18);
      // box-shadow: #8e8e8e30 0 6px 15px;
      // -webkit-box-shadow: rgba(142, 142, 142, .19) 0px 6px 15px 0px;
      // border-radius: 10px;
      // -webkit-border-radius: 10px;
      overflow: hidden;
      color: #000;
    }
</style>
