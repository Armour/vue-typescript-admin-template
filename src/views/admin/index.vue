<template>
  <div v-if="state">
    <DashboardPage
      v-if="state.type === 'dashboard'"
      :state="state"
    />
    <FormPage
      v-if="state.type === 'form'"
      :state="state"
    />
    <TablePage
      v-if="state.type === 'table'"
      :state="state"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { AdminModule } from '@/store/modules/admin'
import DashboardPage from '@/admin/DashboardPage/index.vue'
import FormPage from '@/admin/FormPage/index.vue'
import TablePage from '@/admin/TablePage/index.vue'

@Component({
  name: 'Admin',
  components: {
    DashboardPage,
    FormPage,
    TablePage
  }
})
export default class extends Vue {
  private state = null

  @Watch('AdminModule.adminState', { immediate: true, deep: true })
  private change(oldValue: any, newValue: any) {
    if (newValue) {
      this.state = { ...newValue }
    }
  }

  async created() {
    const requireModule = require.context('@/config', false, /\.json$/)
    const files = requireModule.keys().map(e => e.slice(2))

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (window.location.href.includes(file.split('.')[0])) {
        const storeconfig: any = require(`@/config/${file}`) // eslint-disable-line

        await AdminModule.setAdmin(storeconfig)
        await AdminModule.adminAction({ action: 'meta' })
      }
    }

    if (AdminModule.adminState.created) {
      const actions = AdminModule.adminState.created.actions || []
      for (let i = 0; i < actions.length; i++) {
        await AdminModule.adminAction({ action: actions[i] })
      }
    }

    this.state = { ...AdminModule.adminState }
  }
}
</script>
