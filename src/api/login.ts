import request from '@/utils/request'

export const login = (username: string, password: string) =>
  request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
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
