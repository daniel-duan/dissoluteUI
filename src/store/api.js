import Taro from "@tarojs/taro";

// const remote = 'https://fuyuanshan.com/api';
const remote = 'http://localhost:8080/api';
export default {
    login: remote + '/login',
    register: remote + '/register',
    regPhone: remote + '/register/phone',
    web: remote + '/web/page',
    wxPay: remote + '/pay/order',
    wxPayQuery: remote + '/pay/query'
}

export function remoteGet(url, data, sucFn) {
    Taro.request({
        url: url,
        method: "POST",
        data: data,
        success: sucFn
    })
}

export function remotePost(url, data, sucFn) {
    Taro.request({
        url: url,
        method: "POST",
        data: data,
        success: suc => {
            if (suc.data && suc.data.success) {
                sucFn(suc);
            } else {
                Taro.showModal({content: '后台无法完成您的请求，请稍后再试', showCancel: false, confirmText: "确认"})
            }
        }
    })
}
