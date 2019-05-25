import request from '@/utils/request'

export interface IExampleArticleData {
  id: string
  status: string
  title: string
  abstractContent: string
  fullContent: string
  sourceURL: string
  imageURL: string
  timestamp: string | number
  platforms: string[]
  disableComment: boolean
  importance: number
  author: string
  reviewer: string
  type: string
  pageviews: number
}

export const defaultExampleArticleData: IExampleArticleData = {
  id: '',
  status: 'draft',
  title: '',
  fullContent: '',
  abstractContent: '',
  sourceURL: '',
  imageURL: '',
  timestamp: '',
  platforms: ['a-platform'],
  disableComment: false,
  importance: 0,
  author: '',
  reviewer: '',
  type: '',
  pageviews: 0
}

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
