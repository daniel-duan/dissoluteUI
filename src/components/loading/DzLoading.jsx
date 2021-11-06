import React from 'react';
import {View} from '@tarojs/components';

export default class DzLoading extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.open === false) return null;
        return (
            <View className='dz-loading'>
                <View className='loading-box'>
                    <View className='loading-dot'/>
                    <View className='loading-dot'/>
                    <View className='loading-dot'/>
                    <View className='loading-dot'/>
                    <View className='loading-dot'/>
                </View>
            </View>
        )
    }
}
DzLoading.defaultProps = {
    open: false
};

DzLoading.propTypes = {
    open: Boolean
};