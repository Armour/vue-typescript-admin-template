<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { AdminModule } from '@/store/modules/admin'

@Component({
  name: 'Admin'
})
export default class extends Vue {
  private config = {
    meta: {}
  }

  @Watch('AdminModule.admin', { immediate: true, deep: true })
  private change() {
    this.config = { ...AdminModule.admin }
  }

  async created() {
    const requireModule = require.context('@/config', false, /\.json$/)
    const files = requireModule.keys().map(e => e.slice(2))

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (window.location.href.includes(file.split('.')[0])) {
        const storeconfig: any = require(`@/config/${file}`) // eslint-disable-line

        await AdminModule.CHANGE_ADMIN(storeconfig)
        // await AdminModule.action({ action: 'meta' })
      }
    }

    this.config = { ...AdminModule.admin }

    if (AdminModule.admin) {
      AdminModule.admin.created.actions.forEach((item: string) => {
        AdminModule.action({ action: item })
      })
    }
  }
}
</script>
