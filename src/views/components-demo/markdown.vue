<template>
  <div class="components-container">
    <aside>
      Markdown is based on
      <a
        href="https://github.com/nhnent/tui.editor"
        target="_blank"
      >tui.editor</a>, simply wrapped with Vue.
      <a
        target="_blank"
        href="https://armour.github.io/vue-typescript-admin-docs/features/components/markdown-editor.html"
      >
        Documentation </a>
    </aside>

    <div class="editor-container">
      <el-tag class="tag-title">
        Basic:
      </el-tag>
      <markdown-editor
        ref="markdownEditor"
        :initialValue="content1"
        height="400px"
      />
    </div>

    <el-button
      type="primary"
      icon="el-icon-document"
      @click="getHtml"
    >
      Get HTML
    </el-button>
    <!-- eslint-disable vue/no-v-html -->
    <div v-html="html"/>

    <div class="editor-container" style="margin-top:20px;">
      <el-tag class="tag-title">
        Markdown Mode:
      </el-tag>
      <markdown-editor
        :initialValue="content2"
        :options="{hideModeSwitch: true, previewStyle: 'tab'}"
        height="200px"
      />
    </div>

    <div class="editor-container">
      <el-tag class="tag-title">
        Customize Toolbar:
      </el-tag>
      <markdown-editor
        :initialValue="content3"
        :options="{toolbarItems: ['heading','bold','italic']}"
      />
    </div>

    <div class="editor-container">
      <el-tag class="tag-title">
        I18n:
      </el-tag>
      <el-alert
        :closable="false"
        title="You can change the language of the admin system to see the effect"
        type="success"
      />
      <markdown-editor
        :initialValue="content4"
        :language="language"
        height="300px"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import MarkdownEditor from '@/components/MarkdownEditor/index.vue'

const simpleContent = `
**This is test**

* vue
* element
* webpack
`

const fullcontent = `
![image](https://uicdn.toast.com/toastui/img/tui-editor-bi.png)

# Awesome Editor!

It has been _released as opensource in 2018_ and has ~~continually~~ evolved to **receive 10k GitHub ⭐️ Stars**.

## Create Instance

You can create an instance with the following code and use \`getHtml()\` and \`getMarkdown()\` of the [Editor](https://github.com/nhn/tui.editor).

\`\`\`js
const editor = new Editor(options);
\`\`\`

> See the table below for default options
> > More API information can be found in the document

| name | type | description |
| --- | --- | --- |
| el | \`HTMLElement\` | container element |

## Features

* CommonMark + GFM Specifications
   * Live Preview
   * Scroll Sync
   * Auto Indent
   * Syntax Highlight
        1. Markdown
        2. Preview

## Support Wrappers

> * Wrappers
>    1. [x] React
>    2. [x] Vue
>    3. [ ] Ember
`

@Component({
  name: 'MarkdownDemo',
  components: {
    MarkdownEditor
  }
})
export default class extends Vue {
  private content1 = fullcontent
  private content2 = simpleContent
  private content3 = simpleContent
  private content4 = simpleContent
  private html = ''

  mounted() {
    // FIXES auto focus issue caused by MarkdownEditor
    window.scrollTo(0, 0)
  }

  get language() {
    return AppModule.language
  }

  private getHtml() {
    this.html = (this.$refs.markdownEditor as MarkdownEditor).getHtml()
  }
}
</script>

<style lang="scss" scoped>
.editor-container {
  margin-bottom: 30px;
}

.tag-title {
  margin-bottom: 5px;
}
</style>
