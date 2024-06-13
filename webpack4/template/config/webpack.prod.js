const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HappyPack = require('happypack')//多进程打包
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')//多进程压缩
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpackCommonConf = require('./webpack.common.js')
const { smart } = require('webpack-merge')
const { srcPath, distPath } = require('./paths')
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin')

module.exports = smart(webpackCommonConf, {
    mode: 'production',
    // resolve:{
    //   // 针对npm中的第三方模块，优先采用jsnext:main指向的ES6模块化语法的文件
    //   mainFiles:['jsnext:main','browser','main']
    // },
    output: {
        filename: '[name].[contentHash:8].js',  // 打包代码时，加上 hash 戳
        path: distPath,
        // publicPath: 'http://cdn.abc.com'  // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
    },
    module: {
        //忽略对react.min.js解析
        noParse:[/react\.min\.js$/],
        rules: [
          // js
          {
            test: /\.(js)$/,
            // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
            use: ['happypack/loader?id=babel'],
            include: srcPath,
            // exclude: /node_modules/
          },
            // 图片 - 考虑 base64 编码的情况
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // 小于 5kb 的图片用 base64 格式产出
                        // 否则，依然延用 file-loader 的形式，产出 url 格式
                        limit: 0 * 1024,

                        // 打包到 img 目录下
                        // outputPath: '/img/',

                        // 设置图片的 cdn 地址（也可以统一在外面的 output 中设置，那将作用于所有静态资源）
                        // publicPath: 'http://cdn.abc.com'
                    }
                }
            },
          // 抽离 css
          {
            test: /\.css$/,
            loader: [
              MiniCssExtractPlugin.loader,  // 注意，这里不再用 style-loader
              'css-loader',
              'postcss-loader'
            ]
          },
          // 抽离 less --> css
          {
            test: /\.less$/,
            loader: [
              MiniCssExtractPlugin.loader,  // 注意，这里不再用 style-loader
              'css-loader',
              'less-loader',
              'postcss-loader'
            ]
          }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // 会默认清空 output.path 文件夹
        new webpack.DefinePlugin({
            // window.ENV = 'production'6+3
            ENV: JSON.stringify('production')
        }),
      // 忽略 moment 下的 /locale 目录
      new webpack.IgnorePlugin(/\.\/locale/, /moment/),
      // 抽离 css 文件
      new MiniCssExtractPlugin({
        filename: 'css/main.[contentHash:8].css'
      }),
      // happyPack 开启多进程打包
      new HappyPack({
        // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
        id: 'babel',
        // 如何处理 .js 文件，用法和 Loader 配置中一样
        loaders: ['babel-loader?cacheDirectory']
      }),
      new ParallelUglifyPlugin({
        // 传递给 UglifyJS 的参数
        // （还是使用 UglifyJS 压缩，只不过帮助开启了多进程）
        uglifyJS: {
          output: {
            beautify: false, // 最紧凑的输出
            comments: false, // 删除所有的注释
          },
          compress: {
            // 删除所有的 `console` 语句，可以兼容ie浏览器
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true,
          }
        }
      }),
      // new ModuleConcatenationPlugin()
    ],

  optimization: {
    // 压缩 css
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      chunks: 'all',
      /**
       * initial 入口 chunk，对于异步导入的文件不处理
       async 异步 chunk，只对异步导入的文件处理
       all 全部 chunk
       */

      // 缓存分组
      cacheGroups: {
        // 第三方模块
        vendor: {
          name: 'vendor', // chunk 名称
          priority: 1, // 权限更高，优先抽离，重要！！！
          test: /node_modules/,
          minSize: 0,  // 大小限制 单位：字节
          minChunks: 1  // 最少复用过几次
        },

        // 公共的模块
        common: {
          name: 'common', // chunk 名称
          priority: 0, // 优先级
          minSize: 20,  // 公共模块的大小限制 单位：字节
          minChunks: 2  // 公共模块最少复用过几次
        }
      }
    }

  }
})
