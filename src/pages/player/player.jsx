import React, {Component} from 'react';
import {View} from '@tarojs/components';

import './player.scss';
import TopBar from "../../components/topBar/TopBar";
import {get} from "../../store/global";

export default class Player extends Component {
    constructor(props) {
        super(props);
        this.navHeight = get('navHeight');
    }

    render() {
        return (
            <View className='app-content'>
                <TopBar title='明星球员'/>
                <View className='auto-scroll-view' style={{top: this.navHeight}}>
                    <dzSlide type={2}/>
                </View>
            </View>
        )
    }
}
