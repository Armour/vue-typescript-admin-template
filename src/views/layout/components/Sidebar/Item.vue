<template>
  <div>
    <svg-icon v-if="icon" :name="icon"/>
    <span v-if="title" slot="title">{{title}}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class MenuItem extends Vue {
  @Prop({ default: '' }) private icon!: string;
  @Prop({ default: '' }) private title!: string;
}
</script>
