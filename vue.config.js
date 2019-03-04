module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-typescript-admin-template/' : '/',

  pwa: {
    name: 'vue-typescript-admin-template'
  },

  configureWebpack: {
    devtool: 'source-map'
  },

  lintOnSave: undefined,
  outputDir: './dist/',
  assetsDir: './public/',
  runtimeCompiler: true,
  productionSourceMap: true,
  parallel: true,

  css: {
    sourceMap: true
  }
}
