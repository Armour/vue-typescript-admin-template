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
import UserDashboard from './user/index.vue'

@Component({
  name: 'Dashboard',
  components: {
    AdminDashboard,
    EditorDashboard,
    UserDashboard
  }
})
export default class extends Vue {
  private currentRole = 'admin-dashboard'

  get roles() {
    return UserModule.roles
  }

  created() {
    if (!this.roles.includes('editor')) {
      this.currentRole = 'editor-dashboard'
    }
    if (!this.roles.includes('user')) {
      this.currentRole = 'user-dashboard'
    }
  }
}
</script>
