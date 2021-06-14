import React, {Component} from 'react'
import Taro from "@tarojs/taro";
import {AtIcon, AtTabs, AtTabsPane} from 'taro-ui';
import {View} from '@tarojs/components'

import './bookList.scss'
import TopBar from "../../../components/topBar/TopBar";
import {get} from "../../../store/global";
import DzLoading from "../../../components/loading/DzLoading";

function BookItem(props) {
    return (
        <View className='tab-item' onClick={() => Taro.navigateTo({url: '/pages/mine/bookDetail/bookDetail?id='})}>
            <View className='content'>
                <View className='header'>2021年6月14日</View>
                <View className='line'><View className='head'>预定时间段</View><View className='body'>23:23-12:99 23:23-12:11</View></View>
                <View className='line'><View className='head'>支付金额</View><View className='body'>21 元</View></View>
            </View>
            <View className='nav'><AtIcon value='chevron-right' size='20' color='#888888'/></View>
        </View>
    );
}

export default class BookList extends Component {
    constructor(props) {
        super(props);

        this.navHeight = get('navHeight');
        this.state = {
            openLoad: false,
            current: 0
        };
        this.tabList = [{title: '已预订'}, {title: '已使用'}, {title: '已取消'}];

        this.switchTab = this.switchTab.bind(this);
    }

    switchTab(idx) {
        console.log(idx);
        this.setState({current: idx})
    }

    render() {
        return (
            <View className='app-content'>
                <TopBar title='我的预定'/>
                <View className='auto-scroll-view' style={{top: this.navHeight}}>
                    <AtTabs current={this.state.current} tabList={this.tabList} onClick={this.switchTab}>
                        <AtTabsPane current={this.state.current} index={0}>
                            <View className='tab-body'>
                                <View className='tab-list'>
                                    <BookItem/>
                                    <BookItem/>
                                    <BookItem/>
                                </View>
                            </View>
                        </AtTabsPane>
                        <AtTabsPane current={this.state.current} index={1}>
                            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
                        </AtTabsPane>
                        <AtTabsPane current={this.state.current} index={2}>
                            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页三的内容</View>
                        </AtTabsPane>
                    </AtTabs>
                </View>
                <DzLoading open={this.state.openLoad}/>
            </View>
        )
    }
}
