const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath, distPath } = require('./paths')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  entry: {
    index: path.join(srcPath, 'index.js'),
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
          {
            test: /\.ts$/,
            loader: ['babel-loader'],
            include: srcPath,
            exclude: /node_modules/
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          },
            {
                test: /\.css$/,
                // loader 的执行顺序是：从后往前
                loader: ['style-loader','vue-style-loader', 'css-loader', 'postcss-loader'] // 加了 postcss
            },
            {
                test: /\.less$/,
                // 增加 'less-loader' ，注意顺序
                loader: ['style-loader', 'css-loader', 'less-loader']
            },
          {
            test: /\.tsx?$/, // 正则表达式，匹配 .ts 或 .tsx 文件
            use: 'ts-loader', // 使用 ts-loader 来处理这些文件
            exclude: /node_modules/, // 排除 node_modules 目录
          },
        ]
    },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.vue', '.jsx'], // 自动解析的文件扩展名
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 用于src中引用Vue时不带.esm
    }
  },
    plugins: [
      new HtmlWebpackPlugin({
          template: path.join(srcPath, 'index.html'),
          filename: 'index.html',
        chunks: ['index', 'vendor', 'common']  // 代码分割后要引用
      }),
      // 多入口 - 生成 other.html
      new HtmlWebpackPlugin({
        template: path.join(srcPath, 'other.html'),
        filename: 'other.html',
        chunks: ['other', 'common']  // 只引用 other.js
      }),
      new VueLoaderPlugin()
    ]
}
