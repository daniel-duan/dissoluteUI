Component({
    properties: {
        isIOS: {
            type: Boolean,
            value: false
        },
        kbHeight: {
            type: Number,
            value: 0
        },
        formats: {
            type: Object,
            value: null
        }
    },
    data: {},
    methods: {
        onFormat(e) {
            this.triggerEvent('format', e.target.dataset);

        },
        insertImage() {
            this.triggerEvent('insert');
        }
    }
});
