import request from '@/utils/request'

export const getList = (params: any) =>
  request({
    url: '/table/list',
    method: 'get',
    params
  })
