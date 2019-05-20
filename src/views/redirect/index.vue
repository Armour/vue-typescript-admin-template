<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Redirect extends Vue {
  created() {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  }

  render() {
    // Avoid warning for missing template
  }
}
</script>
