<script lang="ts" setup>
import { computed } from 'vue'
//
import { type RouteRecordRaw } from 'vue-router'
//
import SvgIcon from '@/components/SvgIcon/index.vue'
//
defineOptions({
  name: 'SidebarItem',
})
interface Props {
  item: RouteRecordRaw;
  isCollapse?: boolean;
  isFirstLevel?: boolean;
  basePath?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isCollapse: false,
  isFirstLevel: true,
  basePath: '',
})

/** 是否始终显示根菜单 */
const alwaysShowRootMenu = computed(() => props.item.meta?.alwaysShow)

/** 显示的子菜单 */
const showingChildren = computed(() => {
  return props.item.children?.filter((child) => !child.meta?.hidden) ?? []
})

/** 显示的子菜单数量 */
const showingChildNumber = computed(() => {
  return showingChildren.value.length
})

/** 唯一的子菜单项 */
const theOnlyOneChild = computed(() => {
  const number = showingChildNumber.value
  switch (true) {
    case number > 1:
      return null
    case number === 1:
      return showingChildren.value[0]
    default:
      return { ...props.item, path: '/' }
  }
})
</script>

<template>
	<div
		v-if="!props.item.meta?.hidden"
		:class="{
			'simple-mode': props.isCollapse,
			'first-level': props.isFirstLevel,
		}"
	>
		<template
			v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children"
		>
			<el-menu-item
				:index="theOnlyOneChild.name"
				:route="item"
			>
				<div
					v-if="theOnlyOneChild?.meta?.svgIcon"
					class="el-icon"
				>
					<SvgIcon :name="theOnlyOneChild?.meta?.svgIcon as string" />
				</div>
				<component
					:is="theOnlyOneChild.meta.elIcon"
					v-else-if="theOnlyOneChild?.meta?.elIcon"
					class="el-icon"
				/>
				<template
					v-if="theOnlyOneChild?.meta?.title"
					#title
				>
					<span
						:class="{
							'myself-menu-item':
								!theOnlyOneChild.meta.elIcon && !theOnlyOneChild.meta.svgIco,
						}"
					>{{ theOnlyOneChild.meta.title }}</span>
				</template>
			</el-menu-item>
		</template>
		<el-sub-menu
			v-else
			:index="props.item.name"
			teleported
		>
			<template #title>
				<div
					v-if="props.item.meta?.svgIcon"
					class="el-icon"
				>
					<SvgIcon :name="props?.item?.meta?.svgIcon as string" />
				</div>
				<component
					:is="props.item.meta.elIcon"
					v-else-if="props.item.meta?.elIcon"
					class="el-icon"
				/>
				<span v-if="props.item.meta?.title">{{ props.item.meta.title }}</span>
			</template>
			<template v-if="props.item.children">
				<sidebar-item
					v-for="child in props.item.children"
					:key="child.path"
					:item="child"
					:is-collapse="props.isCollapse"
					:is-first-level="false"
					:base-path="child.path"
				/>
			</template>
		</el-sub-menu>
	</div>
</template>

<style lang="scss" scoped>
.svg-icon {
  min-width: 1em;
  margin-right: 12px;
  font-size: 18px;
}
.el-icon {
  width: 1em;
  margin-right: 10px;
  font-size: 16px;
  margin-bottom: 1px;
}
.simple-mode {
  &.first-level {
    :deep(.el-sub-menu) {
      .el-sub-menu__icon-arrow {
        display: none;
      }
      span {
        visibility: hidden;
      }
    }
  }
}
</style>
