<template>
  <div
    :class="[{'is-active': isActive}, 'hamburger-container']"
    @click="toggleClick"
  >
    <svg-icon
      name="hamburger"
      width="20"
      height="20"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Hamburger extends Vue {
  @Prop({ default: false }) private isActive!: boolean;
  @Prop({ default: null }) private toggleClick!: () => void;
}
</script>

<style lang="scss" scoped>
.hamburger-container {
  cursor: pointer;
}

.hamburger-container.is-active {
  transform: rotate(180deg);
}
</style>
