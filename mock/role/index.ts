import faker from 'faker'
import { Response, Request } from 'express'
import { asyncRoutes, constantRoutes } from './routes'
import { IRoleData } from '../../src/api/types'

const routes = [...constantRoutes, ...asyncRoutes]
const roles: IRoleData[] = [
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

export const getRoles = (req: Request, res: Response) => {
  return res.json({
    code: 20000,
    data: roles
  })
}

export const createRole = (req: Request, res: Response) => {
  return res.json({
    code: 20000,
    data: {
      key: faker.random.number({ min: 3, max: 10000 })
    }
  })
}

export const updateRole = (req: Request, res: Response) => {
  const { id } = req.params
  const { data } = req.body
  for (const role of roles) {
    if (role.key === id) {
      return res.json({
        code: 20000,
        data
      })
    }
  }
  return res.json({
    code: 70001,
    message: 'Role not found'
  })
}

export const deleteRole = (req: Request, res: Response) => {
  return res.json({
    code: 20000,
  })
}

export const getRoutes = (req: Request, res: Response) => {
  return res.json({
    code: 20000,
    data: routes
  })
}
