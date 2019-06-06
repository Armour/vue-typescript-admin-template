import request from '@/utils/request'
import { IArticleData } from './types'

export const defaultArticleData: IArticleData = {
  id: 0,
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

export const getArticles = (params: any) =>
  request({
    url: '/articles',
    method: 'get',
    params
  })

export const getArticle = (params: any) =>
  request({
    url: `/articles/${params.id}`,
    method: 'get',
    params
  })

export const createArticle = (data: any) =>
  request({
    url: '/articles',
    method: 'post',
    data
  })

export const updateArticle = (data: any) =>
  request({
    url: `/articles/${data.id}`,
    method: 'put',
    data
  })

export const deleteArticle = (data: any) =>
  request({
    url: `/articles/${data.id}`,
    method: 'delete',
    data
  })

export const getPageviews = (params: any) =>
  request({
    url: '/pageviews',
    method: 'get',
    params
  })
