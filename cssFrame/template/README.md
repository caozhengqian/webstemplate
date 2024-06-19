## CSS架构步骤
### 1. Settings基础样式层，颜色、边框、、阴影、层级等
    * 根据设计稿定义基础样式，在项目settings文件夹下定义变量
    * 在vite.config.js中引入全局
### 2. Tools层
    * 引入SCSS框架到tools文件夹
    * 使用SassMagic或者其他框架
    * 在vite.config.js中引入全局
### 3. Base层去除各大浏览器自带样式，定义基础元素默认样式（a,button等)
    * 安装normal.css,在main.js引入全局
    * 根据设计稿设置基础元素样式，写入base文件夹，必写（img，p，a）非必写form基本要设置
### 4. Components层定义样式组件，类似栅格
    * 样式组件(栅格，layout，居中，文本样式等)
    * class用BEM规则，button-waring--fontsize
### 5. Acss层定义固定属性样式
    * 宽度、高度、圆角、颜色、字体大小，边框
    * 内边距、外边距、z-index,背景色，背景色+透明度
    * 段落省略号等等
### 6. Theme层
    * html标签上设置
    * theme文件夹创建多个主题

