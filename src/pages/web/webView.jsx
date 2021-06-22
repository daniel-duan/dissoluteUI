import React from 'react';
import Taro from "@tarojs/taro";
import {WebView} from '@tarojs/components';

import api from "../../store/api";
import {hasViewed, setView} from "../../util/localHistory";
import {memGet} from "../../store/menber";

export default class Webview extends React.Component {
    constructor(props) {
        super(props);
        const params = Taro.getCurrentInstance().router.params;
        const hasView = hasViewed(params.type, params.id);
        if (!hasView) {
            setView(params.type, params.id);
        }

        const up = `?memId=${memGet('memId')}&sourceId=${params.id}&type=${params.type}&viewed=${hasView}`;
        this.state = {
            src: api.web + up
        };
    }

    render() {
        return <WebView src={this.state.src}/>;
    }
}
