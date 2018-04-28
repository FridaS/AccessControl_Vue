import axios from 'axios'
import { Message } from 'element-ui'

// 权限控制方案：
// 入参：导航权限字符串(逗号','分隔)、操作权限字符串(逗号','分隔)
// 针对导航权限添加导航守卫，针对操作权限进行axios请求拦截

// 操作权限控制
const syncLimit = ({ asyncInterface = '' }) => {
    // 通过axios请求拦截，来判断和处理操作权限
    axios.interceptors.request.use(
        config => {
            debugger
            console.log(config)
            debugger
            if (!asyncInterface.includes(config.url)) {
                Message.error('没有权限')
                return false
            }
            return config
        }
    )
}

// 全局导航守卫
let routerGuard = ({ syncInterface = '' }) => {
    let beforeEach = (to, from, next) => {
        if (syncInterface.includes(to.path)) {
            // 访问 '/' 或 '/content/' redirect 到第一个有效的url
            if (to.path === '/' || to.path === '/content/') {
                let routersArr = syncInterface.split(',')
                // 如果除了 '/404'、'/403' 外没有权限访问的连接，
                // 则访问 '/' 和 '/content/' 跳/404
                let firstValidUrl = '/404'
                for (let router of routersArr) {
                    if (router.substr(0, 8) === '/content') {
                        firstValidUrl = router
                        break
                    }
                }
                next({ path: firstValidUrl })
                return
            }
            next()
        } else {
            next({ path: '/403', replace: true })
        }
    }
    return beforeEach
}

const index = {
    syncLimit,
    routerGuard
}

export default index
