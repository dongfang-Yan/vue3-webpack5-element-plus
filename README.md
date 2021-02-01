# webpack5-demo
基于webpack5搭建的Vue开发和生产环境，目的在于熟悉webpack5以及优化开发和生产环境。

## .babelrc

### 1. 预设（presets）

预设(presets)的功能主要包括两个：
1. 哪些新语法会被转换，比如@babel/preset-env是指已经纳入标准(ES6-ES10)的新语法都会被转换
 
2. 通过option改变某些行为
   列举几个option重要的功能
```javascript
{
    targets, // 兼容浏览器的级别（和.browserslistrc设置一个即可）
    useBuiltIns, // 决定polyfill（core-js+regenerator-runtime）的导入方式，取值usage、entry、false
                 // usage表示按需导入对应的API包
                 // entry表示浏览器不兼容的API全部导入
                 // false表示不管浏览器是否兼容都全部导入
                 // usage不用手动import polyfill，否则需要，另外，设置为usage时，在使用新API的地方都会导入对应的包，
                 // 不管浏览器是否支持该API

    corejs, // 对应core-js的版本，取2或3（3能处理更多的新API，如[].flat）
    modules // 是否把ES6的模块化语法改成其它模块化语法，建议设置false可以做tree shakeing等优化
}
```

注意：useBuiltIns和corejs一般会配合polyfill使用
      babel7.4之后建议安装core-js+regenerator-runtime，而不再安装@babel/polyfill
      因为@babel/polyfill本身由这两者组成，但其绑定的为core-js@2xx，无法对一些新API进行转换，比如[].flat

注意：为什么需要polyfill？@babel/preset-env只能转换语法，比如const、箭头函数等，无法转换新API，比如promise等，
所有我们需要安装polyfill来处理新API，但为什么是两个（core-js+regenerator-runtime）？core-js只能处理ES6中的API，
而async await等API则需要regenerator-runtime来处理；polyfill会直接global上挂载API，比如对于[].flat会直接挂载在
Array.prototype上，会污染全局环境，不适合在库中使用

### 2. 插件（plugins）

@babel/plugin-transform-runtime

@babel/preset-env+polyfill基本能满足我们的使用了（语法转换+API转换），但你如果是库的作者，可能还需要了解上面这种方式
同样是转换API，相比polyfill全局挂载的方式，@babel/plugin-transform-runtime+@babel/runtime的方式会在使用API的地方
导入一个相同功能的函数，不会污染全局环境

@babel/plugin-transform-runtime的用途，是在我们使用新API的地方自动导入@babel/runtime中的函数，所以能处理哪些API由
@babel/runtime的版本决定，一般认为：

@babel/runtime包含regenerator-runtime，只能处理async await等
@babel/runtime-corejs2包含regenerator-runtime+core-js@2xx，能处理大部分新API
@babel/runtime-corejs3包含regenerator-runtime+core-js@3xx，目前纳入标准的新API都能处理，例如[].flat

注：对于API的处理，不管是哪种方式，都是基于core-je+regenerator-runtime，所以对于API的处理能力，我们应该更关心这两个库