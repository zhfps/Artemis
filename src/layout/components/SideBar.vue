<template>
	<div class="side-bar">
		<div class="app-info">
			<move-bar class="detail">
				<!-- <div class="detail"> -->
				<el-avatar
					class="icon"
					:size="35"
				>
					<el-image :src="logo">
						<template #error>
							<div class="image-slot">
								<el-icon>
									<Picture />
								</el-icon>
							</div>
						</template>
					</el-image>
				</el-avatar>
				<!--  -->
				<div class="info">
					Artemis(Beta)
				</div>
				<!-- </div> -->
			</move-bar>
		</div>
    
		<el-scrollbar wrap-class="scrollbar-wrapper">
			<el-menu
				class="my-menu"
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
import { Picture } from '@element-plus/icons-vue'
import SidebarItem from './MenuItem.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import logo from '@/assets/logo.png'
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
<style lang="scss">
.app-info {
  padding: 10px 15px 10px 15px;
  display: flex;
  align-items: last baseline;
  justify-content: space-between;
  height: 50px;
  background-color: rgb(240, 243, 246);
  .detail {
    display: flex;
    height: 50px;
    align-items: center;
    .icon {
      background-color: rgba(252, 61, 73, 1);
    }
    .info {
      margin-left: 10px;
      font-size: 14px;
      font-family: "Lucida Handwriting", cursive, "Arial", "黑体", sans-serif;
      font-weight: bolder;
    }
  }
}
.my-menu {
  margin-top: 10px;
  width: 100%;
  background-color: rgb(240, 243, 246);
  color: rgb(179, 184, 193);
  .el-menu-item {
    background-color: rgb(240, 243, 246);
    width: 80%;
    margin: 15px auto;
    font-family: 'yahei';
    font-weight: 500;
    color: rgb(120, 127, 141);
  }
  .el-sub-menu {
    background-color: rgb(240, 243, 246);
    width: 80%;
    margin: 15px auto;
    font-family: 'yahei';
    font-weight: 500;
    border-radius: 5px;
    .el-sub-menu__title{
      border-radius: 5px;
      color: rgb(120, 127, 141);
    }
    .el-menu {
      background-color: rgb(240, 243, 246);
      border-radius: 5px;
      .el-menu-item {
        background-color: rgb(240, 243, 246);
        width: 100%;
        margin: 15px auto;
        font-family: 'yahei';
        font-weight: 500;
        color: rgb(120, 127, 141);
      }
      .is-active {
        background-color: rgb(252, 61, 73);
        color: #fff;
        border-radius: 5px;
      }
    }
  }
  .is-active {
    background-color: rgb(252, 61, 73);
    color: #fff;
    border-radius: 5px;
  }
  .is-opened {
    background-color: rgb(240, 243, 246);
    border-radius: 5px;
  }
}
.scrollbar-wrapper {
  background-color: rgb(240, 243, 246);
}
</style>
