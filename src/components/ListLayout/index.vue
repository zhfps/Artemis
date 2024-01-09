<template>
  <div>
    <div class="content-header">
      <div class="title-tool">
        <div class="left">
          {{ name }}
        </div>
        <div class="right">
          <slot name="header-right" />
        </div>
      </div>
    </div>
    <div ref="content" class="content-body">
      <slot name="default" />
    </div>
  </div>
</template>
<script setup lang="ts">
defineOptions({
  name: 'ListLayout'
})

defineProps<{
  name: string
}>()
</script>
<style lang="scss" scoped>
.content-header {
  z-index: 6000;
  height: 60px;
  background-color: rgb(255, 255, 255);

  // border-bottom: 1px solid rgba(216, 216, 216, 1);
  .title-tool {
    display: flex;
    justify-items: center;
    align-items: center;
    height: 56px;

    .left {
      font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
      font-size: 16px;
      font-weight: 600;
      border: none;
      border-radius: 2px;
      text-decoration: none;
      text-align: center;
      min-width: 80px;
      height: auto;
      background-color: rgb(255, 255, 255);
      color: rgb(50, 49, 48);
      max-width: 100%;
    }

    .right {
      flex: 1;
      display: flex;
      justify-content: right;
    }
  }
}

.content-body {
  z-index: 1;
  margin-top: -2px;
  margin-left: -2px;
  width: calc(100% + 4px);
  background-color: rgb(255, 255, 255);
}</style>
