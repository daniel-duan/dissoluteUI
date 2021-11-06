import React, {Component} from 'react';
import Taro from "@tarojs/taro";
import {Image, View} from '@tarojs/components';

import './join.scss';
import {get} from "../../store/global";
import TopBar from "../../components/topBar/TopBar";
import DzLoading from "../../components/loading/DzLoading";
import api, {remoteGet} from "../../store/api";
import {siteNameByKey} from "../../util/Site";
import {memGet} from "../../store/menber";
import CheckMember from "../../components/check/CheckMember";

export default class Join extends Component {
    constructor(props) {
        super(props);

        const params = Taro.getCurrentInstance().router.params;
        this.navHeight = get('navHeight') - 10;
        this.state = {
            openLoad: true,
            joined: 0,//0 未知 1已加入 2未加入
            detail: {}
        };
        this.bhkId = params.bhkId;

        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        remoteGet(api.bookInfo + `?bhkId=${this.bhkId}&memId=${memGet('memId')}`, (res) => {
            const joined = res.msg === '0' ? 2 : 1;
            this.setState({detail: res.data, joined: joined, openLoad: false});
        }, () => {
            Taro.showModal({content: '预定已取消或不存在，无法加入比赛', showCancel: false, confirmText: "返回首页", complete: () => Taro.switchTab({url: '/pages/home/home'})});
        });
    }

    submit() {
        this.setState({openLoad: true});
        remoteGet(api.bookJoin + `?bhkId=${this.bhkId}&memId=${memGet('memId')}`, (res) => {
            Taro.showToast({title: '加入比赛成功', icon: 'none', duration: 2000});
            this.setState({openLoad: false, joined: 1});
        }, () => this.setState({openLoad: false}));
    }

    render() {
        const bd = this.state.detail;
        return (
            <View class='app-content'>
                <CheckMember/>
                <TopBar title='加入比赛'/>
                <View className='auto-scroll-view' style={{top: this.navHeight}}>
                    <View className='scan-header'>
                        <View className='img-head'><Image className='image' src={bd.wxImage} mode='aspectFill'/></View>
                        <View className='header-list'>
                            <View className='item'>{bd.bookDate}</View>
                            <View className='item'>{siteNameByKey(bd.siteNumber)}</View>
                            <View className='item'>{bd.bookPeriod}</View>
                        </View>
                    </View>
                    {this.state.joined === 1 && <View className='join-info'>
                        <View className='tips'>恭喜您已加入团队</View>
                        <View className='item'><View className='head'>1.</View><View className='body'>比赛开始前30分钟可入场</View></View>
                        <View className='item'><View className='head'>2.</View><View className='body'>入场请扫描人脸识别机器进入场地</View></View>
                        <View className='item'><View className='head'>3.</View><View className='body'>比赛结束之后，请在30分钟之内离场。否则入场券过期，将不能人脸识别离场。</View></View>
                    </View>}
                    {this.state.joined === 2 && <View className='join-info'>
                        <View className='tips'>{bd.realName}邀请您加入团队</View>
                        <View className='item'><View className='head'>1.</View><View className='body'>请点击《现在加入》按钮，进入团队并直接获取比赛入场券。</View></View>
                    </View>}
                    {this.state.joined === 2 && <View className='join-btn'>
                        <dzButton onClick={this.submit}>现在加入</dzButton>
                    </View>}
                </View>
                <DzLoading open={this.state.openLoad}/>
            </View>
        )
    }
}
