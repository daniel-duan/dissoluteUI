import Taro from "@tarojs/taro";

// const remote = 'https://fuyuanshan.com/api';
const remote = 'http://localhost:8080/api';
export default {
    login: remote + '/login',
    memSave: remote + '/member/save',
    memSaveFace: remote + '/member/save/face',
    memInfo: remote + '/member/info',
    resolvePhone: remote + '/resolve/phone',
    web: remote + '/web/page',
    review: remote + '/web/review',
    wxPay: remote + '/pay/order',
    validFace: remote + '/validate/face',
    wxPayQuery: remote + '/pay/query',
    enTicket: remote + '/entrance/ticket/find',
    bookData: remote + '/book/data',
    bookPrice: remote + '/book/price',
    orderBooking: remote + '/order/booking',
    orderRefund: remote + '/order/refund',
    swiperLoad: remote + '/swipe/load',
    activityFind: remote + '/platform/activity/find',
    addLike: remote + '/operate/like',
    orderTicket: remote + '/order/ticket',
    bookPayed: remote + '/mine/order/list/payed',
    bookUsed: remote + '/mine/order/list/used',
    bookRefund: remote + '/mine/order/list/refund',
    bookDetail: remote + '/mine/order/detail',
    myTicket: remote + '/mine/ticket/find',
    payList: remote + '/mine/pay/find',
    playerList: remote + '/star/player/list',
    coachList: remote + '/star/coach/list',
    qrImage: remote + '/mine/qr/image',
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
