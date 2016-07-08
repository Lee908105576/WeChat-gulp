## 使用方法：

> 极简版gulp，未添加md5版本号的控制，使用gulp-liveroload插件进行实时热加载

1. [安装谷歌浏览器插load-reload](http://www.chromein.com/crx_11631.html)
  * 下载后进入谷歌浏览器的`chrome://extensions/`,将下载的文件拖入安装
2. 安装http-server服务（node环境）
  * 管理员身份运行cmd==>`npm install http-server -g`
  * `cd`进入项目文件夹，运行`http-server`
3. 项目文件夹下运行`gulp`
4. 谷歌浏览器`localhost:8080`,点击load-reload插件图标
5. 修改代码或添加文件后，浏览器实时刷新
