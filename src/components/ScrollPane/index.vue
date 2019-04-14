<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel.native.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { EventEmitter } from 'events'

const padding: number = 15

@Component
export default class ScrollPane extends Vue {
  private handleScroll(e: MouseWheelEvent) {
    const eventDelta: number = (e as any).wheelDelta || -e.deltaY * 40
    const scrollContainer: Vue = this.$refs.scrollContainer as Vue
    const scrollWrapper: HTMLElement = scrollContainer.$refs.wrap as HTMLElement
    scrollWrapper.scrollLeft = scrollWrapper.scrollLeft + eventDelta / 4
  }

  public moveToTarget($target: HTMLElement) {
    const scrollContainer: Vue = this.$refs.scrollContainer as Vue
    const container: HTMLElement = scrollContainer.$el as HTMLElement
    const containerWidth: number = container.offsetWidth
    const scrollWrapper: HTMLElement = scrollContainer.$refs.wrap as HTMLElement
    const targetLeft: number = $target.offsetLeft
    const targetWidth: number = $target.offsetWidth
    if (targetLeft > containerWidth) {
      // tag in the right
      scrollWrapper.scrollLeft = targetLeft - containerWidth + targetWidth + padding
    } else {
      // tag in the left
      scrollWrapper.scrollLeft = targetLeft - padding
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
}

.scroll-container >>> .el-scrollbar__bar {
  bottom: 0px;
}

.scroll-container >>> .el-scrollbar__wrap {
  height: 49px;
}
</style>
