const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { HotModuleReplacementPlugin, IgnorePlugin,DefinePlugin } = require('webpack');
const { resolve } = require("path")

let base_host = {
  production: 'https://way.jd.com/jisuapi/', //接口地址 开发环境
  development: 'https://way.jd.com/jisuapi/' //生产环境
}

let node_env = process.env.NODE_ENV === 'production' ? 'production' : 'development'
VUE_APP_API_HOST = base_host[node_env]

module.exports = {
  entry: './src/main.js',
  output: {
    path: resolve('dist'),
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-preset-env',
                ] 
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        type: 'asset',
        generator: {
          filename: 'static/[hash][ext][query]'
        }
      }
    ]
  },
  ignoreWarnings: [/Failed to parse source map/], //防止警告
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'VUE_APP_API_HOST': JSON.stringify(VUE_APP_API_HOST)
    }),
    new HtmlWebpackPlugin({
      template:'./public/index.html'
    }),
    new IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
  ],
  resolve: {
    alias: {
      '@': resolve('src')
    }
  }
}
