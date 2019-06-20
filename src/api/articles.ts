import request from '@/utils/request'

export const getArticles = (params: any) =>
  request({
    url: '/articles',
    method: 'get',
    params
  })
