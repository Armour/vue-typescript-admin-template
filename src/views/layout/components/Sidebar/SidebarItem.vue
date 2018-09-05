<template>
  <div class="menu-wrapper">
    <template v-if="hasOneShowingChild(item.children) && !onlyOneChild.children">
      <a :href="onlyOneChild.path" target="_blank" @click="clickLink(onlyOneChild.path, $event)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown': !isNest}">
          <item v-if="onlyOneChild.meta" :icon="onlyOneChild.meta.icon" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </a>
    </template>
    <el-submenu v-else-if="item.meta && !item.meta.hidden" :index="item.name || item.path">
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
      </template>
      <template v-for="child in item.children" v-if="!child.hidden">
        <sidebar-item
          v-if="child.children && child.children.length > 0"
          :is-nest="true"
          :item="child"
          :key="child.path"
          :base-path="resolvePath(child.path)"
          class="nest-menu"/>
        <a v-else :href="child.path" :key="child.name" target="_blank" @click="clickLink(child.path, $event)">
          <el-menu-item :index="resolvePath(child.path)">
            <item v-if="child.meta" :icon="child.meta.icon" :title="child.meta.title" />
          </el-menu-item>
        </a>
      </template>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import path from 'path';
import { Route } from 'vue-router';
import { validateURL } from '@/utils/validate';
import { Component, Vue, Prop } from 'vue-property-decorator';
import Item from './Item.vue';

@Component({
  components: { Item },
})
export default class SidebarItem extends Vue {
  @Prop({ required: true }) item!: Route;
  @Prop({ default: false }) isNest!: boolean;
  @Prop({ default: '' }) basePath!: string;

  onlyOneChild: Route | null = null;

  hasOneShowingChild(children: Route[]) {
    if (!children) { return false; }
    const showingChildren = children.filter((item: Route) => {
      if (!item.meta || item.meta && item.meta.hidden) {
        return false;
      } else {
        this.onlyOneChild = item; // temp set(will be used if only has one showing child)
        return true;
      }
    });
    return showingChildren.length === 1;
  }

  resolvePath(routePath: string) {
    return path.resolve(this.basePath, routePath);
  }

  isExternalLink(routePath: string) {
    return validateURL(routePath);
  }

  clickLink(routePath: string, e: Event) {
    if (!this.isExternalLink(routePath)) {
      e.preventDefault();
      this.$router.push(this.resolvePath(routePath));
    }
  }
}
</script>
