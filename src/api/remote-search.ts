import request from '@/utils/request'

export const searchUser = (name: string) => {
  return request({
    url: '/search/user',
    method: 'get',
    params: { name }
  })
}

export const transactionList = (params: any) => {
  return request({
    url: '/transaction/list',
    method: 'get',
    params
  })
}
