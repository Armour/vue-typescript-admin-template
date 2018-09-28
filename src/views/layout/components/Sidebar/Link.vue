<template>
  <a v-if="isExternalLink(to)" :href="to" target="_blank" rel="noopener">
    <slot/>
  </a>
  <router-link v-else :to="to">
    <slot/>
  </router-link>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { validateURL } from '@/utils/validate';

@Component
export default class Link extends Vue {
  @Prop({ required: true }) to!: string;

  isExternalLink(routePath: string) {
    return validateURL(routePath);
  }
}
</script>
