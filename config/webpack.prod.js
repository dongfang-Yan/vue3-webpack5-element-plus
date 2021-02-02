
const { merge } = require('webpack-merge') 
const webpackConfig = require('./webpack.config.js')

const proConfig = {
    // mode: 'production',
    mode: 'development',
    devtool: 'inline-source-map' 
}
module.exports = merge(webpackConfig,proConfig)