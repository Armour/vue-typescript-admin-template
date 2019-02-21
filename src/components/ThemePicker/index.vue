<template>
  <el-color-picker
    v-model="theme"
    class="theme-picker"
    popper-class="theme-picker-dropdown"/>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';


const version = require('element-ui/package.json').version; // element-ui version from node_modules
const ORIGINAL_THEME = '#409EFF'; // default color


@Component
export default class ThemePicker extends Vue {
  private chalk: string = ''; // content of theme-chalk css
  private theme: string = ORIGINAL_THEME;

  @Watch('theme')
  public onTheme(val: string) {
    const oldVal = this.theme;
    if (typeof val !== 'string') return;
    const themeCluster = this.getThemeCluster(val.replace('#', ''));
    const originalCluster = this.getThemeCluster(oldVal.replace('#', ''));
    console.log(themeCluster, originalCluster);
    const getHandler = (variable: string, id: string) => {
      return () => {
        const originalCluster = this.getThemeCluster(ORIGINAL_THEME.replace('#', ''));
        const newStyle = this.updateStyle((this as any)[variable], originalCluster, themeCluster);

        let styleTag = document.getElementById(id);
        if (!styleTag) {
          styleTag = document.createElement('style');
          styleTag.setAttribute('id', id);
          document.head.appendChild(styleTag);
        }
        styleTag.innerText = newStyle;
      };
    };

    const chalkHandler = getHandler('chalk', 'chalk-style');

    if (!this.chalk) {
      const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
      this.getCSSString(url, chalkHandler, 'chalk');
    } else {
      chalkHandler();
    }

    const styles = (<HTMLStyleElement[]>[]).slice.call(document.querySelectorAll('style'))
      .filter((style: HTMLStyleElement) => {
        const text = style.innerText;
        return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text);
      });
    styles.forEach((style: HTMLStyleElement) => {
      const { innerText } = style;
      if (typeof innerText !== 'string') return;
      style.innerText = this.updateStyle(innerText, originalCluster, themeCluster);
    });
    this.$message({
      message: '换肤成功',
      type: 'success',
    });
  }

  public updateStyle(style: string, oldCluster: string[], newCluster: string[]): string {
    const colorOverrides: string[] = []; // only capture color overides
    oldCluster.forEach((color: string, index: number) => {
      const value = newCluster[index];
      const color_plain = color.replace(/([()])/g, '\\$1');
      const repl = new RegExp(`(^|})([^{]+{[^{}]+)${color_plain}\\b([^}]*)(?=})`, 'gi');
      const nestRepl = new RegExp(color_plain, 'ig'); // for greed matching before the 'color'
      let v;
      while ((v = repl.exec(style))) {
        colorOverrides.push(v[2].replace(nestRepl, value) + value + v[3] + '}'); // '}' not captured in the regexp repl to reserve it as locator-boundary
      }
    })
    return colorOverrides.join('');
  }

  public getCSSString(url: string, callback: Function, variable: string) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        (<any>this)[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '');
        callback();
      }
    };
    xhr.open('GET', url);
    xhr.send();
  }

  public getThemeCluster(theme: string): string[] {
    const tintColor = (color: string, tint: number): string => {
      let red = parseInt(color.slice(0, 2), 16);
      let green = parseInt(color.slice(2, 4), 16);
      let blue = parseInt(color.slice(4, 6), 16);

      if (tint === 0) { // when primary color is in its rgb space
        return [red, green, blue].join(',');
      } else {
        red += Math.round(tint * (255 - red));
        green += Math.round(tint * (255 - green));
        blue += Math.round(tint * (255 - blue));

        const redStr = red.toString(16);
        const greenStr = green.toString(16);
        const blueStr = blue.toString(16);

        return `#${redStr}${greenStr}${blueStr}`;
      }
    }

    const shadeColor = (color: string, shade: number): string => {
      let red = parseInt(color.slice(0, 2), 16);
      let green = parseInt(color.slice(2, 4), 16);
      let blue = parseInt(color.slice(4, 6), 16);

      red = Math.round((1 - shade) * red);
      green = Math.round((1 - shade) * green);
      blue = Math.round((1 - shade) * blue);

      const redStr = red.toString(16);
      const greenStr = green.toString(16);
      const blueStr = blue.toString(16);

      return `#${redStr}${greenStr}${blueStr}`;
    }

    const clusters: string[] = [theme];
    for (let i = 0; i <= 9; i++) {
      clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
    }
    clusters.push(shadeColor(theme, 0.1));
    return clusters;
  }
}
</script>

<style>
.theme-picker .el-color-picker__trigger {
  margin-top: 12px;
  height: 26px!important;
  width: 26px!important;
  padding: 2px;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
