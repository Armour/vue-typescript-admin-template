const tokens: { [index: string]: any } = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users: { [index: string]: any } = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  // User login
  {
    url: '/user/login',
    type: 'post',
    response: (config: any) => {
      const { username } = config.body
      const token = tokens[username]

      // Mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // Get user info
  {
    url: '/user/info',
    type: 'get',
    response: (config: any) => {
      const { token } = config.query
      const info = users[token]

      // Mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // User logout
  {
    url: '/user/logout',
    type: 'post',
    response: (_: any) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
