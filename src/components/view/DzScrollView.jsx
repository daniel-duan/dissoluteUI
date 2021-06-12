import React from 'react';
import {ScrollView, Text, View} from '@tarojs/components'
import './dzScrollView.scss'

function LoadBox(props) {
    if (props.type === 3) {
        return (
            <View className='dz-load-box'>
                <View className='dz-dot'/>
                <View className='dz-dot'/>
                <View className='dz-dot'/>
            </View>
        );
    }

    return (
        <View className='dz-load-box'>
            <Text className='dz-load-text'>{props.type === 1 ? '下拉加载更多' : '已经到底了'}</Text>
        </View>
    );
}

export default class DzScrollView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView className='dz-scroll' style={{top: this.props.top}} scrollY lowerThreshold={8} onScrollToLower={this.props.bottomFn}>
                <View className='dz-content'>{this.props.children}</View>
                {this.props.indicator > 0 && <LoadBox type={this.props.indicator}/>}
            </ScrollView>
        )
    }
}

DzScrollView.defaultProps = {
    top: 0,
    indicator: 0,//0：不需要、1：下拉加载更多、2：已经到底了、3：加载中
    bottomFn: null
};

DzScrollView.propTypes = {
    top: Number,
    indicator: Number,
    bottomFn: Function
};
