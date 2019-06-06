import request from '@/utils/request'

export const getUsers = (params: any) =>
  request({
    url: '/users',
    method: 'get',
    params
  })

export const getUserInfo = (data: any) =>
  request({
    url: '/users/info',
    method: 'post',
    data
  })

export const getUserByName = (params: any) =>
  request({
    url: `/users/${params.username}`,
    method: 'get',
    params
  })

export const updateUser = (data: any) =>
  request({
    url: `/users/${data.username}`,
    method: 'put',
    data
  })

export const deleteUser = (data: any) =>
  request({
    url: `/users/${data.username}`,
    method: 'delete',
    data
  })

export const login = (data: any) =>
  request({
    url: '/users/login',
    method: 'post',
    data
  })

export const logout = () =>
  request({
    url: '/users/logout',
    method: 'post'
  })

export const register = (data: any) =>
  request({
    url: '/users/register',
    method: 'post',
    data
  })
