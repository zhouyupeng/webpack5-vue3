
const path = require('path');
const { merge } = require("webpack-merge");
const webpackConfigBase = require('./webpack.base.conf');
let webpackConfigDev = {
    mode:'development',
    devtool: 'eval-cheap-module-source-map',
    module: {
    },
    plugins: [

    ],
    devServer: {  // webpack-dev-server 会从 output.path 中定义的目录为服务提供 bundle 文件，即，文件将可以通过 http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename] 进行访问。
        open: false, // 启动服务后是否打开浏览器
        host: '127.0.0.1',
        port: 8008, // 服务端口
		https: false,
        hot:true,
		historyApiFallback: true,
        // 设置代理，用来解决本地开发跨域问题，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
        proxy: {
            '/api': {
                secure: false,
                changeOrigin: true,
                target: 'https://www.fastmock.site/',
                pathRewrite: { '^/api': '' },
            },
            '/user': {
                secure: false,
                changeOrigin: true,
                target: 'http://www.mockhttp.cn/',
                pathRewrite: { '^/user': '' },
            },
        }
    }

}

module.exports = merge(webpackConfigBase(false), webpackConfigDev);