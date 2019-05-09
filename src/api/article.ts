import request from '@/utils/request'

export const fetchList = (params: any) =>
  request({
    url: '/article/list',
    method: 'get',
    params
  })

export const fetchArticle = (id: string) =>
  request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })

export const fetchPv = (pv: string) =>
  request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })

export const createArticle = (data: any) =>
  request({
    url: '/article/create',
    method: 'post',
    data
  })

export const updateArticle = (data: any) =>
  request({
    url: '/article/update',
    method: 'post',
    data
  })
