const { VueLoaderPlugin } = require('vue-loader') // 解析vue文件的loader
const HtmlWebpackPlugin = require('html-webpack-plugin') // 解析html文件的loader
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 用于删除/清理构建文件夹的 webpack 插件
const { HotModuleReplacementPlugin, IgnorePlugin, DefinePlugin } = require('webpack');
const { resolve } = require("path") // node 环境下的路径

// let node_env = process.env.NODE_ENV === 'production' ? 'production' : 'development'
// VUE_APP_API_HOST = base_host[process.env.NODE_ENV]

module.exports = {
  entry: './src/main.js', // 入口执行文件
  output: {
    path: resolve('dist'), // 打包出口文件夹名称
    assetModuleFilename: 'images/[hash][ext][query]' // 图片文件夹下hash命名转换
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
        loader: 'babel-loader' // js 转换
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        type: 'asset/resource', // 静态文件解析 旧版本写法不一致
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
            loader: 'postcss-loader', // 处理css文件 浏览器前缀和压缩css等
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
        test: /\.(eot|woff2?|ttf|svg)$/, // 字体静态资源配置解析等
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
    new HtmlWebpackPlugin({
      template:'./public/index.html'
    }),
    new DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      BROWSER_SUPPORTS_HTML5: true, // 浏览器兼容配置
      TWO: '1+1',
      'typeof window': JSON.stringify('object'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      // 把vue的webpack内置环境变量覆盖, 不然会报警告
      __VUE_OPTIONS_API__: false, // 启用/禁用选项 API 支持，默认值：true
      __VUE_PROD_DEVTOOLS__: false, // 在生产中启用/禁用 devtools 支持，默认值：false
    }),
    new IgnorePlugin(/^\.\/locale$/, /moment$/), // 阻止为匹配正则表达式或过滤器函数的模块生成import或require调用
    new HotModuleReplacementPlugin(),
    new VueLoaderPlugin()
  ],
  resolve: {
    // 别名
    alias: {
      '@': resolve('src')
    }
  },
  devServer: {
    // 代码压缩 为true编译的速度会明显变慢 一般只在生产环境启用
    compress: process.env.NODE_ENV === 'production'
  }
}
