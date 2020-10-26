<template>
  <el-card />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import FormPageState from './FormPageState'

@Component({
  name: 'FromPage',
  components: {
  }
})
export default class extends Vue {
  @Prop({ required: true }) state!:FormPageState;
}
</script>
