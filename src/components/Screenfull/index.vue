<template>
  <div>
    <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import screenfull from 'screenfull'

@Component
export default class Screenfull extends Vue {
  private isFullscreen:boolean = false
  
  mounted() {
    this.init();
  }
  
  click() {
    if (!screenfull.enabled) {
      this.$message({
        message: 'you browser can not work',
        type: 'warning',
      });
      return false;
    }
    screenfull.toggle();
  }

  init() {
    if (screenfull.enabled) {
      screenfull.on('change', () => {
        this.isFullscreen = screenfull.isFullscreen;
      });
    }
  }
}
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
