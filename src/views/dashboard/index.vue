<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import AdminDashboard from './admin/index.vue'
import EditorDashboard from './editor/index.vue'

@Component({
  components: {
    AdminDashboard,
    EditorDashboard
  }
})
export default class Dashboard extends Vue {
  private currentRole = 'AdminDashboard'

  get roles() {
    return UserModule.roles
  }

  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'EditorDashboard'
    }
  }
}
</script>
