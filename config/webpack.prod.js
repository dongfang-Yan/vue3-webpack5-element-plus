
const { merge } = require('webpack-merge')
const webpackConfig = require('./webpack.config.js')

const proConfig = {
    // mode: 'production',
    mode: 'development',  // 确定要转换生产环境再改动
    devtool: 'inline-source-map'
}
module.exports = merge(webpackConfig,proConfig)