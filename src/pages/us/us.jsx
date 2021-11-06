import React, {Component} from 'react';
import {Button, View} from '@tarojs/components';

import './us.scss';
import TopBar from "../../components/topBar/TopBar";
import {get} from "../../store/global";

export default class Us extends Component {
    constructor(props) {
        super(props);
        this.navHeight = get('navHeight');
    }

    render() {
        return (
            <View className='app-content'>
                <TopBar title='关于我们'/>
                <View className='auto-scroll-view' style={{top: this.navHeight}}>
                    <View className='us-content'>
                        <View className='us-title'>陕果篮球中心</View>
                        <View className='us-summery'>陕果篮球中心简介：</View>
                        <View className='us-sec'>②专业比赛裁判提供;</View>
                        <View className='us-sec'>③篮球战队约战平台服务;</View>
                        <View className='us-sec'>④承接定制各类运动赛事、企业活动、主题嘉年华服务等等。</View>

                        <View className='us-title'>联系方式</View>
                        <View className='us-sec'>公司地址：西安市</View>
                        <View className='us-sec'>联系电话：000000</View>
                    </View>
                </View>
                <Button className='contact-us' openType='contact'>联系我们</Button>
            </View>
        )
    }
}
