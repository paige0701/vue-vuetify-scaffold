module.exports = {
  transpileDependencies: ['vuetify'],
  runtimeCompiler: true,
  devServer: {
    proxy: {
      '^/api/v1/': {
        target: 'http://www.p1aner.xyz:80/',
        changeOrigin: true,
        logLevel: 'debug',
      },
    },
  },
};
