import api from '../../store/api';

Component({
    properties: {
        type: {
            type: Number,
            value: ''
        }
    },
    lifetimes: {
        ready() {
            const type = this.properties.type;
            const that = this;
            const remoteUrl = type === 1 ? api.coachList : api.playerList;
            wx.request({
                url: remoteUrl,
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
    methods: {}
});
