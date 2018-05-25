# vue access control

### 用法：
```javascript
// ajax.js
Vue.prototype.$axios = axios

axios.interceptors.request.use(
    config => {
        // 没有权限
        if (config.haveNoRight) {
            return Promise.reject({
                haveNoRight: true
            })
        }
        // ...
    }
)

// 使用的地方
// ...
import AccessControl from 'access_control_vue'

// 异步接口权限限制
AccessControl.syncLimit({
    axios: this.$axios,
    asyncInterface: '异步接口1,异步接口2...'
})

// 全局导航守卫
this.$router.beforeEach(
    AccessControl.routerGuard({
        syncInterface: '可访问路由1,可访问路由2...',
        certainPath: '/certainPath/'
    })
)



