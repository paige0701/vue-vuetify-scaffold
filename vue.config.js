module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  runtimeCompiler: true,
  devServer: {
    proxy: {
      "^/api/v1/": {
        target: "http://13.125.183.97:80/",
        changeOrigin: true,
        logLevel: "debug"
      }
    }
  }
}
