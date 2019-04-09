import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
import store from '@/store'
import { RouterOptions, Route } from 'vue-router'

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
    this.context.dispatch('addVisitedView', view)
    this.context.dispatch('addCachedView', view)
  }

  @Action({ commit: 'ADD_VISITED_VIEW' })
  public addVisitedView(view: ITagView) {
    return view
  }

  @Action({ commit: 'ADD_CACHED_VIEW' })
  public addCachedView(view: ITagView) {
    return view
  }

  @Action
  public delView(view: ITagView) {
    return new Promise(resolve => {
      this.context.dispatch('delVisitedView', view)
      this.context.dispatch('delCachedView', view)
      resolve({
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews]
      })
    })
  }

  @Action
  public delVisitedView(view: ITagView) {
    return new Promise(resolve => {
      this.context.commit('DEL_VISITED_VIEW', view)
      resolve([...this.visitedViews])
    })
  }

  @Action
  public delCachedView(view: ITagView) {
    return new Promise(resolve => {
      this.context.commit('DEL_CACHED_VIEW', view)
      resolve([...this.cachedViews])
    })
  }

  @Action
  public delOthersViews(view: ITagView) {
    return new Promise(resolve => {
      this.context.dispatch('delOthersVisitedViews', view)
      this.context.dispatch('delOthersCachedViews', view)
      resolve({
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews]
      })
    })
  }

  @Action
  public delOthersVisitedViews(view: ITagView) {
    return new Promise(resolve => {
      this.context.commit('DEL_OTHERS_VISITED_VIEWS', view)
      resolve([...this.visitedViews])
    })
  }

  @Action
  public delOthersCachedViews(view: ITagView) {
    return new Promise(resolve => {
      this.context.commit('DEL_OTHERS_CACHED_VIEWS', view)
      resolve([...this.cachedViews])
    })
  }

  @Action
  public delAllViews() {
    return new Promise(resolve => {
      this.context.dispatch('delAllVisitedViews')
      this.context.dispatch('delAllCachedViews')
      resolve({
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews]
      })
    })
  }

  @Action
  public delAllVisitedViews() {
    return new Promise(resolve => {
      this.context.commit('DEL_ALL_VISITED_VIEWS')
      resolve([...this.visitedViews])
    })
  }

  @Action
  public delAllCachedViews() {
    return new Promise(resolve => {
      this.context.commit('DEL_ALL_CACHED_VIEWS')
      resolve([...this.cachedViews])
    })
  }

  @Action({ commit: 'UPDATE_VISITED_VIEW' })
  public updateVisitedView(view: ITagView) {
    return view
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
    for (const i of this.cachedViews) {
      if (i === view.name) {
        const index = this.cachedViews.indexOf(i)
        this.cachedViews.splice(index, 1)
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
    for (const i of this.cachedViews) {
      if (i === view.name) {
        const index = this.cachedViews.indexOf(i)
        this.cachedViews = this.cachedViews.slice(index, index + 1)
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
