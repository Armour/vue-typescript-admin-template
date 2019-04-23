import Mock from 'mockjs'
import { asyncRoutes, constantRoutes } from './routes'

const routes = [...constantRoutes, ...asyncRoutes]

const roles = [
  {
    key: 'admin',
    name: 'admin',
    description: 'Super Administrator. Have access to view all pages.',
    routes: routes
  },
  {
    key: 'editor',
    name: 'editor',
    description: 'Normal Editor. Can see all pages except permission page',
    routes: routes.filter(i => i.path !== '/permission') // Just a mock
  },
  {
    key: 'visitor',
    name: 'visitor',
    description: 'Just a visitor. Can only see the home page and the document page',
    routes: [{
      path: '',
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: { title: 'dashboard', icon: 'dashboard' }
        }
      ]
    }]
  }
]

export default [
  // Mock get all routes form server
  {
    url: '/routes',
    type: 'get',
    response: (_: any) => {
      return {
        code: 20000,
        data: routes
      }
    }
  },

  // Mock get all roles form server
  {
    url: '/roles',
    type: 'get',
    response: (_: any) => {
      return {
        code: 20000,
        data: roles
      }
    }
  },

  // Add role
  {
    url: '/role',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },

  // Update role
  {
    url: '/role/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },

  // Delete role
  {
    url: '/role/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }
]
