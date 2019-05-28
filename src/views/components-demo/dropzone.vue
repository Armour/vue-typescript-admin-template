<template>
  <div class="components-container">
    <aside>
      Based on
      <a
        class="link-type"
        href="https://github.com/rowanwins/vue-dropzone"
      >dropzone</a>
      .
      {{ $t('components.dropzoneTips') }}
    </aside>
    <div class="editor-container">
      <Dropzonec
        id="myVueDropzone"
        url="https://httpbin.org/post"
        @dropzone-removedFile="dropzoneR"
        @dropzone-success="dropzoneS"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Dropzonec from '@/components/Dropzone/index.vue'

@Component({
  components: {
    Dropzonec
  }
})
export default class Dropzone extends Vue {
  private dropzoneS(file: File) {
    console.log(file, 'file')
    this.$message({ message: 'Upload success', type: 'success' })
  }
  private dropzoneR(file: File) {
    console.log(file, 'file')
    this.$message({ message: 'Delete success', type: 'success' })
  }
}
</script>
