import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import Admin from '@/views/admin/index.vue'
import routerConfig from '@/router/config.json'

function initRouter() {
  const routers: RouteConfig[] = []

  Object.keys(routerConfig).forEach(e => {
    routers.push({
      path: '/' + e,
      redirect: 'admin',
      component: Layout,
      name: e,
      meta: {
        title: routerConfig[e].title,
        icon: routerConfig[e].icon
      },
      children: routerConfig[e].children ? getChildren(routerConfig[e].children, e) : undefined
    })
  })

  return routers
}

function getChildren(configs: any, name: string) {
  if (!configs) {
    return []
  }

  return configs.map((c: any) => {
    return {
      path: c.path,
      component: Admin,
      name: name + '.' + c.path,
      meta: {
        title: c.title,
        icon: c.icon
      },
      children: c.children ? getChildren(c.children, name + '.' + c.path) : undefined
    }
  })
}

export default initRouter()
