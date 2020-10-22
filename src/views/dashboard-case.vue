<template>
  <DashboardPage :state="state" />
</template>

<script lang="ts">
import Vue from 'vue'
import DashboardPage from '@/admin/DashboardPage/index.vue'

export default Vue.extend({
  components: {
    DashboardPage
  },
  data() {
    return {
      state: {
        items: [
          { position: { x: 0, y: 0, w: 1, h: 1 } },
          { position: { x: 2, y: 0, w: 2, h: 4 } },
          { position: { x: 4, y: 0, w: 4, h: 4 } }
        ]
      }
    }
  }
})
</script>
