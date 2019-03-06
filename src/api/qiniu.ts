import request from '@/utils/request';
import { AxiosPromise } from 'axios';

export const getToken = (): AxiosPromise<any> =>
  request({
    url: '/qiniu/upload/token', // 假地址 自行替换
    method: 'get',
  });
