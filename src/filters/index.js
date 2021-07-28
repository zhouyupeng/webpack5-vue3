  
//https://v3.cn.vuejs.org/guide/migration/filters.html#%E8%BF%81%E7%A7%BB%E7%AD%96%E7%95%A5
// 过滤日期格式，传入时间戳，根据参数返回不同格式
const formatTimers = function(val, hours) {
    if (val) {
        var dateTimer = new Date(val * 1000)
        var y = dateTimer.getFullYear()
        var M = dateTimer.getMonth() + 1
        var d = dateTimer.getDate()
        var h = dateTimer.getHours()
        var m = dateTimer.getMinutes()
        M = M >= 10 ? M : '0' + M
        d = d >= 10 ? d : '0' + d
        h = h >= 10 ? h : '0' + h
        m = m >= 10 ? m : '0' + m
        if (hours) {
            return y + '-' + M + '-' + d + ' ' + h + ':' + m
        } else {
            return y + '-' + M + '-' + d
        }
    }
}
export default {
    formatTimers
}