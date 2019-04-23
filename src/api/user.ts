import request from '@/utils/request'

export const login = (data: any) =>
  request({
    url: '/user/login',
    method: 'post',
    data
  })

export const getUserInfo = (token: string) =>
  request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })

export const logout = () =>
  request({
    url: '/user/logout',
    method: 'post'
  })
