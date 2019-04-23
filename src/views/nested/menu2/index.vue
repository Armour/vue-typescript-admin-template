<template>
  <div style="padding:30px;">
    <el-alert
      :closable="false"
      title="menu 2"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Menu2 extends Vue {}
</script>
