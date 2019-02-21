import request from '@/utils/request';

export const fetchList = (query: any): any =>
  request({
    url: '/article/list',
    method: 'get',
    params: query,
  });

export const fetchArticle = (id: string): any =>
  request({
    url: '/article/detail',
    method: 'get',
    params: { id },
  });

export const fetchPv = (pv: any): any =>
  request({
    url: '/article/pv',
    method: 'get',
    params: { pv },
  });

export const createArticle = (data: any): any =>
  request({
    url: '/article/create',
    method: 'post',
    data,
  });

export const updateArticle = (data: any): any =>
  request({
    url: '/article/update',
    method: 'post',
    data,
  });