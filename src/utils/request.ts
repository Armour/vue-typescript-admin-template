import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import { getToken } from '@/utils/auth';
import { UserModule } from '@/store/modules/user';

const service = axios.create({
  baseURL: process.env.VUE_APP_MOCK_API,
  timeout: 5000,
});

// Request interceptors
service.interceptors.request.use(
  (config) => {
    if (UserModule.token) {
      config.headers['X-Token'] = getToken(); // Add your custom headers here for request
    }
    return config;
  },
  (error) => {
    // Handle request error here
    Promise.reject(error);
  },
);

// Response interceptors
service.interceptors.response.use(
  (response) => {
    // Example here:
    // code == 200000: valid
    // code == 50008: invalid token
    // code == 50012: already login in other place
    // code == 50014: token expired
    // You can change this part for your own usage.
    const res = response.data;
    if (res.code !== 20000) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000,
      });
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning',
          },
        ).then(() => {
          UserModule.FedLogOut().then(() => {
            location.reload();  // 为了重新实例化vue-router对象 避免bug
          });
        });
      }
      return Promise.reject('error with code: ' + res.code);
    } else {
      return response.data;
    }
  },
  (error) => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  },
);

export default service;
