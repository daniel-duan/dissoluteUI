import React, {Component} from 'react';
import Taro from "@tarojs/taro";
import {Image, View} from '@tarojs/components';

import './join.scss';
import {get} from "../../store/global";
import TopBar from "../../components/topBar/TopBar";
import test from '../../assets/image/333333333333.jpg';
import DzLoading from "../../components/loading/DzLoading";

function JoinTeam(props) {
}

export default class Join extends Component {
    constructor(props) {
        super(props);

        const params = Taro.getCurrentInstance().router.params;

        this.navHeight = get('navHeight') - 10;
        this.state = {
            openLoad: false,
            joined: 2//0 未知 1已加入 2未加入
        };
    }

    render() {
        return (
            <View class='app-content'>
                <TopBar title='加入团队'/>
                <View className='auto-scroll-view' style={{top: this.navHeight}}>
                    <View className='scan-header'>
                        <View className='img-head'><Image className='image' src={test} mode='aspectFill'/></View>
                        <View className='header-list'>
                            <View className='item'>2021年6月14日</View>
                            <View className='item'>场地A</View>
                            <View className='item'>23:00-11:00 23:00-11:00</View>
                        </View>
                    </View>
                    {this.state.joined === 1 && <View className='join-info'>
                        <View className='tips'>恭喜您加入团队</View>
                        <View className='item'><View className='head'>1.</View><View className='body'>比赛开始前30分钟可入场</View></View>
                        <View className='item'><View className='head'>2.</View><View className='body'>入场请扫描人脸识别机器进入场地</View></View>
                        <View className='item'><View className='head'>3.</View><View className='body'>比赛结束之后，请在30分钟之内离场。否则入场券过期，将不能人脸识别离场。</View></View>
                    </View>}
                    {this.state.joined === 2 && <View className='join-info'>
                        <View className='tips'>张三邀请您加入团队</View>
                        <View className='item'><View className='head'>1.</View><View className='body'>请点击《现在加入》按钮，进入团队并直接获取比赛入场券。</View></View>
                    </View>}
                    {this.state.joined === 2 && <View className='join-btn'>
                        <dzButton onClick={this.validate}>现在加入</dzButton>
                    </View>}
                </View>
                <DzLoading open={this.state.openLoad}/>
            </View>
        )
    }
}
