import React, {Component} from 'react'
import {View} from '@tarojs/components'

import './balance.scss'
import TopBar from "../../../components/topBar/TopBar";
import {get} from "../../../store/global";
import {AtIcon} from "taro-ui";
import api, {remoteGet} from "../../../store/api";
import {memGet} from "../../../store/menber";
import DzLoading from "../../../components/loading/DzLoading";
import Taro from "@tarojs/taro";

export default class Balance extends Component {
    constructor(props) {
        super(props);

        this.navHeight = get('navHeight');
        this.state = {
            openLoad: true,
            menBalance: 0
        };
    }

    componentDidMount() {
        const url = api.memInfo + '?memId=' + memGet('memId');
        remoteGet(url, (res) => {
            const mem = res.data;
            this.setState({openLoad: false, menBalance: mem.menBalance});
        });
    }

    render() {
        return (
            <View class='app-content'>
                <TopBar title='我的账户'/>
                <View className='balance-detail' style={{paddingTop: this.navHeight}}>
                    <View className='amount'><View className='head'>账户余额</View><View className='body'>{this.state.menBalance}</View></View>
                </View>
                <View className='dz-balance-list'>
                    <View className='list-item' onClick={() => Taro.navigateTo({url: '/pages/recharge/recharge'})}>
                        充值<AtIcon value='chevron-right' size='20' color='#888888'/>
                    </View>
                    <View className='list-item' onClick={() => Taro.navigateTo({url: '/pages/mine/order/order'})}>
                        账单记录<AtIcon value='chevron-right' size='20' color='#888888'/>
                    </View>
                </View>
                <DzLoading open={this.state.openLoad}/>
            </View>
        )
    }
}
