const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(App) {
  App.use(
    '/',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};