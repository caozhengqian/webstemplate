const path = require('path')
const webpack = require('webpack')
const webpackCommonConf = require('./webpack.common.js')
const { smart } = require('webpack-merge')
const { srcPath, distPath } = require('./paths')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
// 第一，引入 DllReferencePlugin
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');

module.exports = smart(webpackCommonConf, {
    mode: 'development',
  entry: {
    index: [
      'webpack-dev-server/client?http://localhost:8080/',
      'webpack/hot/dev-server',
      path.join(srcPath, 'index.js')
    ],
    other: path.join(srcPath, 'other.js')
  },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            loader: ['babel-loader?cacheDirectory'],
            include: srcPath,
            exclude: /node_modules/
          },
            // 直接引入图片 url
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            // window.ENV = 'development'
            ENV: JSON.stringify('development')
        }),
      new HotModuleReplacementPlugin(),
      // 第三，告诉 Webpack 使用了哪些动态链接库
      new DllReferencePlugin({
        // 描述 react 动态链接库的文件内容
        manifest: require(path.join(distPath, 'react.manifest.json')),
      }),
    ],
    devServer: {
        port: 8080,
        progress: true,  // 显示打包的进度条
        contentBase: distPath,  // 根目录
        open: true,  // 自动打开浏览器
        compress: true,  // 启动 gzip 压缩
        hot:true
        // 设置代理
        // proxy: {
        //     // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
        //     '/api': 'http://localhost:3000',
        //
        //     // 将本地 /api2/xxx 代理到 localhost:3000/xxx
        //     '/api2': {
        //         target: 'http://localhost:3000',
        //         pathRewrite: {
        //             '/api2': ''
        //         }
        //     }
        // }
    }
})
