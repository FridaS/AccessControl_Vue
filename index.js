import axios from 'axios'
import { Message } from 'element-ui'

// 权限控制方案：
// 入参：导航权限字符串(逗号','分隔)、操作权限字符串(逗号','分隔)
// 针对导航权限添加导航守卫，针对操作权限进行axios请求拦截

/**
 * 操作权限控制
 * @param {axios} 拦截器。必须与预拦截接口的axios相同，否则拦截不到。
 * @param {String} asyncInterface 可访问的异步接口字符串（以逗号‘,’分隔）
 * @param {Boolean} showMessage 当没有权限时，是否 message 提示
 */
const syncLimit = ({ axios = axios, asyncInterface = '', showMessage = true }) => {
    // 通过axios请求拦截，来判断和处理操作权限
    axios.interceptors.request.use(
        config => {
            // 对于get请求，去掉其请求参数
            let requestUrl = config.url.split('?')[0]
            if (!asyncInterface.includes(requestUrl)) {
                showMessage && Message.error('没有权限')
                config.haveNoRight = true
            }
            return config
        },
        error => Promise.reject(error)
    )
}

/**
 * 全局导航守卫
 * @param {String} syncInterface 可访问的同步接口字符串（以逗号‘,’分隔）
 * @param {String} certainPath 所有同步接口（路由地址）的第一级路径，访问该路径redirect到第一个有效的url
 */
let routerGuard = ({ syncInterface = '', certainPath = '/' }) => {
    let certainPathLength = certainPath.length
    let beforeEach = (to, from, next) => {
        if (syncInterface.includes(to.path)) {
            // 访问 '/' 或 certainPath redirect 到第一个有效的url
            if (to.path === '/' || to.path === certainPath) {
                let routersArr = syncInterface.split(',')
                // 如果除了 '/404'、'/403' 外没有权限访问的连接，
                // 则访问 '/' 和 certainPath 时 跳/404
                let firstValidUrl = '/404'
                for (let router of routersArr) {
                    if (router.substr(0, certainPathLength) === certainPath) {
                        firstValidUrl = router
                        break
                    }
                }
                next({ path: firstValidUrl, replace: true })
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
