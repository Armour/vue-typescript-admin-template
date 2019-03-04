import request from '@/utils/request';

export const getToken = (): any =>
  request({
    url: '/qiniu/upload/token', // 假地址 自行替换
    method: 'get',
  });
