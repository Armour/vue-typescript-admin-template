module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-typescript-admin-template/' : '/',

  pwa: {
    name: 'vue-typescript-admin-template'
  },

  lintOnSave: process.env.NODE_ENV !== 'production'
}
