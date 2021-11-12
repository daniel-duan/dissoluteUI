import React, {Component} from 'react';
import Taro from "@tarojs/taro";
import {Image, Swiper, SwiperItem, View} from '@tarojs/components';

import './home.scss';
import TopBar from "../../components/topBar/TopBar";
import {get} from "../../store/global";
import DzLoading from "../../components/loading/DzLoading";
import api, {remoteGet} from "../../store/api";

function TopSwiper(props) {
    const [index, setIndex] = React.useState(0);

    return (
        <Swiper className='dz-card-swiper' indicatorColor='#bbb' indicatorActiveColor='#333' circular indicatorDots autoplay onChange={(e) => setIndex(e.detail.current)}>
            {props.list.map((item, idx) => {
                return (
                    <SwiperItem class={idx === index ? 'cs-item-cur' : 'cs-item'} onClick={() => props.swipeClick(item.paId)}>
                        <View className='swiper-item'>
                            <Image className='sa-img' src={item.swImage} mode='aspectFill'/>
                        </View>
                    </SwiperItem>
                );
            })}
        </Swiper>
    );
}

function FlowBox() {
    const ih = 90;

    return (
        <View className='dz-flow-box'>
            {/*--left--*/}
            <View className='item row-slideUp1' style={{left: 0, top: 0, height: ih * 2}}>
                <View className='flow-item'>
                    <dzBox border={false} onClick={() => Taro.navigateTo({url: '/pages/entrance/entrance'})}>入场</dzBox>
                </View>
            </View>
            <View className='item row-slideUp2' style={{left: 0, top: ih * 2, height: ih}}>
                <View className='flow-item' style={{backgroundPosition: `0 ${ih * -2}px`}}>
                    <dzBox border={false} onClick={() => Taro.navigateTo({url: '/pages/web/review'})}>球馆全景</dzBox>
                </View>
            </View>
            <View className='item row-slideUp3' style={{left: 0, top: ih * 3, height: ih}}>
                <View className='flow-item' style={{backgroundPosition: `0 ${ih * -3}px`}}>
                    <dzBox border={false} onClick={() => Taro.navigateTo({url: '/pages/coach/coach'})}>教练风采</dzBox>
                </View>
            </View>
            <View className='item row-slideUp4' style={{left: 0, top: ih * 4, height: ih * 2}}>
                <View className='flow-item' style={{backgroundPosition: `0 ${ih * -4}px`}}>
                    <dzBox border={false} onClick={() => Taro.navigateTo({url: '/pages/us/us'})}>关于我们</dzBox>
                </View>
            </View>
            {/*--right--*/}
            <View className='item row-slideUp1' style={{right: 0, top: 0, height: ih}}>
                <View className='flow-item' style={{backgroundPosition: `right 0`}}>
                    <dzBox border={false} onClick={() => Taro.navigateTo({url: '/pages/mine/cards/cards'})}>我的卡券</dzBox>
                </View>
            </View>
            <View className='item row-slideUp2' style={{right: 0, top: ih, height: ih * 2}}>
                <View className='flow-item' style={{backgroundPosition: `right ${ih * -1}px`}}>
                    <dzBox border={false} onClick={() => Taro.navigateTo({url: '/pages/recharge/recharge'})}>充值</dzBox>
                </View>
            </View>
            <View className='item row-slideUp3' style={{right: 0, top: ih * 3, height: ih}}>
                <View className='flow-item' style={{backgroundPosition: `right ${ih * -3}px`}}>
                    <dzBox border={false} onClick={() => Taro.navigateTo({url: '/pages/player/player'})}>明星球员</dzBox>
                </View>
            </View>
            <View className='item row-slideUp4' style={{right: 0, top: ih * 4, height: ih}}>
                <View className='flow-item' style={{backgroundPosition: `right ${ih * -4}px`}}>
                    <dzBox border={false} onClick={() => Taro.navigateTo({url: '/pages/mine/bookList/bookList'})}>我的预定</dzBox>
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
            swipeList: [],
            masterList: [],
            templeList: [],
        };
        this.swipeClick = this.swipeClick.bind(this);
    }

    componentDidMount() {
        remoteGet(api.swiperLoad, (res) => {
            this.setState({swipeList: res.data, openLoad: false});
        });
    }

    onShareAppMessage() {
        return {
            title: `陕果篮球中心`,
            path: '/pages/screen/screen',
            imageUrl: 'https://lanqiuguanli.com/file/common/shanguo_share.jpg'
        };
    }

    swipeClick(paId) {
        if (paId !== null && paId > 0) {
            Taro.navigateTo({url: '/pages/web/webView?type=1&id=' + paId});
        }
    }

    render() {
        return (
            <View className='app-content'>
                <TopBar nav={false} title='陕果篮球中心'/>
                <View className='auto-scroll-view' style={{top: this.navHeight - 14}}>
                    <TopSwiper list={this.state.swipeList} swipeClick={this.swipeClick}/>
                    <FlowBox/>
                </View>
                <DzLoading open={this.state.openLoad}/>
            </View>
        )
    }
}
