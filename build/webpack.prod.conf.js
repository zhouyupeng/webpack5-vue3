const path = require('path');
const { merge } = require("webpack-merge");
const copyWebpackPlugin = require("copy-webpack-plugin");
// 压缩 CSS
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// css提取
const miniCssExtractPlugin = require('mini-css-extract-plugin');
// js压缩
const TerserPlugin = require('terser-webpack-plugin');
const webpackConfigBase = require('./webpack.base.conf');
const webpackConfigProd = {
	mode: 'production',
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: './js/[name].[chunkhash].js',
		publicPath: './',
		clean: true
	},
	cache: {
		type: 'filesystem',
		buildDependencies: {
		  config: [__filename]
		}
	},
	plugins: [
		//静态资源输出到根目录
		new copyWebpackPlugin({
			patterns: [{
				from: path.resolve(__dirname, "../public"),
				to: './',
				globOptions: {
					dot: true,
					gitignore: true,
					ignore: ["**/index.html*"],
				}
			}]
		}),
		new miniCssExtractPlugin({
			filename: './css/[name].[contenthash].css',
			chunkFilename: './css/[id].[contenthash].css',
		})
	],
	module: {
		rules: []
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				// 多进程
				parallel: true,
				//删除注释
				extractComments: false,
				terserOptions: {
					compress: { // 生产环境去除console
						drop_console: true,
						drop_debugger: true,
					},
				},
			}),
			new CssMinimizerPlugin()
		],
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		}

	}

}

module.exports = merge(webpackConfigBase(true), webpackConfigProd);