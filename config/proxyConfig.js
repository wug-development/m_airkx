module.exports = {
  proxy: {
    '/apis': {
      target: 'http://m.airkx.com:9090/mwork/',
      changeOrigin: true,
      pathRewrite: {
        '^/apis': ''
      }
    },
    '/apiw': {
      target: 'http://www.airkx.com/kaixing/',
      changeOrigin: true,
      pathRewrite: {
        '^/apiw': ''
      }
    }
  }
}
