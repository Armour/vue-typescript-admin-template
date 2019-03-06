<template>
  <div :class="{'show':show}" class="header-search">
    <svg-icon class-name="search-icon" icon-class="search" @click="click" />
    <el-select
      ref="headerSearchSelect"
      v-model="search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="Search"
      class="header-search-select"
      @change="change">
      <el-option v-for="item in options" :key="item.path" :value="item" :label="item.title.join(' > ')"/>
    </el-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Fuse from 'fuse.js';
import path from 'path';
import i18n from '@/lang';

@Component
export default class HeaderSearch extends Vue {
  private search: string = '';
  private options: any[] = [];
  private searchPool: any[] = [];
  private show: boolean = false;
  private fuse: any = undefined;

  get routers() {
    return this.$store.getters.permission_routers;
  }
  get lang() {
    return this.$store.getters.language;
  }

  @Watch('lang')
  onLang() {
    this.searchPool = this.generateRouters(this.routers);
  }

  @Watch('routers')
  onRouters() {
    this.searchPool = this.generateRouters(this.routers);
  }

  @Watch('searchPool')
  onSearchPool(list: any) {
    this.initFuse(list);
  }
  @Watch('show')
  OnShow(value: boolean) {
    if (value) {
      document.body.addEventListener('click', this.close);
    } else {
      document.body.removeEventListener('click', this.close);
    }
  }

  mounted() {
    this.searchPool = this.generateRouters(this.routers);
  }

  click() {
    this.show = !this.show;
    if (this.show) {
      this.$refs.headerSearchSelect && (this.$refs.headerSearchSelect as any).focus();
    }
  }
  close() {
    this.$refs.headerSearchSelect && (this.$refs.headerSearchSelect as any).blur();
    this.options = [];
    this.show = false;
  }
  change(val: {path: string}) {
    this.$router.push(val.path);
    this.search = '';
    this.options = [];
    this.$nextTick(() => {
      this.show = false;
    });
  }
  initFuse(list: any) {
    this.fuse = new Fuse(list, {
      shouldSort: true,
      threshold: 0.4,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [{
        name: 'title',
        weight: 0.7,
      }, {
        name: 'path',
        weight: 0.3,
      }],
    });
  }
  // Filter out the routes that can be displayed in the sidebar
  // And generate the internationalized title
  generateRouters(routers: any, basePath = '/', prefixTitle = []): any[] {
    let res = [];

    for (const router of routers) {
      // skip hidden router
      if (router.hidden) { continue; }

      const data = {
        path: path.resolve(basePath, router.path),
        title: [...prefixTitle],
      };

      if (router.meta && router.meta.title) {
        // generate internationalized title
        const i18ntitle = i18n.t(`route.${router.meta.title}`);

        data.title = [...data.title, i18ntitle];

        if (router.redirect !== 'noredirect') {
          // only push the routes with title
          // special case: need to exclude parent router without redirect
          res.push(data);
        }
      }

      // recursive child routers
      if (router.children) {
        const tempRouters = this.generateRouters(router.children, data.path, data.title);
        if (tempRouters.length >= 1) {
          res = [...res, ...tempRouters];
        }
      }
    }
    return res;
  }
  querySearch(query: string) {
    if (query !== '') {
      this.options = this.fuse.search(query);
    } else {
      this.options = [];
    }
  }
}
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    /deep/ .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
