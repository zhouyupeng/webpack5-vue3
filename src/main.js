import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js';
import installVant from './plugins/vant'
import "./style/global.scss";
import store from './store/index.js';
import filters from './filters/index'
console.log('process.env', process.env);
// 开发测试环境显示console
if (process.env.VUE_APP_SHOWCONSOLE === 'true') {
    let Vconsole = require('../node_modules/vconsole/dist/vconsole.min');
    new Vconsole();
}
const app = createApp(App)
// vue3 移除了filter过滤器 https://v3.cn.vuejs.org/guide/migration/filters.html#%E5%85%A8%E5%B1%80%E8%BF%87%E6%BB%A4%E5%99%A8
app.config.globalProperties.$filters = {
    ...filters
}
installVant(app)
app.use(router).use(store).mount('#app')