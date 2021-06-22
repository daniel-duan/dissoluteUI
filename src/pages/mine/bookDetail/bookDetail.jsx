import React, {Component} from 'react'
import Taro from "@tarojs/taro";
import {Button, Image, OpenData, View} from '@tarojs/components'
import {AtIcon, AtModal} from "taro-ui";

import './bookDetail.scss'
import {get} from "../../../store/global";
import DzLoading from "../../../components/loading/DzLoading";
import TopBar from "../../../components/topBar/TopBar";
import api, {remoteGet} from "../../../store/api";
import {memGet} from "../../../store/menber";

function Joined(props) {
    const item = props.item;
    if (props.me === item.memId) {
        return (
            <View className='join-item'>
                <View className='head'><Image className='head-icon' src={item.wxImage} mode='aspectFill'/></View>
                <View className='cnt'>订场人</View>
            </View>
        );
    }
    return (
        <View className='join-item'>
            <View className='head'><Image className='head-icon' src={item.wxImage} mode='aspectFill'/></View>
            <View className='cnt'>{item.remark}</View>
            <View className='del' onClick={() => props.toDelete(item.tckId)}><AtIcon value='trash' size='20' color='#0554BB'/></View>
        </View>
    );
}

export default class BookDetail extends Component {
    constructor(props) {
        super(props);

        const params = Taro.getCurrentInstance().router.params;
        this.navHeight = get('navHeight') - 10;
        this.state = {
            openLoad: true,
            delOpen: false,
            refundOpen: false,
            delItem: 0,
            detail: {ticketList: []},
            dataList: [],
            realName: '',
            bookDate: '',
        };
        this.me = memGet('memId');
        this.bhkId = params.id;

        this.toDelete = this.toDelete.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.refund = this.refund.bind(this);
    }

    componentDidMount() {
        remoteGet(api.bookDetail + `?bhkId=${this.bhkId}`, (res) => {
            this.setState({detail: res.data, openLoad: false});
        });
    }

    onShareAppMessage() {
        return {
            title: `${this.state.detail.realName}邀请您加入比赛（${this.state.detail.bookDate}）`,
            path: '/pages/join/join?bookId=123',
            imageUrl: 'http://39.106.4.226:9000/wechat/lingpao_share.jpg'
        };
    }

    refund() {
        this.setState({refundOpen: false, openLoad: true});
        remoteGet(api.orderRefund + `?memId=${this.me}&bhkId=${this.bhkId}`, (res) => {
            if (res.data === 1) {
                Taro.navigateTo({url: '/pages/mine/bookList/bookList?current=2'})
            } else {
                Taro.showToast({title: '退款失败，无效订单或者已超过退款时间', icon: 'none', duration: 2000});
                this.setState({openLoad: false});
            }
        });
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
                            <View className='item-text'>{this.state.detail.max}</View>
                            <View className='item-inner'>最多添加人数</View>
                        </View>
                        <View className='item'><View className='dz-vip-avatar'><OpenData type='userAvatarUrl'/></View></View>
                        <View className='item'>
                            <View className='item-text'>{this.state.detail.joined}</View>
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
                            <View className='icon' onClick={() => this.setState({refundOpen: true})}>退款<AtIcon value='repeat-play' size='20' color='#0554BB'/></View>
                        </View>
                    </View>

                    <View className='join-list'>
                        {this.state.detail.ticketList.map(item => <Joined me={this.me} item={item} toDelete={this.toDelete}/>)}
                    </View>
                </View>
                <AtModal isOpened={this.state.delOpen} title='删除数据确认' cancelText='取消' confirmText='确认删除' content='您确定要删除吗？' onCancel={() => this.setState({delOpen: false})} onConfirm={this.deleteItem}/>
                <AtModal isOpened={this.state.refundOpen} title='退款确认' cancelText='取消' confirmText='确认退款' content='比赛开始前1小时之前可申请退款。退款将返还您一半预定金额，您确定要退款吗？' onCancel={() => this.setState({refundOpen: false})} onConfirm={this.refund}/>
                <DzLoading open={this.state.openLoad}/>
            </View>
        )
    }
}
