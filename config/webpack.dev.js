const { merge } = require('webpack-merge')
const webpackConfig = require('./webpack.config.js')

const devConfig = {
    mode: 'development',
    devServer: {
      contentBase: './dist',
      hot: true,
      proxy: {
        // 本地开发环境请求地址 VUE_APP_API_HOST
        '/api': { 
          target: '',
          changeOrigin:true, //target是域名的话，需要这个参数
          pathRewrite: { '^/api': '' },
          secure: false
        }
      }
    },
  devtool: 'inline-source-map', //检测代码报错位置
}

module.exports = merge(webpackConfig,devConfig)
