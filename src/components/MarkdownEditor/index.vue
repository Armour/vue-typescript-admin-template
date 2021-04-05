<template>
  <div :id="id" />
</template>

<script lang="ts">
import 'codemirror/lib/codemirror.css' // Editor's Dependency Style
import '@toast-ui/editor/dist/toastui-editor.css' // Editor's Style
import '@toast-ui/editor/dist/i18n/es-es'
import '@toast-ui/editor/dist/i18n/it-it'
import '@toast-ui/editor/dist/i18n/ja-jp'
import '@toast-ui/editor/dist/i18n/ko-kr'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Editor, { EditorOptions } from '@toast-ui/editor'
import defaultOptions from './default-options'

const defaultId = () => 'markdown-editor-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')

@Component({
  name: 'MarkdownEditor'
})
export default class extends Vue {
  @Prop({ required: true }) private initialValue!: string
  @Prop({ default: defaultId }) private id!: string
  @Prop({ default: () => defaultOptions }) private options!: EditorOptions
  @Prop({ default: 'markdown' }) private mode!: string
  @Prop({ default: '300px' }) private height!: string
  @Prop({ default: 'en' }) private language!: string

  private markdownEditor?: Editor
  // Mapping for local lang to tuiEditor lang
  // https://github.com/nhn/tui.editor/blob/master/apps/editor/docs/i18n.md#supported-languages
  private languageTypeList: { [key: string]: string } = {
    en: 'en',
    zh: 'zh-CN',
    es: 'es',
    ja: 'ja',
    ko: 'ko',
    it: 'it'
  }

  get editorOptions() {
    const options = Object.assign({}, defaultOptions, this.options)
    options.initialEditType = this.mode
    options.height = this.height
    options.language = this.languageTypeList[this.language]
    return options
  }

  @Watch('language')
  private onLanguageChange() {
    this.destroyEditor()
    this.initEditor()
  }

  @Watch('height')
  private onHeightChange(value: string) {
    if (this.markdownEditor) {
      this.markdownEditor.height(value)
    }
  }

  @Watch('mode')
  private onModeChange(value: string) {
    if (this.markdownEditor) {
      this.markdownEditor.changeMode(value)
    }
  }

  mounted() {
    this.initEditor()
  }

  destroyed() {
    this.destroyEditor()
  }

  private initEditor() {
    const editorElement = document.getElementById(this.id)
    if (!editorElement) return
    // eslint-disable-next-line new-cap
    this.markdownEditor = new Editor({
      ...this.editorOptions,
      el: editorElement
    })
    this.markdownEditor.insertText(this.initialValue)
  }

  private destroyEditor() {
    if (!this.markdownEditor) return
    this.markdownEditor.remove()
    this.markdownEditor = undefined
  }

  public focus() {
    if (this.markdownEditor) {
      this.markdownEditor.focus()
    }
  }

  public setHtml(value: string) {
    if (this.markdownEditor) {
      this.markdownEditor.setHtml(value)
    }
  }

  public getHtml() {
    if (this.markdownEditor) {
      return this.markdownEditor.getHtml()
    }
    return ''
  }
}
</script>
