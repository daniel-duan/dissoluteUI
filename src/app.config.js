export default {
    pages: [
        'pages/mine/mine',
        'pages/book/book',
        'pages/home/home',
        'pages/activity/activity',
        'pages/index/index',
        'pages/screen/screen'
    ],
    tabBar: {
        color: "#ffffff",
        selectedColor: "#25ecb9",
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
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '领跑体育',
        navigationBarTextStyle: 'black',
        navigationStyle: 'custom'
    },
    usingComponents: {
        dzButton: './native/button/dzButton',
        dzPaper: './native/paper/dzPaper'
    }
}
