<template>
	<div class="layout">
		<!-- header -->
		<SideBar />
		<div class="main-page">
			<!-- top-bar -->
			<div class="header">
				<move-bar>
					<top-bar />
				</move-bar>
			</div>     
			<!-- content -->
			<div class="content">
				<router-view />
			</div>
		</div>
	</div>
</template>
  
<script setup lang="ts">

import SideBar from './components/SideBar.vue'
import MoveBar from '@/components/MoveBar/index.vue'
import TopBar from '@/components/TopBar/index.vue'

</script>
<style lang="scss" scoped>
 @import url('./index.scss');
</style>
  