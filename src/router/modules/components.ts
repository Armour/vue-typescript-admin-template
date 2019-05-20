import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const componentsRouter: RouteConfig = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentDemo',
  meta: { title: 'components', icon: 'component' },
  children: [
    {
      path: 'tinymce',
      component: () => import(/* webpackChunkName: "tinymce" */ '@/views/components-demo/tinymce.vue'),
      name: 'TinymceDemo',
      meta: { title: 'tinymce' }
    },
    {
      path: 'markdown',
      component: () => import(/* webpackChunkName: "markdown" */ '@/views/components-demo/markdown.vue'),
      name: 'MarkdownDemo',
      meta: { title: 'markdown' }
    },
    {
      path: 'json-editor',
      component: () => import(/* webpackChunkName: "jsonEditor" */ '@/views/components-demo/json-editor.vue'),
      name: 'JsonEditorDemo',
      meta: { title: 'jsonEditor' }
    }
    // {
    //   path: 'split-pane',
    //   component: () => import('@/views/components-demo/split-pane'),
    //   name: 'SplitpaneDemo',
    //   meta: { title: 'SplitPane' }
    // },
    // {
    //   path: 'avatar-upload',
    //   component: () => import('@/views/components-demo/avatar-upload'),
    //   name: 'AvatarUploadDemo',
    //   meta: { title: 'Upload' }
    // },
    // {
    //   path: 'dropzone',
    //   component: () => import('@/views/components-demo/dropzone'),
    //   name: 'DropzoneDemo',
    //   meta: { title: 'Dropzone' }
    // },
    // {
    //   path: 'sticky',
    //   component: () => import('@/views/components-demo/sticky'),
    //   name: 'StickyDemo',
    //   meta: { title: 'Sticky' }
    // },
    // {
    //   path: 'count-to',
    //   component: () => import('@/views/components-demo/count-to'),
    //   name: 'CountToDemo',
    //   meta: { title: 'Count To' }
    // },
    // {
    //   path: 'mixin',
    //   component: () => import('@/views/components-demo/mixin'),
    //   name: 'ComponentMixinDemo',
    //   meta: { title: 'Component Mixin' }
    // },
    // {
    //   path: 'back-to-top',
    //   component: () => import('@/views/components-demo/back-to-top'),
    //   name: 'BackToTopDemo',
    //   meta: { title: 'Back To Top' }
    // },
    // {
    //   path: 'drag-dialog',
    //   component: () => import('@/views/components-demo/drag-dialog'),
    //   name: 'DragDialogDemo',
    //   meta: { title: 'Drag Dialog' }
    // },
    // {
    //   path: 'drag-select',
    //   component: () => import('@/views/components-demo/drag-select'),
    //   name: 'DragSelectDemo',
    //   meta: { title: 'Drag Select' }
    // },
    // {
    //   path: 'dnd-list',
    //   component: () => import('@/views/components-demo/dnd-list'),
    //   name: 'DndListDemo',
    //   meta: { title: 'Dnd List' }
    // },
    // {
    //   path: 'drag-kanban',
    //   component: () => import('@/views/components-demo/drag-kanban'),
    //   name: 'DragKanbanDemo',
    //   meta: { title: 'Drag Kanban' }
    // }
  ]
}

export default componentsRouter
