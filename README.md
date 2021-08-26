# Webpack5-Demo
基于Webpack5搭建的Vue3项目Demo，目的在于熟悉Webpack5的新配置以及改动。配置文件内都做了大量的注释用于解析。

## webpack5新改动
1. 通过持久缓存提高构建性能
2. 使用更好的算法和默认值来改善长期缓存
3. 通过更好的Tree Shaking和代码生成来提高bundle的大小，Commonjs 的 TreeShaking,更好的 TreeShaking
4. 可以生成 ES5 和 ES6 / ES2015 代码
5. 提高与Web平台的兼容性
6. 通过更好的树摇和代码生成来改善捆绑包大
7. 清除处于怪异状态的内部结构，同时在 v4 中实现功能而不引入任何重大更改
8. 通过引入重大更改来为将来的功能做准备，以使我们能够尽可能长时间地使用 v5

### 1. 预设（presets）

预设(presets)的功能主要包括两个：
1. 哪些新语法会被转换，比如@babel/preset-env是指已经纳入标准(ES6-ES10)的新语法都会被转换

2. 组件库按需配置
```javascript
{
    [
      component,
      {
        libraryName: element-plus,
        styleLibraryName: theme-chalk // 是一个 gulp 打包的项目,引入解析样式文件插件
      }
    ]
}
```
注意：我们在项目里面做兼容都要装polyfill，为什么需要polyfill？@babel/preset-env只能转换语法，比如const、箭头函数等，无法转换新API，比如promise等，
所以我们需要安装polyfill来处理新API；polyfill会直接global上挂载API，但是要注意，比如对于[].flat会直接挂载在Array.prototype上，会污染全局环境，不适合在库中使用

### 2. 模块加载（module）
更新了资源文件的载入方法，再见file/url/raw -loader
1. 直接用type类型取值载入需要的模式
2. generator支持资源文件录入生成文件路径

### 3. 插件（plugin）
```javascript
// DefinePlugin 允许在 编译时 创建配置的全局常量，这在需要区分开发模式与生产模式进行不同的操作时，非常有用

// esm-bundler的警告移除，这个vue的默认配置要进行改动，使它不再依赖原有的环境变量
new DefinePlugin({
  __VUE_OPTIONS_API__: false, // 启用/禁用选项 API 支持，默认值：true
  __VUE_PROD_DEVTOOLS__: false
})

```


### 解析（resolve）
以往的__dirname本地路径查找在resolve方法配置alias已经不管用,resolve直接填写路径

## 拓展

### 如果需要对语法进行检索，建议安装eslint，个人学习的话要求不大，至于对比企业级别的项目，这仅仅是九牛一毛，可以在架构方面进行延伸，我们在这里只是做下学习用。

## 运行
### 生产环境
npm run serve
### 开发环境
npm run build