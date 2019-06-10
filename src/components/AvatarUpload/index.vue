<template>
  <div
    v-show="value"
    class="vue-image-crop-upload"
  >
    <div class="vicp-wrap">
      <img-upload
        v-model="show"
        field="img"
        :width="300"
        :height="300"
        url="https://httpbin.org/post"
        :params="params"
        :headers="headers"
        img-format="png"
        @crop-success="cropSuccess"
        @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import imgUpload from 'vue-image-crop-upload'

@Component({
  name: 'AvatarUpload',
  components: {
    imgUpload
  }
})

export default class extends Vue {
  @Prop({ default: true }) private value!: boolean

  private customStyle!: Object
  private show = true
  private params = { token: '123456798', name: 'avatar' }
  private headers = { smail: '*_~' }
  private imgDataUrl = ''

  private toggleShow() {
    this.show = !this.show
  }

  private cropSuccess(imgDataUrl: string, field: string) {
    console.log('-------- crop success --------')
    this.imgDataUrl = imgDataUrl
  }

  private cropUploadSuccess(jsonData: any, field: string) {
    console.log('-------- upload success --------')
    console.log(jsonData)
    this.$emit('crop-upload-success', jsonData.files.img)
    console.log('field: ' + field)
  }

  private cropUploadFail(status: boolean, field: string) {
    console.log('-------- upload fail --------')
    console.log(status)
    console.log('field: ' + field)
  }
}
</script>
