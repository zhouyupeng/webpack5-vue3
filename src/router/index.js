import { createRouter, createWebHashHistory } from "vue-router";
import store from '../store/index'
const Index = () => import(/* webpackChunkName: "index" */ '../views/index.vue')
const Login = () => import(/* webpackChunkName: "login" */ '../views/login.vue')
const About = () => import(/* webpackChunkName: "about" */ '../views/about.vue')
const hash = createWebHashHistory();
const router = createRouter({
    history: hash,
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index,
            meta: {
                auth: false, // 是否需要登录
                keepAlive: false // 是否缓存组件
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                auth: false,
                keepAlive: false,
                hide:true
            }
        },
        {
            path: '/about',
            name: 'about',
            component: About,
            meta: {
                auth: true, // 是否需要登录
                keepAlive: false // 是否缓存组件
            }
        }
    ]
});
// 全局路由钩子函数 对全局有效
router.beforeEach((to, from, next) => {
    let auth = to.meta.auth
    let token = store.state.token;
    if (auth && !token) { // 需要登录
        next({
            path: '/login',
            query: {
                fullPath: to.fullPath
            }
        })
    } else {
        next()
    }
})
export default router;