<template>
  <div class="json-editor">
    <textarea ref="textarea"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import CodeMirror from 'codemirror';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/rubyblue.css';
require('script-loader!jsonlint');
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/json-lint';

@Component
export default class JsonEditor extends Vue {
  @Prop() 
  value: any;

  private jsonEditor: any = false;

  @Watch("value")
  onValue(value: any) {
    const editor_value = this.jsonEditor.getValue();
    if (value !== editor_value) {
      this.jsonEditor.setValue(JSON.stringify(this.value, null, 2));
    }
  }

  mounted() {
    this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true,
      mode: 'application/json',
      gutters: ['CodeMirror-lint-markers'],
      theme: 'rubyblue',
      lint: true
    });

    this.jsonEditor.setValue(JSON.stringify(this.value, null, 2));
    this.jsonEditor.on('change', (cm: any) => {
      this.$emit('changed', cm.getValue())
      this.$emit('input', cm.getValue())
    });
  }

  getValue() {
    return this.jsonEditor.getValue();
  }
}
</script>

<style scoped>
.json-editor{
  height: 100%;
  position: relative;
}
.json-editor >>> .CodeMirror {
  height: auto;
  min-height: 300px;
}
.json-editor >>> .CodeMirror-scroll{
  min-height: 300px;
}
.json-editor >>> .cm-s-rubyblue span.cm-string {
  color: #F08047;
}
</style>
