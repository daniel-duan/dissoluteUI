import React, {Component} from 'react'
import Taro from "@tarojs/taro";
import {AtIcon, AtTabs, AtTabsPane} from 'taro-ui';
import {View} from '@tarojs/components'

import './bookList.scss'
import TopBar from "../../../components/topBar/TopBar";
import {get} from "../../../store/global";
import DzLoading from "../../../components/loading/DzLoading";
import api, {remoteGet} from "../../../store/api";
import {memGet} from "../../../store/menber";
import CheckMember from "../../../components/check/CheckMember";

function BookItem(props) {
    const item = props.item;
    return (
        <View className='tab-item' onClick={() => Taro.navigateTo({url: '/pages/mine/bookDetail/bookDetail?id=' + item.bhkId})}>
            <View className='content'>
                <View className='header'>{item.bookDate}</View>
                <View className='line'><View className='head'>预定时间段</View><View className='body'>{item.bookPeriod}</View></View>
                <View className='line'><View className='head'>已支付金额</View><View className='body'>{item.payAmount} 元</View></View>
            </View>
            <View className='nav'><AtIcon value='chevron-right' size='20' color='#888888'/></View>
        </View>
    );
}

function OtherItem(props) {
    const item = props.item;
    return (
        <View className='tab-item'>
            <View className='content'>
                <View className='header'>{item.bookDate}</View>
                <View className='line'><View className='head'>预定时间段</View><View className='body'>{item.bookPeriod}</View></View>
                <View className='line'><View className='head'>已支付金额</View><View className='body'>{item.payAmount} 元</View></View>
                {item.bookStatus === 3 && <View className='line'><View className='head'>已退款金额</View><View className='body'>{item.refundAmount} 元</View></View>}
            </View>
        </View>
    );
}

export default class BookList extends Component {
    constructor(props) {
        super(props);

        const params = Taro.getCurrentInstance().router.params;
        const current = params.current === undefined ? 0 : parseInt(params.current);
        this.navHeight = get('navHeight');
        this.state = {
            openLoad: true,
            current: current,
            payedLoad: false,
            payedList: [],
            usedLoad: false,
            usedList: [],
            refundLoad: false,
            refundList: []
        };
        this.tabList = [{title: '已预订'}, {title: '已使用'}, {title: '已取消'}];

        this.switchTab = this.switchTab.bind(this);
        this.loadPayed = this.loadPayed.bind(this);
        this.loadUsed = this.loadUsed.bind(this);
        this.loadRefund = this.loadRefund.bind(this);
    }

    componentDidMount() {
        if (this.state.current === 1) {
            this.loadUsed();
        } else if (this.state.current === 2) {
            this.loadRefund();
        } else {
            this.loadPayed();
        }
    }

    switchTab(idx) {
        let openLoad = false;
        if (idx === 0 && !this.state.payedLoad) {
            openLoad = true;
            this.loadPayed();
        } else if (idx === 1 && !this.state.usedLoad) {
            openLoad = true;
            this.loadUsed();
        } else if (idx === 2 && !this.state.refundLoad) {
            openLoad = true;
            this.loadRefund();
        }
        this.setState({openLoad: openLoad, current: idx});
    }

    loadPayed() {
        remoteGet(api.bookPayed + `?memId=${memGet('memId')}`, (res) => {
            this.setState({openLoad: false, payedLoad: true, payedList: res.data});
        });
    }

    loadUsed() {
        remoteGet(api.bookUsed + `?memId=${memGet('memId')}`, (res) => {
            this.setState({openLoad: false, usedLoad: true, usedList: res.data});
        });
    }

    loadRefund() {
        remoteGet(api.bookRefund + `?memId=${memGet('memId')}`, (res) => {
            this.setState({openLoad: false, refundLoad: true, refundList: res.data});
        });
    }

    render() {
        return (
            <View className='app-content'>
                <CheckMember/>
                <TopBar title='我的预定'/>
                <View className='auto-scroll-view' style={{top: this.navHeight}}>
                    <AtTabs current={this.state.current} tabList={this.tabList} onClick={this.switchTab}>
                        <AtTabsPane current={this.state.current} index={0}>
                            <View className='tab-body'>
                                <View className='tab-list'>
                                    {this.state.payedList.map(item => <BookItem item={item}/>)}
                                </View>
                            </View>
                        </AtTabsPane>
                        <AtTabsPane current={this.state.current} index={1}>
                            <View className='tab-body'>
                                <View className='tab-list'>
                                    {this.state.usedList.map(item => <OtherItem item={item}/>)}
                                </View>
                            </View>
                        </AtTabsPane>
                        <AtTabsPane current={this.state.current} index={2}>
                            <View className='tab-body'>
                                <View className='tab-list'>
                                    {this.state.refundList.map(item => <OtherItem item={item}/>)}
                                </View>
                            </View>
                        </AtTabsPane>
                    </AtTabs>
                </View>
                <DzLoading open={this.state.openLoad}/>
            </View>
        )
    }
}
