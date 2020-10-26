<template>
  <el-form-item>
    <span slot="label">标题</span>
    <component :is="item" />
  </el-form-item>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import FormItemState from './FormItemState'

@Component({
  name: 'Form',
  components: {
  }
})
export default class extends Vue {
  @Prop({ required: true }) state!:FormItemState;

  item?:object
}
</script>
