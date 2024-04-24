<template>
	<!-- move-bar -->
	<div
		class="move-can"
		@mouseenter="mouseenter"
		@mouseleave="mouseleave"
		@mousedown="mousedown"
		@mouseup="mouseup"
	>
		<slot />
	</div>
</template>
<script setup lang="ts">
import { ipcRenderer } from 'electron'
import { ref, watch } from 'vue'

defineOptions({
    name: 'MoveBar'
})

const enterFlag = ref(false)
const mousedownFlag = ref(false)
let timer: NodeJS.Timeout | null
/** 鼠标按压 */
const mousedown = () => {
    if (enterFlag.value) {
        ipcRenderer.invoke('window-move-open', true)
        mousedownFlag.value = true
    }
}

/** 鼠标释放 */
const mouseup = () => {
    if (enterFlag.value && mousedownFlag) {
        ipcRenderer.invoke('window-move-open', false)
        mousedownFlag.value = false
    }
}

/** 鼠标移入 */
const mouseenter = () => {
    enterFlag.value = true
}

/** 鼠标移出 */
const mouseleave = () => {
    enterFlag.value = false
    // 避免卡顿的情况下，鼠标滑出移动范围，但窗口仍跟随鼠标移动
    if (timer !== null) {
        timer = setTimeout(() => {
            mousedownFlag.value = false
            ipcRenderer.invoke('window-move-open', false)
            timer = null
        }, 1000)
    }
}

const listener = (event: MouseEvent) => {
  const clickedElement = event.target as HTMLElement
  if (!clickedElement.closest('[class="move-can"]')) {
    mousedownFlag.value = false
  }
}
watch(mousedownFlag, (newVisible) => {
  if(newVisible){
    document.addEventListener('click', listener)
  }else{
    document.removeEventListener('click', listener)
  }
})
</script>
<style lang="scss">
.move-can{
    // min-height:40px; 
    // height: 100%;
    width: 100%;
    // position: relative;
    cursor: move;
    background: linear-gradient(to right, #eff4f6, #f0f3f6);
}
</style>