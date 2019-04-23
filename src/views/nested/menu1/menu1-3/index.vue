<template>
  <div style="padding:30px;">
    <el-alert
      :closable="false"
      title="menu 1-3"
      type="success"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Menu13 extends Vue {}
</script>
