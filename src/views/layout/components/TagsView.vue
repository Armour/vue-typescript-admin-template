<template>
  <div class="tags-view-container">
    <scroll-pane
      ref="scrollPane"
      class="tags-view-wrapper"
    >
      <router-link
        v-for="tag in Array.from(visitedViews)"
        ref="tag"
        :key="tag.path"
        :class="{'active': currentTag.path === tag.path}"
        :to="tag"
        class="tags-view-item"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      :style="{left: left+'px', top: top+'px'}"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">
        刷新
      </li>
      <li @click="closeSelectedTag(selectedTag)">
        关闭
      </li>
      <li @click="closeOthersTags">
        关闭其他
      </li>
      <li @click="closeAllTags">
        关闭所有
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import VueRouter, { Route } from 'vue-router'
import { ElBreadcrumbItem } from 'element-ui/types/breadcrumb-item'
import { TagsViewModule, ITagView } from '@/store/modules/tagsView'
import ScrollPane from '@/components/ScrollPane/index.vue'

@Component({
  components: {
    ScrollPane
  }
})
export default class TagsView extends Vue {
  @Watch('$route')
  onRouteChange(route: ITagView) {
    this.currentTag = route
    this.addViewTags()
    this.moveToCurrentTag()
  }

  @Watch('visible')
  onVisibleChange(value: boolean) {
    if (value) {
      document.body.addEventListener('click', this.closeMenu)
    } else {
      document.body.removeEventListener('click', this.closeMenu)
    }
  }

  get visitedViews() {
    return TagsViewModule.visitedViews
  }

  private visible: boolean = false
  private top: number = 0
  private left: number = 0
  private selectedTag = {}
  private currentTag = {}

  private mounted() {
    this.addViewTags()
    this.currentTag = this.$router.currentRoute
  }

  private refreshSelectedTag(view: ITagView) {
    TagsViewModule.delCachedView(view)
      .then(() => {
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + view.fullPath
          })
        })
      })
  }

  private generateRoute() {
    if (this.$route.name) {
      return this.$route
    }
    return null
  }

  private addViewTags() {
    const route: ITagView | null = this.generateRoute()
    if (route) {
      TagsViewModule.addView(route)
    }
  }

  private isActive(route: ITagView): boolean {
    return route.path === this.$router.currentRoute.path
  }

  private closeSelectedTag(view: ITagView) {
    TagsViewModule.delView(view)
      .then((value) => {
        if (this.isActive(view)) {
          let views: ITagView[] = value.visitedViews
          let latestView: ITagView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView)
          } else {
            this.$router.push('/')
          }
        }
      })
  }

  private moveToCurrentTag() {
    this.$nextTick(() => {
      const tags: ElBreadcrumbItem[] = this.$refs.tag as ElBreadcrumbItem[]
      for (const tag of tags) {
        if ((tag.to as ITagView).path === this.$route.path) {
          (this.$refs.scrollPane as ScrollPane).moveToTarget(tag.$el as HTMLElement)
          if ((tag.to as ITagView).fullPath !== this.$route.fullPath) {
            TagsViewModule.updateVisitedView(this.$route)
          }
          break
        }
      }
    })
  }

  private closeOthersTags() {
    this.$router.push(this.selectedTag)
    TagsViewModule.delOthersViews(this.selectedTag as ITagView)
      .then(() => {
        this.moveToCurrentTag()
      })
  }

  private closeAllTags() {
    TagsViewModule.delAllViews()
      .then(() => {
        this.$router.push('/')
      })
  }

  private openMenu(tag: ITagView, e: MouseEvent) {
    this.visible = true
    this.selectedTag = tag
    const offsetLeft: number = this.$el.getBoundingClientRect().left
    this.left = e.clientX - offsetLeft + 15
    this.top = e.clientY
  }

  private closeMenu() {
    this.visible = false
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;

        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
// Reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;

      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }

      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
