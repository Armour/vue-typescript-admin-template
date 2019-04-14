import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { Route } from 'vue-router'
import store from '@/store'

export interface ITagView extends Route {
  title?: String;
}

export interface ITagsViewState {
  visitedViews: ITagView[];
  cachedViews: (string | undefined)[];
}

@Module({ dynamic: true, store, name: 'tagsView' })
class TagsView extends VuexModule implements ITagsViewState {
  public visitedViews: ITagView[] = [];
  public cachedViews: (string | undefined)[] = [];

  @Action
  public addView(view: ITagView) {
    this.ADD_VISITED_VIEW(view)
    this.ADD_CACHED_VIEW(view)
  }

  @Action
  public async delView(view: ITagView): Promise<ITagsViewState> {
    await this.DEL_VISITED_VIEW(view)
    await this.DEL_CACHED_VIEW(view)
    return {
      visitedViews: this.visitedViews,
      cachedViews: this.cachedViews
    }
  }

  @Action
  public async delCachedView(view: ITagView) {
    await this.DEL_CACHED_VIEW(view)
  }

  @Action
  public async delOthersViews(view: ITagView) {
    await this.DEL_OTHERS_VISITED_VIEWS(view)
    await this.DEL_OTHERS_CACHED_VIEWS(view)
  }

  @Action
  public async delAllViews() {
    await this.DEL_ALL_VISITED_VIEWS()
    await this.DEL_ALL_CACHED_VIEWS()
  }

  @Action
  public updateVisitedView(view: ITagView) {
    this.UPDATE_VISITED_VIEW(view)
  }

  @Mutation
  private ADD_VISITED_VIEW(view: ITagView) {
    if (this.visitedViews.some(v => (v as ITagView).path === view.path)) return
    this.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  }

  @Mutation
  private ADD_CACHED_VIEW(view: ITagView) {
    if (this.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      this.cachedViews.push(view.name)
    }
  }

  @Mutation
  private DEL_VISITED_VIEW(view: ITagView) {
    for (const [i, v] of this.visitedViews.entries()) {
      if (v.path === view.path) {
        this.visitedViews.splice(i, 1)
        break
      }
    }
  }

  @Mutation
  private DEL_CACHED_VIEW(view: ITagView) {
    for (const [i, v] of this.cachedViews.entries()) {
      if (v === view.name) {
        this.cachedViews.splice(i, 1)
        break
      }
    }
  }

  @Mutation
  private DEL_OTHERS_VISITED_VIEWS(view: ITagView) {
    for (const [i, v] of this.visitedViews.entries()) {
      if (v.path === view.path) {
        this.visitedViews = this.visitedViews.slice(i, i + 1)
        break
      }
    }
  }

  @Mutation
  private DEL_OTHERS_CACHED_VIEWS(view: ITagView) {
    for (const [i, v] of this.cachedViews.entries()) {
      if (v === view.name) {
        this.cachedViews = this.cachedViews.slice(i, i + 1)
        break
      }
    }
  }

  @Mutation
  private DEL_ALL_VISITED_VIEWS() {
    this.visitedViews = []
  }

  @Mutation
  private DEL_ALL_CACHED_VIEWS() {
    this.cachedViews = []
  }

  @Mutation
  private UPDATE_VISITED_VIEW(view: ITagView) {
    for (let v of this.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }
}

export const TagsViewModule = getModule(TagsView)
