import request from '@/utils/request';

export const fetchList = (query: any): any =>
  request({
    url: '/transaction/list',
    method: 'get',
    params: query,
  });
