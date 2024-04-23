<script lang="ts" setup>
//
import { ipcRenderer } from 'electron'
//
import { ref } from 'vue'
//
import { User } from '@element-plus/icons-vue'
//
import SvgIcon from '@/components/SvgIcon/index.vue'
//
const isMax = ref(false)

const closed = () => {

    ipcRenderer.send('window-all-closed')
}

const toMinimize = () => {
    ipcRenderer.send('minimize')
}
const toMaximize = () => {
    isMax.value = true
    ipcRenderer.send('maximize')
}
const restore = () => {
    isMax.value = false
    ipcRenderer.send('restore')
}
</script>
<template>
	<div class="task-tool">
		<div class="right">
			<div class="bar login-bar">
				<el-icon>
					<User />
				</el-icon>
			</div>      
			<div
				class="bar"
				@click="toMinimize"
			>
				<svg-icon name="MinimizeFilled" />
			</div> 
			<div
				v-if="isMax"
				class="bar"
				@click="restore"
			>
				<svg-icon name="FullscreenExitSharp" />
			</div>
			<div
				v-else
				class="bar"
				@click="toMaximize"
			>
				<svg-icon name="FullscreenRound" />
			</div>
			<div
				class="bar"
				@click="closed"
			>
				<svg-icon name="CloseSharp" />
			</div>
		</div>
	</div>
</template>
<style lang="scss">
.task-tool{
    height:40px; 
    width: calc(100vw - 200px);
    box-sizing: border-box;
    line-height: 40px; 
    font-size: 16px;
    .right{
        display: flex;
        background-color:rgb(247, 249, 252);     
        background: linear-gradient(to right, #eff4f6, #f0f3f6);
        font-size: 16px;
        justify-content: flex-end;
        cursor: default;
        .login-bar{
            font-size: 12px;
        }
        .bar{
            padding: 5px 15px;
        }
        .bar:hover{
            background-color:#eee;
        }
    }
}
</style>