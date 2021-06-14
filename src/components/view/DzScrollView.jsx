import React from 'react';
import {ScrollView, Text, View} from '@tarojs/components'

function LoadBox(props) {
    if (props.type === 3) {
        return (
            <View className='dz-scroll-load'>
                <View className='sl-dot'/>
                <View className='sl-dot'/>
                <View className='sl-dot'/>
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
            <ScrollView className='dz-scroll' scrollY lowerThreshold={8} onScrollToLower={this.props.bottomFn}>
                <View className='dz-scroll-cnt'>{this.props.children}</View>
                {this.props.indicator > 0 && <LoadBox type={this.props.indicator}/>}
            </ScrollView>
        )
    }
}

DzScrollView.defaultProps = {
    indicator: 0,//0：不需要、1：下拉加载更多、2：已经到底了、3：加载中、4：没有内容
    bottomFn: null
};

DzScrollView.propTypes = {
    indicator: Number,
    bottomFn: Function
};
