import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const tableRoutes: RouteConfig = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: 'table',
    icon: 'table'
  },
  children: [
    {
      path: 'dynamic-table',
      component: () => import(/* webpackChunkName: "dynamicTable" */ '@/views/table/dynamic-table/index.vue'),
      name: 'DynamicTable',
      meta: { title: 'dynamicTable' }
    },
    {
      path: 'drag-table',
      component: () => import(/* webpackChunkName: "dragTable" */ '@/views/table/drag-table.vue'),
      name: 'DragTable',
      meta: { title: 'dragTable' }
    },
    {
      path: 'inline-edit-table',
      component: () => import(/* webpackChunkName: "inlineEditTable" */ '@/views/table/inline-edit-table.vue'),
      name: 'InlineEditTable',
      meta: { title: 'inlineEditTable' }
    },
    {
      path: 'complex-table',
      component: () => import(/* webpackChunkName: "complexTable" */ '@/views/table/complex-table.vue'),
      name: 'ComplexTable',
      meta: { title: 'complexTable' }
    }
  ]
}

export default tableRoutes
