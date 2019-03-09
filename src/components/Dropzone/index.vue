<template>
  <div :ref="id" :action="url" :id="id" class="dropzone">
    <input type="file" name="file">
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DropzoneNoWrapper from 'dropzone';
import 'dropzone/dist/dropzone.css';
// import { getToken } from 'api/qiniu';

DropzoneNoWrapper.autoDiscover = false;

@Component
export default class Dropzone extends Vue {
  @Prop({ required: true })
  id!: string;
  @Prop({ required: true })
  url!: string;
  @Prop({ default: true })
  clickable!: boolean;
  @Prop({ default: '上传图片' })
  defaultMsg!: string;
  @Prop({ default: '' })
  acceptedFiles!: string;
  @Prop({ default: 200 })
  thumbnailHeight!: number;
  @Prop({ default: 200 })
  thumbnailWidth!: number;
  @Prop({ default: true })
  showRemoveLink!: boolean;
  @Prop({ default: 2 })
  maxFilesize!: number;
  @Prop({ default: 3 })
  maxFiles!: number;
  @Prop({ default: true })
  autoProcessQueue!: boolean;
  @Prop({ default: false })
  useCustomDropzoneOptions!: boolean;
  @Prop({ default: '' })
  defaultImg!: string|Array<any>;
  @Prop({ default: false })
  couldPaste!: boolean;

  private dropzone: DropzoneNoWrapper | null = null;
  private initOnce: boolean = true;

  @Watch('defaultImg')
  onDefaultImg(val: any[] | string) {
    if (val.length === 0) {
      this.initOnce = false;
      return;
    }
    if (!this.initOnce) return;
    this.initImages(val);
    this.initOnce = false;
  }

  mounted() {
    const element = document.getElementById(this.id);
    const vm = this;
    this.dropzone = new DropzoneNoWrapper(element, {
      clickable: this.clickable,
      thumbnailWidth: this.thumbnailWidth,
      thumbnailHeight: this.thumbnailHeight,
      maxFiles: this.maxFiles,
      maxFilesize: this.maxFilesize,
      dictRemoveFile: 'Remove',
      addRemoveLinks: this.showRemoveLink,
      acceptedFiles: this.acceptedFiles,
      autoProcessQueue: this.autoProcessQueue,
      dictDefaultMessage: '<i style="margin-top: 3em;display: inline-block" class="material-icons">' + this.defaultMsg + '</i><br>Drop files here to upload',
      dictMaxFilesExceeded: '只能一个图',
      previewTemplate: '<div class="dz-preview dz-file-preview">  <div class="dz-image" style="width:' + this.thumbnailWidth + 'px;height:' + this.thumbnailHeight + 'px" ><img style="width:' + this.thumbnailWidth + 'px;height:' + this.thumbnailHeight + 'px" data-dz-thumbnail /></div>  <div class="dz-details"><div class="dz-size"><span data-dz-size></span></div> <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>  <div class="dz-error-message"><span data-dz-errormessage></span></div>  <div class="dz-success-mark"> <i class="material-icons">done</i> </div>  <div class="dz-error-mark"><i class="material-icons">error</i></div></div>',
      init() {
        const val = vm.defaultImg;
        if (!val) return;
        if (Array.isArray(val)) {
          if (val.length === 0) return;
          val.map((v, i) => {
            const mockFile = { name: 'name' + i, size: 12345, url: v };
            this.options.addedfile.call(this, mockFile);
            this.options.thumbnail.call(this, mockFile, v);
            (mockFile as any).previewElement.classList.add('dz-success');
            (mockFile as any).previewElement.classList.add('dz-complete');
            vm.initOnce = false;
            return true;
          });
        } else {
          const mockFile = { name: 'name', size: 12345, url: val };
          this.options.addedfile.call(this, mockFile);
          this.options.thumbnail.call(this, mockFile, val);
          (mockFile as any).previewElement.classList.add('dz-success');
          (mockFile as any).previewElement.classList.add('dz-complete');
          vm.initOnce = false;
        }
      },
      accept: (file: any, done: any) => {
        /* 七牛*/
        // const token = this.$store.getters.token;
        // getToken(token).then(response => {
        //   file.token = response.data.qiniu_token;
        //   file.key = response.data.qiniu_key;
        //   file.url = response.data.qiniu_url;
        //   done();
        // })
        done();
      },
      sending: (file: any, xhr: XMLHttpRequest, formData: any) => {
        // formData.append('token', file.token);
        // formData.append('key', file.key);
        vm.initOnce = false;
      },
    });

    if (this.couldPaste) {
      document.addEventListener('paste', this.pasteImg);
    }

    this.dropzone.on('success', (file: Dropzone.DropzoneFile) => {
      vm.$emit('dropzone-success', file, vm.dropzone.element);
    });
    this.dropzone.on('addedfile', (file: Dropzone.DropzoneFile) => {
      vm.$emit('dropzone-fileAdded', file);
    });
    this.dropzone.on('removedfile', (file: Dropzone.DropzoneFile) => {
      vm.$emit('dropzone-removedFile', file);
    });
    this.dropzone.on('error', (file: Dropzone.DropzoneFile, error: string | Error) => {
      vm.$emit('dropzone-error', file, error);
    });
    this.dropzone.on('successmultiple', (files: Dropzone.DropzoneFile[]) => {
      vm.$emit('dropzone-successmultiple', files);
    });
  }
  destroyed() {
    document.removeEventListener('paste', this.pasteImg);
    this.dropzone.destroy();
  }

  removeAllFiles() {
    this.dropzone.removeAllFiles(true);
  }
  processQueue() {
    this.dropzone.processQueue();
  }
  pasteImg(event: ClipboardEvent) {
    const items = (event.clipboardData || (event as any).originalEvent.clipboardData).items;
    if (items[0].kind === 'file') {
      this.dropzone.addFile(items[0].getAsFile());
    }
  }
  initImages(val: any[] | string) {
    if (!val) return;
    if (Array.isArray(val)) {
      val.map((v, i) => {
        const mockFile = { name: 'name' + i, size: 12345, url: v };
        this.dropzone.options.addedfile.call(this.dropzone, mockFile);
        this.dropzone.options.thumbnail.call(this.dropzone, mockFile, v);
        (mockFile as any).previewElement.classList.add('dz-success');
        (mockFile as any).previewElement.classList.add('dz-complete');
        return true;
      });
    } else {
      const mockFile = { name: 'name', size: 12345, url: val };
      this.dropzone.options.addedfile.call(this.dropzone, mockFile);
      this.dropzone.options.thumbnail.call(this.dropzone, mockFile, val);
      (mockFile as any).previewElement.classList.add('dz-success');
      (mockFile as any).previewElement.classList.add('dz-complete');
    }
  }
}
</script>

<style scoped>
    .dropzone {
        border: 2px solid #E5E5E5;
        font-family: 'Roboto', sans-serif;
        color: #777;
        transition: background-color .2s linear;
        padding: 5px;
    }

    .dropzone:hover {
        background-color: #F6F6F6;
    }

    i {
        color: #CCC;
    }

    .dropzone .dz-image img {
        width: 100%;
        height: 100%;
    }

    .dropzone input[name='file'] {
        display: none;
    }

    .dropzone .dz-preview .dz-image {
        border-radius: 0px;
    }

    .dropzone .dz-preview:hover .dz-image img {
        transform: none;
        -webkit-filter: none;
        width: 100%;
        height: 100%;
    }

    .dropzone .dz-preview .dz-details {
        bottom: 0px;
        top: 0px;
        color: white;
        background-color: rgba(33, 150, 243, 0.8);
        transition: opacity .2s linear;
        text-align: left;
    }

    .dropzone .dz-preview .dz-details .dz-filename span, .dropzone .dz-preview .dz-details .dz-size span {
        background-color: transparent;
    }

    .dropzone .dz-preview .dz-details .dz-filename:not(:hover) span {
        border: none;
    }

    .dropzone .dz-preview .dz-details .dz-filename:hover span {
        background-color: transparent;
        border: none;
    }

    .dropzone .dz-preview .dz-remove {
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

    .dropzone .dz-preview:hover .dz-remove {
        opacity: 1;
    }

    .dropzone .dz-preview .dz-success-mark, .dropzone .dz-preview .dz-error-mark {
        margin-left: -40px;
        margin-top: -50px;
    }

    .dropzone .dz-preview .dz-success-mark i, .dropzone .dz-preview .dz-error-mark i {
        color: white;
        font-size: 5rem;
    }
</style>
