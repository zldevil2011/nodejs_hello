# nodejs_hello
learning nodejs
第一次接触Nodejs，采用Express的web框架搭建实现简单Blog，模版采用ejs

web---请求url---router相应请求---连接数据库（执行相关操作）---render到模板---浏览器展示

nodejs+mongodb+express

1：安装nodejs

2：安装依赖的包

    npm install 软件名

    npm install 软件名 -g 表示全局安装

3：安装express

4：安装mongodb

    详细过程见http://blog.csdn.net/acm_zl/article/details/47447011，主要是建立data和log的存储

5：安装supervisor，这样每次修改之后就不用手动重启了

6：配置Log服务，nodejs默认的采用是morgan的日志系统，一般显示的结果都是在控制台输出，当重启服务器的时候，这些信息就会丢失，无
法长久保存，因此，我们考虑采用新的log机制，在nodejs采用的比较多的是log4js。详细安装过程见http://blog.csdn.net/acm_zl/article/details/48489655


