/**
 * @description 常用文件夹路径
 * @author 双越
 */

const path = require('path')

const srcPath = path.join(__dirname, '..', 'src')
const distPath = path.join(__dirname, '..', 'dist')
const dllPath = path.join(__dirname, '..', 'dll')

module.exports = {
    srcPath,
    distPath,
    dllPath
}
