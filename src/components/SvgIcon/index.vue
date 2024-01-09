<script lang="ts" setup>
import { Icon } from '@vicons/utils'
defineProps({
  name: {
    type: String,
    required: true
  }
})
</script>

<template>
  <Icon class="svg-icon">
      <component :is="name"/>
  </Icon>
</template>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
  color: #000;
}
</style>
