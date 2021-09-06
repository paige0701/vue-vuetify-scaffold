module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  runtimeCompiler: true,
  devServer: {
    proxy: {
      "^/naver/": {
        target: "https://openapi.naver.com/v1",
        pathRewrite: { "^/naver/": "/" },
        changeOrigin: true,
        logLevel: "debug"
      }
    }
  }
}
