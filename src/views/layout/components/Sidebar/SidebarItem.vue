<template>
  <div v-if="item.children && (!item.meta || !item.meta.hidden)" :class="['menu-wrapper', collapse ? 'simple-mode' : 'full-mode', {'first-level': !isNest}]">
    <template v-if="hasOneShowingChild(item.children) && !onlyOneChild.children">
      <app-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown': !isNest}">
          <svg-icon v-if="onlyOneChild.meta && onlyOneChild.meta.icon" :name="onlyOneChild.meta.icon" />
          <span v-if="onlyOneChild.meta && onlyOneChild.meta.title" slot="title">{{onlyOneChild.meta.title}}</span>
        </el-menu-item>
      </app-link>
    </template>
    <el-submenu v-else :index="resolvePath(item.path)">
      <template slot="title">
        <svg-icon v-if="item.meta && item.meta.icon" :name="item.meta.icon" />
        <span v-if="item.meta && item.meta.title" slot="title">{{item.meta.title}}</span>
      </template>
      <template v-for="child in childrenFilter(item.children)">
        <sidebar-item
          v-if="child.children && child.children.length > 0"
          :is-nest="true"
          :item="child"
          :key="child.path"
          :base-path="resolvePath(child.path)"
          :collapse="collapse"
          class="nest-menu"/>
        <app-link v-else :to="resolvePath(child.path)" :key="child.name">
          <el-menu-item :index="resolvePath(child.path)">
            <svg-icon v-if="child.meta && child.meta.icon" :name="child.meta.icon" />
            <span v-if="child.meta && child.meta.title" slot="title">{{child.meta.title}}</span>
          </el-menu-item>
        </app-link>
      </template>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import path from 'path';
import { Route } from 'vue-router';
import { isExternal } from '@/utils/validate';
import { Component, Vue, Prop } from 'vue-property-decorator';
import AppLink from './Link.vue';

@Component({
  // Set 'name' here to prevent uglifyjs from causing recursive component not work
  // See https://medium.com/haiiro-io/element-component-name-with-vue-class-component-f3b435656561 for detail
  name: 'SidebarItem',
  components: {
    AppLink,
  },
})
export default class SidebarItem extends Vue {
  @Prop({ required: true }) private item!: Route;
  @Prop({ default: false }) private isNest!: boolean;
  @Prop({ default: false }) private collapse!: boolean;
  @Prop({ default: '' }) private basePath!: string;

  private onlyOneChild: Route | null = null;

  private hasOneShowingChild(children: Route[]) {
    if (!children) { return false; }
    const showingChildren = children.filter((item: Route) => {
      if (item.meta && item.meta.hidden) {
        return false;
      } else {
        this.onlyOneChild = item; // This will only be used if hasOneShowingChild return true
        return true;
      }
    });
    return showingChildren.length === 1;
  }

  private resolvePath(routePath: string) {
    if (this.isExternalLink(routePath)) {
      return routePath;
    }
    return path.resolve(this.basePath, routePath);
  }

  private isExternalLink(routePath: string) {
    return isExternal(routePath);
  }

  private childrenFilter(children: Route[]) {
    return children.filter((child) => !child.meta || !child.meta.hidden);
  }
}
</script>

<style lang="scss">
@import "src/styles/variables.scss";

.el-submenu.is-active > .el-submenu__title {
  color: $subMenuActiveText !important;
}

.full-mode {
  .nest-menu .el-submenu>.el-submenu__title,
  .el-submenu .el-menu-item {
    background-color: $subMenuBg !important;

    &:hover {
      background-color: $subMenuHover !important;
    }
  }
}

.simple-mode {
  &.first-level {
    .submenu-title-noDropdown {
      padding-left: 10px !important;
      position: relative;

      .el-tooltip {
        padding: 0 10px !important;
      }
    }

    .el-submenu {
      overflow: hidden;

      &>.el-submenu__title {
        padding-left: 10px !important;

        .el-submenu__icon-arrow {
          display: none;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.svg-icon {
  margin-right: 16px;
}
</style>
