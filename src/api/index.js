import { postJson, get } from '@/utils/http.js'
import { saBs } from '@/api/base.js'
function login(params) {
    return postJson(saBs.$api.login, params)
}
function user(params) {
    return get(saBs.$api.user, params)
}
export {
    login,
    user
}