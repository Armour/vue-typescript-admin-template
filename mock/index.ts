import Mock from 'mockjs'
import { param2Obj } from '@/utils'

import user from './user'
import role from './role'
import article from './article'
import remoteSearch from './remote-serach'

const mocks = [
  ...user,
  ...role,
  ...article,
  ...remoteSearch
]

// For frontend mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
export const mockXHR = () => {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  (Mock as any).XHR.prototype.proxy_send = (Mock as any).XHR.prototype.send;
  (Mock as any).XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false
      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  const XHR2ExpressReqWrap = (respond: any) => {
    return function(options: any) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

// For server mock
// const responseFake = (url: string, type: string, respond: any) => {
//   return {
//     url: new RegExp(`/mock${url}`),
//     type: type || 'get',
//     response(req: any, res: any) {
//       res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
//     }
//   }
// }

// export default mocks.map(route => {
//   return responseFake(route.url, route.type, route.response)
// })
