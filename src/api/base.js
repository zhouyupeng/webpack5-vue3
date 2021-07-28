const saBs = {} // 基础功能

// 全局参数
saBs.$version = '1.0.0'
saBs.$apiServer = {
    baseApi: process.env.VUE_APP_BASE_API,
    apiUser:process.env.VUE_APP_API_USER
}
console.log('saBs',saBs);
saBs.$api = {
    login: `${saBs.$apiServer.baseApi}/mock/973ec681e817a650ec18f8fb17af90e8/user/login`, // 登录
    user:`${saBs.$apiServer.apiUser}/mock/user11`
}
export {
    saBs
}