import React, {Component} from 'react'
import Taro from "@tarojs/taro";
import {OpenData, Text, View} from '@tarojs/components'

import './mine.scss'
import {AtIcon} from "taro-ui";
import {getMemType} from "../../store/menber";
import CheckMember from "../../components/check/CheckMember";

export default class Mine extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openLoad: true,
            memType: getMemType()
        };
    }

    render() {
        return (
            <View class='app-content'>
                <CheckMember callback={() => this.setState({memType: getMemType()})}/>
                <View className='auto-scroll-view'>
                    <View className='dz-personal-back'/>
                    <View className='dz-member-card'>
                        <Text className='name'>领跑体育</Text>
                        <View className='dz-vip-avatar' onClick={() => Taro.navigateTo({url: '/pages/register/register'})}><OpenData type='userAvatarUrl'/></View>
                        <View className='dz-vip-type'>{this.state.memType}</View>
                    </View>
                    <View className='dz-personal-list'>
                        <View className='dz-list-up'>
                            <View className='list-item'>
                                我的名片<AtIcon value='chevron-right' size='20' color='#888888'/>
                            </View>
                            <View className='list-item' onClick={() => Taro.navigateTo({url: '/pages/mine/cards/cards'})}>
                                我的卡券<AtIcon value='chevron-right' size='20' color='#888888'/>
                            </View>
                        </View>
                        <View className='dz-list-bottom'>
                            <View className='list-item' onClick={() => Taro.navigateTo({url: '/pages/mine/balance/balance'})}>
                                我的账户<AtIcon value='chevron-right' size='20' color='#888888'/>
                            </View>
                            <View className='list-item' onClick={() => Taro.navigateTo({url: '/pages/recharge/recharge'})}>
                                充值<AtIcon value='chevron-right' size='20' color='#888888'/>
                            </View>
                            <View className='list-item' onClick={() => Taro.navigateTo({url: '/pages/mine/bookList/bookList'})}>
                                我的预定<AtIcon value='chevron-right' size='20' color='#888888'/>
                            </View>
                            <View className='list-item' onClick={() => Taro.navigateTo({url: '/pages/mine/order/order'})}>
                                账单记录<AtIcon value='chevron-right' size='20' color='#888888'/>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
