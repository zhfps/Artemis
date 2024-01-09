<template>
  <div class="self-page">
    <div class="header">
      <slot name="header" />
    </div>
    <div ref="content" class="content">
      <slot name="default" />
    </div>
  </div>
</template>
<script setup lang="ts">
//attribute
defineOptions({
  name: 'PageLayout'
})
</script>
<style lang="scss">
.self-page{
  width: 100%;
  overflow: hidden;
}
</style>
