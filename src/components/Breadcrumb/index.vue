<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" v-if="item.meta.title" :key="item.path">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <router-link v-else :to="item.redirect||item.path">{{ item.meta.title }}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { RouteRecord } from 'vue-router';
import pathToRegexp from 'path-to-regexp';

@Component
export default class Breadcrumb extends Vue {
  levelList: RouteRecord[] = [];

  created() {
    this.getBreadcrumb();
  }

  @Watch('$route')
  onRouteChange() {
    this.getBreadcrumb();
  }

  getBreadcrumb() {
    const { params } = this.$route;
    let matched = this.$route.matched.filter((item) => {
      if (item.name) {
        // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
        const toPath = pathToRegexp.compile(item.path);
        item.path = toPath(params);
        return true;
      }
    });
    const first = matched[0];
    if (first && first.name !== 'dashboard') {
      matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }} as RouteRecord].concat(matched);
    }
    this.levelList = matched;
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
