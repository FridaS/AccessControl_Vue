// import Vue from 'vue'
import Router from 'vue-router'
import test from './pages/test.vue'

// Vue.user(Router)

let routers = new Router({
    mode: 'history',
    routes: [{
        path: '/test',
        name: 'test',
        component: test
    }]
})

export default routers