<template>
  <div id="screenfull">
    <svg-icon
      :name="isFullscreen? 'exit-fullscreen': 'fullscreen'"
      @click="click"
    />
  </div>
</template>

<script lang="ts">
import * as screenfull from 'screenfull'
import { Component, Vue } from 'vue-property-decorator'

const sf = screenfull

@Component
export default class Screenfull extends Vue {
  private isFullscreen = false

  mounted() {
    if (sf && sf.enabled) {
      sf.on('change', this.change)
    }
  }

  beforeDestory() {
    if (sf && sf.enabled) {
      sf.off('change', this.change)
    }
  }

  private change() {
    if (sf && sf.enabled) {
      this.isFullscreen = sf.isFullscreen
    }
  }

  private click() {
    if (sf) {
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
}
</script>
