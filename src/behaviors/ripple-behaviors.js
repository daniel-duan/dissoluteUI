module.exports = Behavior({
    behaviors: [],
    properties: {},
    data: {
        rippleList: [],
        rippleId: 0,
        rippleDeleteCount: 0,
        ripperSelector: '.dz-ripper'
    },
    methods: {
        _addRipple_(e, holdAnimate) {
            this._queryMultipleNodes_(this.data.ripperSelector).then(res => {
                const {width, height, left, top} = res[0];
                const {scrollLeft, scrollTop} = res[1];
                const boxWidth = parseInt(width);
                const boxHeight = parseInt(height);
                const wH = boxWidth > boxHeight ? boxWidth : boxHeight;
                const nX = (e.detail.x - (left + scrollLeft)) - wH / 2;
                const nY = (e.detail.y - (top + scrollTop)) - wH / 2;
                this.data.rippleList.push({
                    rippleId: `dz_ripple_${this.data.rippleId++}`,
                    width: wH,
                    height: wH,
                    left: nX,
                    top: nY,
                    startAnimate: true,
                    holdAnimate: holdAnimate || false
                });
                this.setData({rippleList: this.data.rippleList});
            });
        },
        _queryMultipleNodes_(e) {
            return new Promise(resolve => {
                this.createSelectorQuery().select(e).fields({size: true, rect: true}).selectViewport().scrollOffset().exec(function (res) {
                    resolve(res);
                })
            })
        },
        _rippleAnimationEnd_() {
            // 防抖
            this.data.rippleDeleteCount++;
            if (this.data.timer) clearTimeout(this.data.timer);
            this.data.timer = setTimeout(deleteRipple.bind(this), 300);

            function deleteRipple() {
                this.data.rippleList.splice(0, this.data.rippleDeleteCount);
                this.setData({rippleList: this.data.rippleList});
                clearTimeout(this.data.timer);
                this.data.timer = null;
                this.data.rippleDeleteCount = 0;
            }
        },
        _longPress_(e) {
            this._addRipple_(e, true);
        },
        _touchEnd_() {
            let lastRipple = this.data.rippleList.slice(-1)[0];
            if (lastRipple && lastRipple.holdAnimate) {
                this.data.rippleList.pop();
                this.setData({rippleList: this.data.rippleList});
            }
        }
    }
});
