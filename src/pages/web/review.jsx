import React from 'react';
import {WebView} from '@tarojs/components';

import api from "../../store/api";

export default class Webview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <WebView src={api.review}/>;
    }
}
