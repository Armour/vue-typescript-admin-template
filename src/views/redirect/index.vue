<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Redirect extends Vue {
  beforeCreate() {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  }

  render() {
    // avoid warning message
  }
}
</script>
