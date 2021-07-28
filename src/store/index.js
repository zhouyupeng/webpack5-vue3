import { createStore } from 'vuex';
const store = createStore({
    state: {
        title: '渐进式JavaScript 框架',
        token: localStorage.getItem('token') || '',
        user: JSON.parse(localStorage.getItem('userData')) || {}
    },
    getters: {},
    actions: {},
    mutations: {
        LOGIN(state, parameters){
            let data = parameters.data
            state.token = data.token;
            state.user = data;
            localStorage.setItem('token', data.token)
            localStorage.setItem('userData', JSON.stringify(data))
        }
    },
    modules: {}
})

export default store;