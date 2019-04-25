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
      path: 'keyboard',
      component: () => import(/* webpackChunkName: "keyboard" */ '@/views/charts/keyboard.vue'),
      name: 'KeyboardChart',
      meta: { title: 'keyboardChart', noCache: true }
    },
    {
      path: 'line',
      component: () => import(/* webpackChunkName: "line" */ '@/views/charts/line.vue'),
      name: 'LineChart',
      meta: { title: 'lineChart', noCache: true }
    },
    {
      path: 'mix-chart',
      component: () => import(/* webpackChunkName: "mix-chart" */ '@/views/charts/mix-chart.vue'),
      name: 'MixChart',
      meta: { title: 'mixChart', noCache: true }
    }
  ]
}

export default chartsRouter
