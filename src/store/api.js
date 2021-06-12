import Taro from "@tarojs/taro";

const remote = 'https://fuyuanshan.com/api';
// const remote = 'http://localhost:8080/api';
export default {
    login: remote + '/login',
    register: remote + '/register',
    regPhone: remote + '/register/phone',
    web: remote + '/web/page',
    tempAct: remote + '/temple/activity/find',
    validTempAct: remote + '/temple/activity/validate',
    signTempAct: remote + '/temple/activity/sign',
    platformAct: remote + '/platform/activity/find',
    validPlatAct: remote + '/platform/activity/validate',
    signPlatAct: remote + '/platform/activity/sign',
    getTemple: remote + '/temple/find-all',
    homeLoad: remote + '/home/load',
    findTravel: remote + '/travel/find',
    validTravel: remote + '/travel/validate',
    signTravel: remote + '/travel/sign',
    addLike: remote + '/activity/like',
    getWd: remote + '/temple/wd/find',
    getSet: remote + '/temple/setting',
    tempFocusOn: remote + '/temple/focus-on',
    tempFocusOff: remote + '/temple/focus-off',
    getListen: remote + '/temple/listen/find',
    tempDetail: remote + '/temple/detail',
    quiz: remote + '/temple/quiz',
    blessing: remote + '/temple/blessing',
    redeem: remote + '/temple/redeem',
    placard: remote + '/temple/placard',
    lantern: remote + '/temple/lantern',
    getMaster: remote + '/master/find-all',
    masterInfo: remote + '/master/info',
    mastFocusOn: remote + '/master/focus-on',
    mastFocusOff: remote + '/master/focus-off',
    mastTheme: remote + '/master/upload/theme',
    getMasterFeed: remote + '/master/feed/find',
    saveMasterFeed: remote + '/master/feed/save',
    delMasterFeed: remote + '/master/feed/del',
    likeMasterFeed: remote + '/master/feed/like',
    upImage: remote + '/upload/image',
    listNote: remote + '/travel/note/list',
    myNote: remote + '/travel/note/mine',
    getNote: remote + '/travel/note/get',
    delNote: remote + '/travel/note/delete',
    saveNote: remote + '/travel/note/save',
    findMusic: remote + '/music/find',
    myMessage: remote + '/mine/message/find',
    myOrder: remote + '/mine/history/find',
    myEvent: remote + '/mine/event/find',
    myActivity: remote + '/mine/activity/find',
    myTemple: remote + '/mine/temple/find',
    myMaster: remote + '/mine/master/find',
    wxPay: remote + '/pay/order',
    wxPayQuery: remote + '/pay/query',
    tempBox: remote + '/temple/box',
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
