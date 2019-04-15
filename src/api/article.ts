import request from '@/utils/request'

export const fetchList = (params: any) =>
  request({
    url: '/article/list',
    method: 'get',
    params
  })
