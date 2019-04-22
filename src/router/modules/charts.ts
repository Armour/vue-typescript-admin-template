/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout.vue'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noredirect',
  name: 'Charts',
  meta: {
    title: 'Charts',
    icon: 'chart'
  },
  children: [
    {
      path: 'keyboard',
      component: () => import('@/views/charts/keyboard.vue'),
      name: 'KeyboardChart',
      meta: { title: 'KeyboardChart', noCache: true }
    },
    {
      path: 'line',
      component: () => import('@/views/charts/line.vue'),
      name: 'LineChart',
      meta: { title: 'LineChart', noCache: true }
    },
    {
      path: 'mix-chart',
      component: () => import('@/views/charts/mix-chart.vue'),
      name: 'MixChart',
      meta: { title: 'MixChart', noCache: true }
    }
  ]
}

export default chartsRouter
