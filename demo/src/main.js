import Vue from 'vue'
import VueRouter from 'vue-router'
import routerConfig from './router'
import App from './App.vue'

Vue.use(VueRouter)

var router = new VueRouter(routerConfig)

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})