module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/vue-typescript-admin-template/' : '/',
  transpileDependencies: ['vuex-module-decorators'],
  pwa: {
    name: 'vue-typescript-admin-template'
  }
}
