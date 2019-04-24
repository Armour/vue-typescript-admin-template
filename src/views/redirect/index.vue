<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Redirect extends Vue {
  private beforeCreate() {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  }

  private render() {
    // avoid warning message
  }
}
</script>
