import React from 'react';
import {Image, View} from '@tarojs/components';
import loading from "../../assets/image/loading.png";
import './DzLoading.scss'

export default class DzLoading extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View className='dz-loading'>
                <View className='dz-loading-box'>
                    <View className='dz-loading-dot'/>
                    <View className='dz-loading-dot'/>
                    <View className='dz-loading-dot'/>
                </View>
                <Image className='dz-loading-img' src={loading} mode='aspectFill'/>
            </View>
        )
    }
}
