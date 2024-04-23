
<template>
	<ElConfigProvider
		:locale="zhCn"
		size="small"
	>
		<div class="window-container">
			<div class="page-content">
				<router-view />
			</div>
		</div>
	</ElConfigProvider>
</template>
<script lang="ts" setup>
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

</script>

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
  border-radius: 5px;
  overflow: hidden;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  z-index: 0;
  position: absolute;
  backdrop-filter: blur(15.5px);
  -webkit-backdrop-filter: blur(15.5px);
  border: 1px solid rgba(58, 59, 59, 0.1);
  box-shadow: #8e8e8e30 0 6px 15px;
  -webkit-box-shadow: rgba(142, 142, 142, .19) 0px 6px 15px 0px;
  -webkit-border-radius: 5px;
  overflow: hidden;
  color: #000;

  .window-container {
    border-radius: 15px;
    width: 100%;
    height: 100%;
    .header{
      position: fixed;
      width: 100%;
      top: 0; 
      z-index: 6000;
      height: 40px;
      // border-bottom: 1px solid #eee;
    }
   .page-content {
    position: relative;
    width: 100%;
    height: 100%;
  }
  }
 
}
</style>
