<template>
  <div>
    <!--error code-->
    {{ a.a }}
    <!--error code-->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ErrorTestA extends Vue {}
</script>
