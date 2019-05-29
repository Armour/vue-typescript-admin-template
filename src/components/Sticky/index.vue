<template>
  <div
    :style="{height: height+'px',zIndex: zIndex}"
  >
    <div
      :class="className"
      :style="{top: (isSticky ? stickyTop +'px' : ''),zIndex: zIndex,position: position,width: width,height: height+'px'}"
    >
      <slot>
        <div>sticky</div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Sticky extends Vue {
  @Prop({ default: 0 }) private stickyTop!: number
  @Prop({ default: 1 }) private zIndex!: number
  @Prop({ default: '' }) private className!: string

  private active = false
  private isSticky = false
  private position = ''
  private width: string | number = ''
  private height: string | number = ''

  mounted() {
    this.height = this.$el.getBoundingClientRect().height
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
  }
  activated() {
    this.handleScroll()
  }
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  }
  private sticky() {
    if (this.active) {
      return
    }
    this.position = 'fixed'
    this.active = true
    this.width = this.width + 'px'
    this.isSticky = true
  }
  private handleReset() {
    if (!this.active) {
      return
    }
    this.reset()
  }
  private reset() {
    this.position = ''
    this.width = 'auto'
    this.active = false
    this.isSticky = false
  }
  private handleScroll() {
    const width = this.$el.getBoundingClientRect().width
    this.width = width || 'auto'
    const offsetTop = this.$el.getBoundingClientRect().top
    if (offsetTop < this.stickyTop) {
      this.sticky()
      return
    }
    this.handleReset()
  }
  private handleResize() {
    if (this.isSticky) {
      this.width = this.$el.getBoundingClientRect().width + 'px'
    }
  }
}
</script>
<style lang="scss" scoped>
.sub-navbar {
  height: 50px;
  line-height: 50px;
  position: relative;
  width: 100%;
  text-align: right;
  padding-right: 20px;
  transition: 600ms ease position;
  background: linear-gradient(
    90deg,
    rgba(32, 182, 249, 1) 0%,
    rgba(32, 182, 249, 1) 0%,
    rgba(33, 120, 241, 1) 100%,
    rgba(33, 120, 241, 1) 100%
  );
}
</style>
