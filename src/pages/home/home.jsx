import React, {Component} from 'react';
import {Image, Swiper, SwiperItem, View} from '@tarojs/components';

import test from '../../assets/image/333333333333.jpg';
import './home.scss';
import TopBar from "../../components/topBar/TopBar";
import {get} from "../../store/global";
import Taro from "@tarojs/taro";

function TopSwiper(props) {
    const [index, setIndex] = React.useState(0);

    return (
        <Swiper className='dz-card-swiper' indicatorColor='#bbb' indicatorActiveColor='#333' circular indicatorDots autoplay onChange={(e) => setIndex(e.detail.current)}>
            {props.list.map((item, idx) => {
                return (
                    <SwiperItem class={idx === index ? 'cs-item-cur' : 'cs-item'} onClick={props.swipeClick()}>
                        <View className='swiper-item'>
                            <Image className='sa-img' src={test} mode='aspectFill'/>
                        </View>
                    </SwiperItem>
                );
            })}
        </Swiper>
    );
}

function FlowBox(props) {
    const ih = 90;

    return (
        <View className='dz-flow-box'>
            {/*--left--*/}
            <View className='item' style={{left: 0, top: 0, height: ih * 2}}>
                <View className='flow-item'>
                    <dzPaper border={false} onClick={() => Taro.navigateTo({url: '/pages/entrance/entrance'})}>入场</dzPaper>
                </View>
            </View>
            <View className='item' style={{left: 0, top: ih * 2, height: ih}}>
                <View className='flow-item' style={{backgroundPosition: `0 ${ih * -2}px`}}>
                    <dzPaper border={false}>球馆全景</dzPaper>
                </View>
            </View>
            <View className='item' style={{left: 0, top: ih * 3, height: ih}}>
                <View className='flow-item' style={{backgroundPosition: `0 ${ih * -3}px`}}>
                    <dzPaper border={false}>教练风采</dzPaper>
                </View>
            </View>
            <View className='item' style={{left: 0, top: ih * 4, height: ih}}>
                <View className='flow-item' style={{backgroundPosition: `0 ${ih * -4}px`}}>
                    <dzPaper border={false}>关于我们</dzPaper>
                </View>
            </View>
            {/*--right--*/}
            <View className='item' style={{right: 0, top: 0, height: ih}}>
                <View className='flow-item' style={{backgroundPosition: `right 0`}}>
                    <dzPaper border={false}>我的卡券</dzPaper>
                </View>
            </View>
            <View className='item' style={{right: 0, top: ih, height: ih * 2}}>
                <View className='flow-item' style={{backgroundPosition: `right ${ih * -1}px`}}>
                    <dzPaper border={false}>充值</dzPaper>
                </View>
            </View>
            <View className='item' style={{right: 0, top: ih * 3, height: ih}}>
                <View className='flow-item' style={{backgroundPosition: `right ${ih * -3}px`}}>
                    <dzPaper border={false}>明星球员</dzPaper>
                </View>
            </View>
        </View>
    );
}

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.navHeight = get('navHeight');
        this.state = {
            openLoad: true,
            swipeList: [1, 2, 3],
            masterList: [],
            templeList: [],
        };
        this.swipeClick = this.swipeClick.bind(this);
    }

    swipeClick(paId) {
    }

    render() {
        return (
            <View className='app-content'>
                <TopBar nav={false} title='领跑体育'/>
                <View className='auto-scroll-view' style={{top: this.navHeight - 14}}>
                    <TopSwiper list={this.state.swipeList} swipeClick={this.swipeClick}/>
                    <FlowBox/>
                </View>
            </View>
        )
    }
}
