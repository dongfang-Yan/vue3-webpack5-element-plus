
const { merge } = require('webpack-merge') 
const webpackConfig = require('./webpack.config.js')

const proConfig = {
    mode: 'production'   
}
module.exports = merge(webpackConfig,proConfig)