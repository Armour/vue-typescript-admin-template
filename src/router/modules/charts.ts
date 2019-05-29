import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const chartsRouter: RouteConfig = {
  path: '/charts',
  component: Layout,
  redirect: 'noredirect',
  name: 'Charts',
  meta: {
    title: 'charts',
    icon: 'chart'
  },
  children: [
    {
      path: 'bar-chart',
      component: () => import(/* webpackChunkName: "bar-chart" */ '@/views/charts/bar-chart.vue'),
      name: 'BarChart',
      meta: {
        title: 'barChart',
        noCache: true
      }
    },
    {
      path: 'line-chart',
      component: () => import(/* webpackChunkName: "line-chart" */ '@/views/charts/line-chart.vue'),
      name: 'LineChart',
      meta: {
        title: 'lineChart',
        noCache: true
      }
    },
    {
      path: 'mixed-chart',
      component: () => import(/* webpackChunkName: "mixed-chart" */ '@/views/charts/mixed-chart.vue'),
      name: 'MixedChart',
      meta: {
        title: 'mixedChart',
        noCache: true
      }
    }
  ]
}

export default chartsRouter
