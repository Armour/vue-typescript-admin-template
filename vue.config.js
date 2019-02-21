module.exports = {
  publicPath: '/hengwei/security/',

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
