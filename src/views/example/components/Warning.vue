<template>
  <aside>
    {{ $t('example.warning') }}
    <a
      href="https://panjiachen.github.io/vue-element-admin-site/guide/essentials/tags-view.html"
      target="_blank"
    >Document</a>
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ExampleWarning extends Vue {}
</script>
