<template>
  <DashbordPage :state="state.items" />
</template>

<script lang="ts">
import Vue from 'vue'
import DashbordPage from '@/admin/DashbordPage/index.vue'

export default Vue.extend({
  components: {
    DashbordPage
  },
  data() {
    return {
      state: {
        items: [{ type: '' }]
      }
    }
  }
})
</script>
