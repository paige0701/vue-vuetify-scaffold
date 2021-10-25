module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  runtimeCompiler: true,
  devServer: {
    proxy: {
      "^/api/v1/": {
        target: "http://localhost:8000",
        changeOrigin: true,
        logLevel: "debug"
      }
    }
  }
}
