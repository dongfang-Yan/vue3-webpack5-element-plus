const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { HotModuleReplacementPlugin, IgnorePlugin, DefinePlugin } = require('webpack');
const path = require("path")

VUE_APP_API_HOST = 'https://way.jd.com/jisuapi/' //接口地址
VUE_APP_API_PREFIX = '/api' //接口地址

module.exports = {
  entry: './src/main.js',
  resolve: {
    alias: {
      extensions: ['.js', '.vue'],
      '@': path.resolve(__dirname, 'src')
    }
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
        loader: 'url-loader',
        options: {
          name: '[name].[contenthash:8].[ext]',
          outputPath: 'imgs', // 打包的图片放在该文件下
          publicPath: './imgs/', // 公共路径
          esModule: false, 
          limit: 8192
        }
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
        loader: 'url-loader',
        options: {
          name: '[name].[contenthash:8].[ext]',
          outputPath: 'fonts',
          publicPath: './fonts/',
          limit: 4096
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template:'./public/index.html'
    }),
    new DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      BROWSER_SUPPORTS_HTML5: true,
      TWO: '1+1',
      'typeof window': JSON.stringify('object'),
      'VUE_APP_API_PREFIX': JSON.stringify(VUE_APP_API_PREFIX),
      'VUE_APP_API_HOST': JSON.stringify(VUE_APP_API_HOST)
    }),
    new IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
  ]
}
