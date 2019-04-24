<template>
  <div>
    <!--error code-->
    {{ b = b.b }}
    <!--error code-->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ErrorTestB extends Vue {}
</script>
