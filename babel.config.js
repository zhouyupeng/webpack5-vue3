const presets = [
    ["@babel/preset-env", {
        "useBuiltIns": 'usage', // 这里配置usage 会自动根据你使用的方法以及你配置的浏览器支持版本引入对于的方法。
        "corejs": "3.11.0" // 指定 corejs 版本 
    }]
]
const plugins = [
    ['import', {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
    }, 'vant']
]
module.exports = {
    plugins,
    presets

}