<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AuthRedirect extends Vue {
  private created() {
    const hash = window.location.search.slice(1)
    if (window.localStorage) {
      window.localStorage.setItem('x-admin-oauth-code', hash)
      window.close()
    }
  }

  private render() {
    // avoid warning message
  }
}
</script>
