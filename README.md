# webpack5-demo
基于webpack5搭建的Vue开发和生产环境，目的在于熟悉webpack5以及优化开发和生产环境。

## .babelrc

### 1. 预设（presets）

预设(presets)的功能主要包括两个：
1. 哪些新语法会被转换，比如@babel/preset-env是指已经纳入标准(ES6-ES10)的新语法都会被转换
 
2. 组件库按需配置
   列举几个option重要的功能
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
注意：为什么需要polyfill？@babel/preset-env只能转换语法，比如const、箭头函数等，无法转换新API，比如promise等，
所有我们需要安装polyfill来处理新API；polyfill会直接global上挂载API，比如对于[].flat会直接挂载在
Array.prototype上，会污染全局环境，不适合在库中使用

## 运行
### 生产环境
npm run serve
### 开发环境
npm run build