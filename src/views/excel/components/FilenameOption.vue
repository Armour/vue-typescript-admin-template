<template>
  <div style="display:inline-block;">
    <label
      class="radio-label"
      style="padding-left:0;"
    >Filename: </label>
    <el-input
      v-model="filename"
      placeholder="Please enter the file name (default excel-list)"
      style="width:345px;"
      prefix-icon="el-icon-document"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class FilenameOption extends Vue {
  @Prop({ default: '' }) value!: string

  get filename() {
    return this.value
  }
  set filename(value) {
    this.$emit('input', value)
  }
}
</script>
