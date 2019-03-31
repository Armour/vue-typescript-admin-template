<template>
  <div>
    <svg-icon :name="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import screenfull from 'screenfull'
const sf: any = screenfull

@Component
export default class Screenfull extends Vue {
  private isFullscreen: boolean = false
  
  private mounted() {
    if (sf.enabled) {
      sf.on('change', () => {
        this.isFullscreen = sf.isFullscreen
      })
    }
  }

  private click() {
    if (!sf.enabled) {
      this.$message({
        message: 'you browser can not work',
        type: 'warning'
      })
      return false
    }
    sf.toggle()
  }
}
</script>

<style lang="scss" scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
