import React, {Component} from 'react'
import {ScrollView, View} from '@tarojs/components'

import './mine.scss'
import {AtIcon} from "taro-ui";

export default class Mine extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openLoad: true
        };
    }

    render() {
        return (
            <View class='app-content'>
                <View className='auto-scroll-view'>
                    <View className='dz-personal-back'/>
                    <View className='dz-member-card'></View>
                    <View className='dz-personal-list'>
                        <View className='dz-list-up'>
                            <View className='list-item'>
                                我的名片<AtIcon value='chevron-right' size='20' color='#888888'/>
                            </View>
                            <View className='list-item'>
                                我的卡券<AtIcon value='chevron-right' size='20' color='#888888'/>
                            </View>
                        </View>
                        <View className='dz-list-bottom'>
                            <View className='list-item'>
                                账户余额<AtIcon value='chevron-right' size='20' color='#888888'/>
                            </View>
                            <View className='list-item'>
                                充值<AtIcon value='chevron-right' size='20' color='#888888'/>
                            </View>
                            <View className='list-item'>
                                我的预定<AtIcon value='chevron-right' size='20' color='#888888'/>
                            </View>
                            <View className='list-item'>
                                账单记录<AtIcon value='chevron-right' size='20' color='#888888'/>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}