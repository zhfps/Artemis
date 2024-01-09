<template>
  <div class="layout">
    <!-- header -->
    <SideBar />
    <div class="main-page">
      <!-- content -->
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import SideBar from './components/SideBar.vue'

</script>

  
  
  