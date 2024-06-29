## webpack4构建流程（`node16`版本以下）
1. 单页面中同时构建`vue`、`react`和`typscript`
2. `构建优化`+`生产优化`,    
* `npm i` 安装依赖包
* `npm run dll`   生成dll文件
* `npm run dev`   开发环境运行
* `npm run build` 打包上线文件
### 1. 基本编译配置
1. html编译（`HtmlWebpackPlugin`）
2. css编译
   * less编译（`less-loader`）
   * scss编译（`scss-loader`）
   * vue样式编译（`vue-style-loader`）
   * css编译（`css-loader`、`style-loader`）
   * 多浏览器兼容（`postcss-loader`）
3. js编译 
    * vue编译(`vue-loader`)
    * react编译(`babel-loader`)
    * babel-loader
        * 预设，比如箭头函数转为function(`@babel/preset-env`、`@babel/preset-react`)
        * 新语法补丁polyfill，比如(`core.js`,`generator`)
        * 按需引入polyfill（`useBuiltIns`、`corejs`）
        * 是否是第三方库，写页面无需配置（`run-time`）
4. img编译（`file-loader`）
### 2. 开发环境编译配置
1. 热更新，热部署（`HotModuleReplacementPlugin`）
2. 加速编译dll(`webpack/lib/DllPlugin`、`webpack/lib/DllReferencePlugin`)
3. html、css、js、img按照基本配置
### 3. 生产环境编译配置
1. html编译压缩+hash（`HtmlWebpackPlugin`）
2. css编译压缩+hash
   * 抽离并hash(`MiniCssExtractPlugin`)
   * 压缩css（`TerserJSPlugin`,`OptimizeCSSAssetsPlugin`)
3. js编译压缩+hash
    * 抽离公共代码(`splitChunks`)
    * 忽略不常更新的包，比如react.min.js(`noParse`)
    * 删除包内不需要的，比如只留moment的中文包(`IgnorePlugin`)
    * 多进程打包、压缩（`HappyPack`、`UglifyJS`)
    * 删除无用js（`treeshaking`自带）
    * 减少闭包scopeHosting(`ModuleConcatenationPlugin`)
4. img编译压缩(`url-loader`)
