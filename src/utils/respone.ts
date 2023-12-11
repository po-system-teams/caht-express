//成功请求模版
export function resolveRes(data) {
    return {
        code: 200,
        data,
    }
}

// 失败请求模板
export function rejectRes(data) {
    return {
        code: 500,
        message: data,
    }
}

// 请求超时，需要登陆
export function loginTimeoutRes() {
    return {
        code: 401,
        message: '登录超时，请重新登录',
    }
}