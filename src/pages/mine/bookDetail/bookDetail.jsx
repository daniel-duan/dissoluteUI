import React, {Component} from 'react'
import {Button, Image, OpenData, View} from '@tarojs/components'
import {AtIcon, AtModal} from "taro-ui";

import './bookDetail.scss'
import {get} from "../../../store/global";
import DzLoading from "../../../components/loading/DzLoading";
import TopBar from "../../../components/topBar/TopBar";
import test from '../../../assets/image/333333333333.jpg';

export default class BookDetail extends Component {
    constructor(props) {
        super(props);

        this.navHeight = get('navHeight') - 10;
        this.state = {
            openLoad: false,
            delOpen: false,
            indicator: 0,//0：不需要、1：下拉加载更多、2：已经到底了、3：加载中、4：没有内容
            curPage: 0,
            delItem: 0,
            dataList: []
        };

        this.toDelete = this.toDelete.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    onShareAppMessage() {
        return {
            title: '我邀请您加入比赛（2021年6月14日）',
            path: '/pages/join/join?bookId=123',
            imageUrl: 'http://39.106.4.226:9000/wechat/lingpao_share.jpg'
        };
    }

    toDelete(id) {
        this.setState({delOpen: true, delItem: id});
    }

    deleteItem() {

    }

    render() {
        return (
            <View class='app-content'>
                <TopBar title='场地预定管理'/>
                <View className='auto-scroll-view' style={{top: this.navHeight}}>
                    <View className='bd-hold'>
                        <View className='item'>
                            <View className='item-text'>10</View>
                            <View className='item-inner'>最多添加人数</View>
                        </View>
                        <View className='item'><View className='dz-vip-avatar'><OpenData type='userAvatarUrl'/></View></View>
                        <View className='item'>
                            <View className='item-text'>20</View>
                            <View className='item-inner'>已添加人数</View>
                        </View>
                    </View>
                    <View className='order-op-list'>
                        <View className='op-item'>
                            <View className='body'>邀请队员加入比赛</View>
                            <View className='icon'>
                                <Button openType='share'>分享<AtIcon value='external-link' size='18' color='#0554BB'/></Button>
                            </View>
                        </View>
                        <View className='op-item'>
                            <View className='body'>待入场</View>
                            <View className='icon'>退款<AtIcon value='repeat-play' size='20' color='#0554BB'/></View>
                        </View>
                    </View>

                    <View className='join-list'>
                        <View className='join-item'>
                            <View className='head'><Image className='head-icon' src={test} mode='aspectFill'/></View>
                            <View className='cnt'>sdfsdfsdfd</View>
                            <View className='del' onClick={() => this.toDelete(1)}><AtIcon value='trash' size='20' color='#0554BB'/></View>
                        </View>
                        <View className='join-item'>
                            <View className='head'><Image className='head-icon' src={test} mode='aspectFill'/></View>
                            <View className='cnt'>sdfsdfsdfd</View>
                            <View className='del'><AtIcon value='trash' size='20' color='#0554BB'/></View>
                        </View>
                        <View className='join-item'>
                            <View className='head'><Image className='head-icon' src={test} mode='aspectFill'/></View>
                            <View className='cnt'>sdfsdfsdfd</View>
                            <View className='del'><AtIcon value='trash' size='20' color='#0554BB'/></View>
                        </View>
                        <View className='join-item'>
                            <View className='head'><Image className='head-icon' src={test} mode='aspectFill'/></View>
                            <View className='cnt'>sdfsdfsdfd</View>
                            <View className='del'><AtIcon value='trash' size='20' color='#0554BB'/></View>
                        </View>
                    </View>
                </View>
                <AtModal isOpened={this.state.delOpen} title='删除数据确认' cancelText='取消' confirmText='确认删除' content='您确定要删除吗？' onCancel={() => this.setState({delOpen: false})} onConfirm={this.deleteItem}/>
                <DzLoading open={this.state.openLoad}/>
            </View>
        )
    }
}
