import React, {Component} from 'react'
import {View} from '@tarojs/components'

import './order.scss'

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
            </View>
        )
    }
}
