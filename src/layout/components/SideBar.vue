<template>
  <div class="side-bar">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :unique-opened="true"
        :router="true"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem
          v-for="route in menus"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import { routes } from '@/router'
import SidebarItem from './MenuItem.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()
const menus = routes

const activeMenu = computed(() => {
  const { meta, name } = route
  if (meta?.activeMenu) {
    return meta.activeMenu as string
  }
  return name as string
})
</script>