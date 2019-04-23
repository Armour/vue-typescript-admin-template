<template>
  <div style="padding:30px;">
    <el-alert
      :closable="false"
      title="menu 1-2-1"
      type="warning"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Menu121 extends Vue {}
</script>
