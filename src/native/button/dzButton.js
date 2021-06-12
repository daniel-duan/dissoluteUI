import ripperBehaviors from '../../behaviors/ripple-behaviors';

Component({
    behaviors: [ripperBehaviors],
    properties: {
        type: {
            type: String,
            value: 'blur'//button、blur
        },
        click: {
            type: Function,
            value: undefined
        }
    },
    methods: {
        _tap(e) {
            this._addRipple_(e);
        },
        _longPress(e) {
            this._longPress_(e);
        },
        _rippleAnimationEnd() {
            this._rippleAnimationEnd_();
        },
        _touchEnd() {
            this._touchEnd_();
        },
        _tapHandle() {
            this.triggerEvent('click');
        }
    }
});
