import request from '@/utils/request';

export const userSearch = (name: string): any =>
  request({
    url: '/search/user',
    method: 'get',
    params: { name },
  });
