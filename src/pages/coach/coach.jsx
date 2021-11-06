import React, {Component} from 'react';
import {View} from '@tarojs/components';

import './coach.scss';
import TopBar from "../../components/topBar/TopBar";
import {get} from "../../store/global";

export default class Coach extends Component {
    constructor(props) {
        super(props);
        this.navHeight = get('navHeight');
    }

    render() {
        return (
            <View className='app-content'>
                <TopBar title='教练风采'/>
                <View className='auto-scroll-view' style={{top: this.navHeight}}>
                    <dzSlide type={1}/>
                </View>
            </View>
        )
    }
}
