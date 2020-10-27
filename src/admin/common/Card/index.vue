<template>
  <el-card>
    <div slot="header">
      <span>{{ state.title }}</span>
      <div class="buttons">
        <Button
          v-for="button in state.buttons"
          :key="state.buttons.indexOf(button)"
          :state="button"
        />
      </div>
    </div>
    <slot />
  </el-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import CardState from './CardState'
import Button from '@/admin/common/Button/index.vue'

@Component({
  name: 'FromPage',
  components: {
    Button
  }
})
export default class extends Vue {
  @Prop({ required: true }) state!:CardState;
  @Watch('state', { immediate: true, deep: true })
  fresh() {
    this.$forceUpdate()
  }
}
</script>

<style lang="scss" scoped>
.buttons {
  float: right;
}
</style>
