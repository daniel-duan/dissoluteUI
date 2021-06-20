import React from 'react';
import Taro from "@tarojs/taro";
import {WebView} from '@tarojs/components';
import './webView.scss';
import api from "../../store/api";

export default class Webview extends React.Component {
    constructor(props) {
        super(props);
        const params = Taro.getCurrentInstance().router.params;
        this.state = {
            src: api.web
        };
    }

    render() {
        return <WebView src={this.state.src}/>;
    }
}
