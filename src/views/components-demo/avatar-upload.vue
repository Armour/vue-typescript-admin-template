<template>
  <div class="components-container">
    <aside>
      This is based on
      <a
        class="link-type"
        href="//github.com/dai-siki/vue-image-crop-upload"
      >
        vue-image-crop-upload
      </a>
    </aside>
    <pan-thumb :image="image" />
    <el-button
      type="primary"
      icon="upload"
      tyle="position: absolute;bottom: 15px;margin-left: 40px;"
      @click="imagecropperShow=true"
    >
      Change Avatar
    </el-button>

    <avatar-upload
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="300"
      :height="300"
      url="https://httpbin.org/post"
      lang-type="en"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AvatarUpload from '@/components/AvatarUpload/index.vue'
import PanThumb from '@/components/PanThumb/index.vue'

@Component({
  name: 'AvatarUploadDemo',
  components: {
    AvatarUpload,
    PanThumb
  }
})
export default class extends Vue {
  private imagecropperShow = false
  private imagecropperKey = 0
  private image = 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'

  private cropSuccess(resData: string) {
    this.imagecropperShow = false
    this.imagecropperKey = this.imagecropperKey + 1
    this.image = resData
  }

  private close() {
    this.imagecropperShow = false
  }
}
</script>

<style scoped>
.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>
