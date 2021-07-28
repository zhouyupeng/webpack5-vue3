const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader/dist/index');
// html模板
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const rules = require("./webpack.rules.conf.js");
const envMode = process.env.envMode
require('dotenv').config({ path: `.env.${envMode}` })
// 正则匹配以 VUE_APP_ 开头的 变量
const prefixRE = /^VUE_APP_/
let env = {}
// 只有 NODE_ENV，BASE_URL 和以 VUE_APP_ 开头的变量将通过 webpack.DefinePlugin 静态地嵌入到客户端侧的代码中
for (const key in process.env) {
	if (key == 'NODE_ENV' || key == 'BASE_URL' || prefixRE.test(key)) {
		env[key] = JSON.stringify(process.env[key])
	}
}
// cdn预加载使用
const externals = {
	vue: 'Vue',
	'vue-router': 'VueRouter',
	vuex: 'Vuex',
}

const cdn = {
	// 开发环境
	dev: {
		css: [
		],
		js: []
	},
	// 生产环境
	prod: {
		css: [
		],
		js: [
			'https://lib.baomitu.com/vue/3.0.11/vue.runtime.global.prod.js',
			"https://lib.baomitu.com/vue-router/4.0.6/vue-router.global.prod.min.js",
			"https://lib.baomitu.com/vuex/4.0.0/vuex.global.prod.min.js"
		]
	}
}
module.exports = function (prodMode) {
	return {
		stats: "errors-only",
		entry: path.resolve(__dirname, '../src/main.js'), // 入口
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "../src"),
				assets: path.resolve(__dirname, '../src/assets/'),
				img: path.resolve(__dirname, '../src/assets/img'),
				utils: path.resolve(__dirname, '../src/utils'),
				api: path.resolve(__dirname, '../src/api'),
			},
		},
		// webpack 的性能提示
		performance: {
			//入口起点的最大体积
			maxEntrypointSize: 50000000,
			//生成文件的最大体积
			maxAssetSize: 30000000,
		},
		// 将外部变量或者模块加载进来
		externals: prodMode ? externals : {},
		module: {
			rules: rules(prodMode)
		},
		plugins: [
			new webpack.DefinePlugin({ // 定义环境和变量
				'process.env': {
					...env
				}
			}),
			new FriendlyErrorsWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, '../public/index.html'),
				filename: 'index.html',
				title: 'webpack5+vue3',
				minify: {
					html5: true, // 根据HTML5规范解析输入
					collapseWhitespace: true, // 折叠空白区域
					preserveLineBreaks: false,
					minifyCSS: true, // 压缩文内css
					minifyJS: true, // 压缩文内js
					removeComments: false // 移除注释
				},
				files: prodMode ? cdn.prod : cdn.dev
			}),
			new VueLoaderPlugin(), //new一个实例
		],
	}
}
