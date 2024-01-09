<template>
    <div class="move-can" @mouseenter="mouseenter" @mouseleave="mouseleave" @mousedown="mousedown" @mouseup="mouseup" >
      <slot/>
    </div>
</template>
<script setup lang="ts">
import { ipcRenderer } from 'electron'
import { ref } from 'vue'

defineOptions({
    name: 'MoveBar'
})


const enterFlag = ref(false)
const mousedownFlag = ref(false)
let timer: NodeJS.Timeout | null
/**鼠标按压 */
const mousedown = () => {
    if (enterFlag.value) {
        ipcRenderer.invoke('window-move-open', true)
        mousedownFlag.value = true
    }
}

/**鼠标释放 */
const mouseup = () => {
    if (enterFlag.value && mousedownFlag) {
        ipcRenderer.invoke('window-move-open', false)
        mousedownFlag.value = false
    }
}

/**鼠标移入 */
const mouseenter = () => {
    enterFlag.value = true
}

/**鼠标移出 */
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
</script>
<style lang="scss">
.move-can{
    height: 20px;
    width: 100%;
    cursor: move;
}
</style>