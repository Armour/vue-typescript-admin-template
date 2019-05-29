import Mock from 'mockjs'
import { IExampleArticleData } from '@/api/article'

const List: IExampleArticleData[] = []
const count = 100

const fullContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const imageURL = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'
const sourceURL = ''

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    'status|1': ['published', 'draft', 'deleted'],
    title: '@title(5, 10)',
    abstractContent: 'mock data',
    fullContent,
    sourceURL,
    imageURL,
    timestamp: '@datetime',
    platforms: ['a-platform'],
    disableComment: true,
    importance: '@integer(1, 3)',
    author: '@first',
    reviewer: '@first',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    pageviews: '@integer(300, 5000)'
  }))
}

export default [
  {
    url: '/article/list',
    type: 'get',
    response: (config: any) => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((_, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/article/detail',
    type: 'get',
    response: (config: any) => {
      const { id } = config.query
      for (const article of List) {
        if (article.id.toString() === id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/article/pv',
    type: 'get',
    response: (_: any) => {
      return {
        code: 20000,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },

  {
    url: '/article/create',
    type: 'post',
    response: (_: any) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/article/update',
    type: 'post',
    response: (_: any) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
