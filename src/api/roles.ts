import request from '@/utils/request'

export const getRoles = (params: any) =>
  request({
    url: '/roles',
    method: 'get',
    params
  })

export const createRole = (data: any) =>
  request({
    url: '/roles',
    method: 'post',
    data
  })

export const updateRole = (data: any) =>
  request({
    url: `/roles/${data.id}`,
    method: 'put',
    data
  })

export const deleteRole = (data: any) =>
  request({
    url: `/roles/${data.id}`,
    method: 'delete',
    data
  })

export const getRoutes = (params: any) =>
  request({
    url: '/routes',
    method: 'get',
    params
  })
