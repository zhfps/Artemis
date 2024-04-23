<script lang="ts" setup>
import { Icon, IconConfigProvider } from '@vicons/utils'
defineProps({
  name: {
    type: String,
    required: true
  }
})
</script>

<template>
   <IconConfigProvider>
     <Icon>
       <component :is="`icon-${name}`" />
     </Icon>
   </IconConfigProvider>
</template>

