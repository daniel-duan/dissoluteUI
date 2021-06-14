import Taro from "@tarojs/taro";

// const remote = 'https://fuyuanshan.com/api';
const remote = 'http://localhost:8080/api';
export default {
    login: remote + '/login',
    register: remote + '/register',
    memInfo: remote + '/member/info',
    regPhone: remote + '/register/phone',
    web: remote + '/web/page',
    wxPay: remote + '/pay/order',
    validFace: remote + '/validate/face',
    wxPayQuery: remote + '/pay/query'
}

export function remoteGet(url, sucFn) {
    Taro.request({
        url: url,
        success: suc => {
            sucFn(suc.data);
        }
    })
}

export function remotePost(url, data, sucFn) {
    Taro.request({
        url: url,
        method: "POST",
        data: data,
        success: suc => {
            sucFn(suc.data);
        }
    })
}
