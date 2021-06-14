import api from '../../store/api';

Component({
    properties: {
        tid: {
            type: Number,
            value: ''
        }
    },
    lifetimes: {
        ready() {
            const tid = this.properties.tid;
            const that = this;
            wx.request({
                url: api.getMaster + `?tempId=${tid}`,
                success(res) {
                    const list = res.data.data;
                    that.setData({
                        openLoad: false,
                        dataList: list,
                        max: list.length - 1
                    });
                }
            });
        }
    },
    data: {
        max: -1,
        screenWidth: wx.getSystemInfoSync().screenWidth - 100,
        openLoad: true
    },
    methods: {
        _homepage(e) {
            wx.navigateTo({url: '/temple/pages/monk/monk?mastId=' + e.currentTarget.dataset.id});
        },
        _myDesc(e) {
            const mastId = e.currentTarget.dataset.id;
            wx.navigateTo({url: '/pages/web/webView?id=' + mastId + '&type=8'});
        },
        _focus(e) {
        },
        _unFocus(e) {
        }
    }
});
