<template>
  <div
    :id="id"
    :ref="id"
    :action="url"
    class="dropzone"
  >
    <input
      type="file"
      name="file"
    >
  </div>
</template>

<script lang="ts">
import Dropzone from 'dropzone'
import 'dropzone/dist/dropzone.css'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

Dropzone.autoDiscover = false

@Component
export default class DropzoneDemo extends Vue {
  @Prop({ required: true }) private id!: string
  @Prop({ required: true }) private url!: string
  @Prop({ default: '' }) private clickable!: boolean | string | HTMLElement | (string | HTMLElement)[]
  @Prop({ default: '上传图片' }) private defaultMsg!: string
  @Prop({ default: '' }) private acceptedFiles!: string
  @Prop({ default: 200 }) private thumbnailHeight!: number
  @Prop({ default: 200 }) private thumbnailWidth!: number
  @Prop({ default: true }) private showRemoveLink!: boolean
  @Prop({ default: 2 }) private maxFilesize!: number
  @Prop({ default: 3 }) private maxFiles!: number
  @Prop({ default: true }) private autoProcessQueue!: boolean
  @Prop({ default: false }) private useCustomDropzoneOptions!: boolean
  @Prop({ default: '' }) private defaultImg!: string[]
  @Prop({ default: false }) private couldPaste!: boolean
  private dropzone?: Dropzone
  private initOnce = true

  mounted() {
    const element: HTMLElement | null = document.getElementById(this.id)
    if (element == null) return
    this.dropzone = new Dropzone(element)
    if (this.dropzone) {
      this.dropzone.defaultOptions = {
        clickable: this.clickable,
        thumbnailWidth: this.thumbnailWidth,
        thumbnailHeight: this.thumbnailHeight,
        maxFiles: this.maxFiles,
        maxFilesize: this.maxFilesize,
        dictRemoveFile: 'Remove',
        addRemoveLinks: this.showRemoveLink,
        acceptedFiles: this.acceptedFiles,
        autoProcessQueue: this.autoProcessQueue,
        addedfile: (file: Dropzone.DropzoneFile) => console.log('Addedfile'),
        thumbnail: (file: Dropzone.DropzoneFile, dataUrl: string) => console.log('Thumbnail'),
        dictDefaultMessage:
          '<i style="margin-top: 3em;display: inline-block" class="material-icons">' +
          this.defaultMsg +
          '</i><br>Drop files here to upload',
        dictMaxFilesExceeded: '只能一个图',
        previewTemplate:
          '<div class="dz-preview dz-file-preview">  <div class="dz-image" style="width:' +
          this.thumbnailWidth +
          'px;height:' +
          this.thumbnailHeight +
          'px" ><img style="width:' +
          this.thumbnailWidth +
          'px;height:' +
          this.thumbnailHeight +
          'px" data-dz-thumbnail /></div>  <div class="dz-details"><div class="dz-size"><span data-dz-size></span></div> <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>  <div class="dz-error-message"><span data-dz-errormessage></span></div>  <div class="dz-success-mark"> <i class="material-icons">done</i> </div>  <div class="dz-error-mark"><i class="material-icons">error</i></div></div>',
        init() {
          this.files.forEach(f => {
            if (f.xhr) {
              console.log(f.xhr.readyState)
            }
            if (f.accepted) {
              f.previewElement.classList.add('accepted')
              f.previewTemplate.classList.add('accepted')
              f.previewsContainer.classList.add('accepted')
            } else {
              console.log(f.status.toUpperCase())
            }
          })

          const firstFile = this.files[0]
          this.addFile(firstFile)
        },
        accept: (file: File, done: (error?: string | Error) => void) => {
          done()
        },
        sending: (file: File, xhr: XMLHttpRequest, formData: FormData) => {
          this.initOnce = false
        }
      }
    }
    if (this.couldPaste) {
      document.addEventListener('paste', this.pasteImg)
    }
    if (this.dropzone) {
      this.dropzone.on('success', (file: Dropzone.DropzoneFile) => {
        this.$emit('dropzone-success', file, this.dropzone)
      })
      this.dropzone.on('addedfile', (file: Dropzone.DropzoneFile) => {
        this.$emit('dropzone-fileAdded', file)
      })
      this.dropzone.on('removedfile', (file: Dropzone.DropzoneFile) => {
        this.$emit('dropzone-removedFile', file)
      })
      this.dropzone.on('error', (file: Dropzone.DropzoneFile, error: string | Error, xhr: XMLHttpRequest) => {
        this.$emit('dropzone-error', file, error, xhr)
      })
      this.dropzone.on('successmultiple', (file: Dropzone.DropzoneFile, error: string | Error, xhr: XMLHttpRequest) => {
        this.$emit('dropzone-successmultiple', file, error, xhr)
      })
    }
  }

  @Watch('defaultImg')
  private onDefaultImgChange(val: string[]) {
    if (val.length === 0) {
      this.initOnce = false
      return
    }
    if (!this.initOnce) return
    this.initImages(val)
    this.initOnce = false
  }
  destroyed() {
    document.removeEventListener('paste', this.pasteImg)
    if (this.dropzone) {
      this.dropzone.destroy()
    }
  }
  private removeAllFiles() {
    if (this.dropzone) {
      this.dropzone.removeAllFiles(true)
    }
  }
  private processQueue() {
    if (this.dropzone) {
      this.dropzone.processQueue()
    }
  }
  private pasteImg(event: any) {
    const items = (event.clipboardData || event.originalEvent.clipboardData).items
    if (items[0].kind === 'file' && this.dropzone) {
      this.dropzone.addFile(items[0].getAsFile())
    }
  }
  private initImages(val?: string[]) {
    if (!val) return
    const mockFile: any = { name: 'name', size: 12345, url: val }
    if (Array.isArray(val)) {
      val.map((v, i) => {
        if (this.dropzone) {
          this.dropzone.addFile(mockFile)
          mockFile.previewElement.classList.add('dz-success')
          mockFile.previewElement.classList.add('dz-complete')
        }
        return true
      })
    } else {
      if (this.dropzone) {
        this.dropzone.addFile(mockFile)
        mockFile.previewElement.classList.add('dz-success')
        mockFile.previewElement.classList.add('dz-complete')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dropzone {
  border: 2px solid #e5e5e5;
  font-family: 'Roboto', sans-serif;
  color: #777;
  transition: background-color 0.2s linear;
  padding: 5px;
  &:hover {
    background-color: #f6f6f6;
  }
  .dz-image {
    img {
      width: 100%;
      height: 100%;
    }
  }
  input[name='file'] {
    display: none;
  }
  .dz-preview {
    .dz-image {
      border-radius: 0px;
    }
    .dz-filename span,
    .dz-details .dz-size span {
      background-color: transparent;
    }
    .dz-success-mark,
    .dz-error-mark {
      margin-left: -40px;
      margin-top: -50px;
    }
    .dz-success-mark i,
    .dz-error-mark i {
      color: white;
      font-size: 5rem;
    }
    &:hover {
      .dz-image {
        img {
          transform: none;
          filter: none;
          width: 100%;
          height: 100%;
        }
      }
      .dz-remove {
        opacity: 1;
      }
    }
    .dz-details {
      bottom: 0px;
      top: 0px;
      color: white;
      background-color: rgba(33, 150, 243, 0.8);
      transition: opacity 0.2s linear;
      text-align: left;
      .dz-filename {
        &:not(:hover) {
          span {
            border: none;
          }
        }
        &:hover {
          span {
            background-color: transparent;
            border: none;
          }
        }
      }
    }
    .dz-remove {
      position: absolute;
      z-index: 30;
      color: white;
      margin-left: 15px;
      padding: 10px;
      top: inherit;
      bottom: 15px;
      border: 2px white solid;
      text-decoration: none;
      text-transform: uppercase;
      font-size: 0.8rem;
      font-weight: 800;
      letter-spacing: 1.1px;
      opacity: 0;
    }
  }
}
i {
  color: #ccc;
}
</style>
