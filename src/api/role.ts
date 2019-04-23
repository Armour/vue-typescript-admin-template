import request from '@/utils/request'

export const getRoutes = () =>
  request({
    url: '/routes',
    method: 'get'
  })

export const getRoles = () =>
  request({
    url: '/roles',
    method: 'get'
  })

export const addRole = (data: any) =>
  request({
    url: '/role',
    method: 'post',
    data
  })

export const updateRole = (id: string, data: any) =>
  request({
    url: `/role/${id}`,
    method: 'put',
    data
  })

export const deleteRole = (id: string) =>
  request({
    url: `/role/${id}`,
    method: 'delete'
  })
