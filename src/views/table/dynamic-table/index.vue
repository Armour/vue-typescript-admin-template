<template>
  <div class="app-container">
    <div style="margin:0 0 5px 20px">
      {{ $t('table.dynamicTips1') }}
    </div>
    <fixed-thead />

    <div style="margin:30px 0 5px 20px">
      {{ $t('table.dynamicTips2') }}
    </div>
    <unfixed-thead />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FixedThead from './components/FixedThead.vue'
import UnfixedThead from './components/UnfixedThead.vue'

@Component({
  components: {
    FixedThead,
    UnfixedThead
  }
})
export default class DynamicTable extends Vue {}
</script>
