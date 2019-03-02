<template>
  <div :id="id"/>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
// deps for editor
import 'codemirror/lib/codemirror.css'; // codemirror
import 'tui-editor/dist/tui-editor.css'; // editor ui
import 'tui-editor/dist/tui-editor-contents.css'; // editor content

import Editor from 'tui-editor';
import defaultOptions from './defaultOptions';

@Component
export default class MarddownEditor extends Vue {
  @Prop({ default: '' })
  value!:  string;
  @Prop({ default: () => 'markdown-editor-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '') })
  id!:  string;
  @Prop({ default: () => defaultOptions })
  options!: object;
  @Prop({ default: 'markdown' })
  mode!:  string;
  @Prop({ default: '300px' })
  height!:  string;
  @Prop({ default: 'en_US' })
  language!:  string;
  
  private editor: any = null;
  
  get editorOptions() {
    const options = Object.assign({}, defaultOptions, this.options) as any;
    options.initialEditType = this.mode;
    options.height = this.height;
    options.language = this.language;
    return options;
  }
    
  @Watch('value')
  onValue(newValue: string, preValue: string) {
    if (newValue !== preValue && newValue !== this.editor.getValue()) {
      this.editor.setValue(newValue);
    }
  }
    
  @Watch('language')
  onLanguage(val: any) {
    this.destroyEditor();
    this.initEditor();
  }
    
  @Watch('height')
  onHeight(newValue: string) {
    this.editor.height(newValue);
  }
    
  @Watch('mode')
  onMode(newValue: string) {
    this.editor.changeMode(newValue);
  }
    
  mounted() {
    this.initEditor();
  }

  destroyed() {
    this.destroyEditor();
  }
  
  initEditor() {
    this.editor = new Editor({
      el: document.getElementById(this.id),
      ...this.editorOptions,
    });
    if (this.value) {
      this.editor.setValue(this.value);
    }
    this.editor.on('change', () => {
      this.$emit('input', this.editor.getValue());
    });
  }
  destroyEditor() {
    if (!this.editor) return;
    this.editor.off('change');
    this.editor.remove();
  }
  setValue(value: string) {
    this.editor.setValue(value);
  }
  getValue() {
    return this.editor.getValue();
  }
  setHtml(value: string) {
    this.editor.setHtml(value);
  }
  getHtml() {
    return this.editor.getHtml();
  }
}
</script>
