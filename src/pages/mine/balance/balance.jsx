import React, {Component} from 'react'
import {View} from '@tarojs/components'

import './balance.scss'
import TopBar from "../../../components/topBar/TopBar";
import {get} from "../../../store/global";
import {AtIcon} from "taro-ui";

export default class Balance extends Component {
    constructor(props) {
        super(props);

        this.navHeight = get('navHeight');
        this.state = {
            openLoad: true
        };
    }

    render() {
        return (
            <View class='app-content'>
                <TopBar title='账户余额'/>
                <View className='balance-detail' style={{paddingTop: this.navHeight}}>
                    <View className='amount'><View className='head'>现金余额</View><View className='body'>123</View></View>
                </View>
                <View className='dz-balance-list'>
                    <View className='list-item'>
                        充值<AtIcon value='chevron-right' size='20' color='#888888'/>
                    </View>
                    <View className='list-item'>
                        账单记录<AtIcon value='chevron-right' size='20' color='#888888'/>
                    </View>
                </View>
            </View>
        )
    }
}
