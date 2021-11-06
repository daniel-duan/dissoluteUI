export default {
    pages: [
        'pages/screen/screen',
        'pages/coach/coach',
        'pages/player/player',
        'pages/us/us',
        'pages/mine/mine',
        'pages/web/review',
        'pages/book/book',
        'pages/home/home',
        'pages/register/register',
        'pages/activity/activity',
        'pages/entrance/entrance',
        'pages/web/webView',
        'pages/join/join',
        'pages/mine/bookDetail/bookDetail',
        'pages/mine/bookList/bookList',
        'pages/mine/cards/cards',
        'pages/recharge/recharge',
        'pages/mine/balance/balance',
        'pages/mine/order/order'
    ],
    tabBar: {
        color: "#ffffff",
        selectedColor: "#ffdc35",
        borderStyle: "black",
        backgroundColor: "#0554BB",
        list: [
            {
                text: "首页",
                pagePath: "pages/home/home",
                iconPath: "assets/tab/h1.png",
                selectedIconPath: "assets/tab/h2.png"
            },
            {
                text: "活动",
                pagePath: "pages/activity/activity",
                iconPath: "assets/tab/a1.png",
                selectedIconPath: "assets/tab/a2.png"
            },
            {
                text: "场馆预定",
                pagePath: "pages/book/book",
                iconPath: "assets/tab/b1.png",
                selectedIconPath: "assets/tab/b2.png"
            },
            {
                text: "我的",
                pagePath: "pages/mine/mine",
                iconPath: "assets/tab/u1.png",
                selectedIconPath: "assets/tab/u2.png"
            }
        ]
    },
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#0554BB',
        navigationBarTitleText: '领跑体育',
        navigationBarTextStyle: 'white',
        navigationStyle: 'custom'
    },
    usingComponents: {
        dzButton: './native/button/dzButton',
        dzPaper: './native/paper/dzPaper'
    }
}
