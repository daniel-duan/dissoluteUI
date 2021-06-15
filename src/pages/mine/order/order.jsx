import React, {Component} from 'react'
import {View} from '@tarojs/components'

import './order.scss'
import TopBar from "../../../components/topBar/TopBar";
import DzLoading from "../../../components/loading/DzLoading";

export default class Order extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openLoad: true
        };
    }

    render() {
        return (
            <View class='app-content'>
                <TopBar title='账单记录'/>
                <View className='dz-balance-list'>
                </View>
                <DzLoading open={this.state.openLoad}/>
            </View>
        )
    }
}
